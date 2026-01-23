import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import chalk from 'chalk';
import { logger } from './logger.js';

const execAsync = promisify(exec);

export interface ValidationResult {
    success: boolean;
    typescript: {
        success: boolean;
        errors: string[];
    };
    eslint: {
        success: boolean;
        errors: string[];
        warnings: number;
    };
    dependencies: {
        success: boolean;
        missing: string[];
    };
    files: {
        success: boolean;
        missing: string[];
    };
    assets: {
        warnings: string[];
    };
}

const REQUIRED_FILES: Record<string, string[]> = {
    'react-vite': [
        'package.json',
        'tsconfig.json',
        'vite.config.ts',
        'index.html',
        'src/main.tsx',
        'src/App.tsx'
    ],
    'nextjs': [
        'package.json',
        'tsconfig.json',
        'next.config.js',
        'src/app/page.tsx',
        'src/app/layout.tsx'
    ],
    'sveltekit': [
        'package.json',
        'tsconfig.json',
        'svelte.config.js',
        'src/routes/+page.svelte',
        'src/routes/+layout.svelte'
    ]
};

export async function validateProject(
    projectDir: string,
    autoFix: boolean = false
): Promise<ValidationResult> {
    const result: ValidationResult = {
        success: true,
        typescript: { success: true, errors: [] },
        eslint: { success: true, errors: [], warnings: 0 },
        dependencies: { success: true, missing: [] },
        files: { success: true, missing: [] },
        assets: { warnings: [] }
    };

    // Determine framework from package.json
    const packageJsonPath = path.join(projectDir, 'package.json');
    let framework = 'react-vite';
    
    if (await fs.pathExists(packageJsonPath)) {
        const packageJson = await fs.readJson(packageJsonPath);
        if (packageJson.dependencies?.next) {
            framework = 'nextjs';
        } else if (packageJson.devDependencies?.['@sveltejs/kit']) {
            framework = 'sveltekit';
        }
    }

    // 1. Check required files
    const fileSpinner = ora('Checking required files...').start();
    const requiredFiles = REQUIRED_FILES[framework] || REQUIRED_FILES['react-vite'];
    
    for (const file of requiredFiles) {
        const filePath = path.join(projectDir, file);
        if (!await fs.pathExists(filePath)) {
            result.files.missing.push(file);
        }
    }

    if (result.files.missing.length > 0) {
        result.files.success = false;
        result.success = false;
        fileSpinner.fail(`Missing ${result.files.missing.length} required file(s)`);
    } else {
        fileSpinner.succeed('All required files present');
    }

    // 2. Check dependencies
    const depsSpinner = ora('Checking dependencies...').start();
    const nodeModulesPath = path.join(projectDir, 'node_modules');
    
    if (!await fs.pathExists(nodeModulesPath)) {
        result.dependencies.success = false;
        result.dependencies.missing.push('node_modules (run npm install)');
        depsSpinner.warn('Dependencies not installed');
    } else {
        // Check for specific critical dependencies
        const criticalDeps = ['react', 'react-dom'];
        for (const dep of criticalDeps) {
            const depPath = path.join(nodeModulesPath, dep);
            if (!await fs.pathExists(depPath)) {
                result.dependencies.missing.push(dep);
            }
        }

        if (result.dependencies.missing.length > 0) {
            result.dependencies.success = false;
            result.success = false;
            depsSpinner.warn(`Missing ${result.dependencies.missing.length} dependency(ies)`);
        } else {
            depsSpinner.succeed('All dependencies installed');
        }
    }

    // 3. TypeScript check
    const tsSpinner = ora('Running TypeScript check...').start();
    try {
        const tscPath = path.join(projectDir, 'node_modules', '.bin', 'tsc');
        const tscExists = await fs.pathExists(tscPath) || await fs.pathExists(tscPath + '.cmd');
        
        if (tscExists) {
            try {
                await execAsync('npx tsc --noEmit', { cwd: projectDir });
                tsSpinner.succeed('TypeScript: no errors');
            } catch (error: any) {
                const stderr = error.stderr || error.stdout || '';
                const errors = parseTypeScriptErrors(stderr);
                
                if (errors.length > 0) {
                    result.typescript.success = false;
                    result.typescript.errors = errors;
                    result.success = false;
                    tsSpinner.fail(`TypeScript: ${errors.length} error(s)`);
                } else {
                    tsSpinner.succeed('TypeScript: no errors');
                }
            }
        } else {
            tsSpinner.warn('TypeScript not installed, skipping check');
        }
    } catch (error) {
        tsSpinner.warn('Could not run TypeScript check');
    }

    // 4. ESLint check
    const eslintSpinner = ora('Running ESLint check...').start();
    try {
        const eslintConfigExists = await fs.pathExists(path.join(projectDir, '.eslintrc.json')) ||
                                    await fs.pathExists(path.join(projectDir, '.eslintrc.js')) ||
                                    await fs.pathExists(path.join(projectDir, 'eslint.config.js'));
        
        if (eslintConfigExists) {
            try {
                const command = autoFix 
                    ? 'npx eslint src --ext .ts,.tsx --fix --max-warnings=0'
                    : 'npx eslint src --ext .ts,.tsx --max-warnings=0';
                
                await execAsync(command, { cwd: projectDir });
                eslintSpinner.succeed('ESLint: clean');
            } catch (error: any) {
                const output = error.stdout || error.stderr || '';
                const { errors, warnings } = parseESLintOutput(output);
                
                result.eslint.errors = errors;
                result.eslint.warnings = warnings;
                
                if (errors.length > 0) {
                    result.eslint.success = false;
                    result.success = false;
                    eslintSpinner.fail(`ESLint: ${errors.length} error(s), ${warnings} warning(s)`);
                } else if (warnings > 0) {
                    eslintSpinner.warn(`ESLint: ${warnings} warning(s)`);
                } else {
                    eslintSpinner.succeed('ESLint: clean');
                }
            }
        } else {
            eslintSpinner.info('ESLint not configured, skipping check');
        }
    } catch (error) {
        eslintSpinner.warn('Could not run ESLint check');
    }

    // 5. Check assets
    const assetsSpinner = ora('Checking assets...').start();
    const publicDir = path.join(projectDir, 'public');
    const assetsDir = path.join(projectDir, 'src', 'assets');
    
    const assetWarnings: string[] = [];
    
    // Check for placeholder images
    if (await fs.pathExists(assetsDir)) {
        const assetFiles = await fs.readdir(assetsDir);
        const hasPlaceholders = assetFiles.some(f => f.includes('placeholder'));
        if (hasPlaceholders) {
            assetWarnings.push('Contains placeholder images - consider replacing with real assets');
        }
    }

    // Check for favicon
    if (await fs.pathExists(publicDir)) {
        const publicFiles = await fs.readdir(publicDir);
        const hasFavicon = publicFiles.some(f => f.includes('favicon'));
        if (!hasFavicon) {
            assetWarnings.push('Missing favicon.ico in public folder');
        }
    }

    result.assets.warnings = assetWarnings;
    
    if (assetWarnings.length > 0) {
        assetsSpinner.warn(`${assetWarnings.length} asset warning(s)`);
    } else {
        assetsSpinner.succeed('Assets check passed');
    }

    // 6. Optional: Run Prettier if autoFix is enabled
    if (autoFix) {
        const prettierSpinner = ora('Running Prettier...').start();
        try {
            const prettierConfigExists = await fs.pathExists(path.join(projectDir, '.prettierrc')) ||
                                          await fs.pathExists(path.join(projectDir, 'prettier.config.js'));
            
            if (prettierConfigExists) {
                await execAsync('npx prettier --write "src/**/*.{ts,tsx,css}"', { cwd: projectDir });
                prettierSpinner.succeed('Prettier: formatted');
            } else {
                prettierSpinner.info('Prettier not configured, skipping');
            }
        } catch (error) {
            prettierSpinner.warn('Could not run Prettier');
        }
    }

    return result;
}

function parseTypeScriptErrors(output: string): string[] {
    const errors: string[] = [];
    const lines = output.split('\n');
    
    for (const line of lines) {
        // Match TypeScript error format: file.ts(line,col): error TS####: message
        if (line.includes('error TS') || line.includes(': error')) {
            const cleanedLine = line.trim();
            if (cleanedLine) {
                errors.push(cleanedLine);
            }
        }
    }
    
    return errors.slice(0, 10); // Limit to first 10 errors
}

function parseESLintOutput(output: string): { errors: string[]; warnings: number } {
    const errors: string[] = [];
    let warnings = 0;
    
    const lines = output.split('\n');
    
    for (const line of lines) {
        if (line.includes('error')) {
            errors.push(line.trim());
        }
        if (line.includes('warning')) {
            warnings++;
        }
    }
    
    // Parse summary line if present
    const summaryMatch = output.match(/(\d+) problems? \((\d+) errors?, (\d+) warnings?\)/);
    if (summaryMatch) {
        warnings = parseInt(summaryMatch[3], 10);
    }
    
    return { errors: errors.slice(0, 10), warnings };
}

export async function runDevBuildCheck(projectDir: string): Promise<boolean> {
    const spinner = ora('Running development build check...').start();
    
    try {
        await execAsync('npm run build', { cwd: projectDir, timeout: 120000 });
        spinner.succeed('Build completed successfully');
        return true;
    } catch (error: any) {
        const output = error.stdout || error.stderr || '';
        spinner.fail('Build failed');
        
        // Extract and log build errors
        const errorLines = output.split('\n').filter((line: string) => 
            line.toLowerCase().includes('error') || 
            line.includes('failed')
        );
        
        if (errorLines.length > 0) {
            console.log(chalk.red('\nBuild errors:'));
            errorLines.slice(0, 5).forEach((line: string) => {
                console.log(chalk.red(`  ${line}`));
            });
        }
        
        return false;
    }
}

export function printValidationSummary(result: ValidationResult): void {
    console.log('\n');
    console.log(chalk.bold.cyan('📊 Validation Summary'));
    console.log(chalk.gray('─'.repeat(50)));

    // Files
    if (result.files.success) {
        console.log(chalk.green('  ✅ Required files: all present'));
    } else {
        console.log(chalk.red(`  ❌ Missing files: ${result.files.missing.join(', ')}`));
    }

    // Dependencies
    if (result.dependencies.success) {
        console.log(chalk.green('  ✅ Dependencies: all installed'));
    } else {
        console.log(chalk.yellow(`  ⚠️ Missing: ${result.dependencies.missing.join(', ')}`));
    }

    // TypeScript
    if (result.typescript.success) {
        console.log(chalk.green('  ✅ TypeScript: no errors'));
    } else {
        console.log(chalk.red(`  ❌ TypeScript: ${result.typescript.errors.length} error(s)`));
        result.typescript.errors.slice(0, 3).forEach(err => {
            console.log(chalk.red(`     • ${err.substring(0, 80)}...`));
        });
    }

    // ESLint
    if (result.eslint.success && result.eslint.warnings === 0) {
        console.log(chalk.green('  ✅ ESLint: clean'));
    } else if (result.eslint.errors.length === 0) {
        console.log(chalk.yellow(`  ⚠️ ESLint: ${result.eslint.warnings} warning(s)`));
    } else {
        console.log(chalk.red(`  ❌ ESLint: ${result.eslint.errors.length} error(s)`));
    }

    // Assets
    if (result.assets.warnings.length > 0) {
        result.assets.warnings.forEach(warning => {
            console.log(chalk.yellow(`  ⚠️ ${warning}`));
        });
    }

    console.log(chalk.gray('─'.repeat(50)));
    
    if (result.success) {
        console.log(chalk.green.bold('  ✅ Overall: PASSED'));
    } else {
        console.log(chalk.red.bold('  ❌ Overall: FAILED - see errors above'));
    }
    
    console.log('\n');
}

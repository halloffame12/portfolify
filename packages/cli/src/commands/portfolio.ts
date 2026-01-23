import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import chalk from 'chalk';
import validateNpmPackageName from 'validate-npm-package-name';
import { collectPortfolioData, PortfolioConfig, portfolioTypes } from '../prompts/portfolio-prompts.js';
import { generatePortfolioProject } from '../generator/portfolio-generator.js';
import { validateProject, ValidationResult } from '../utils/validator.js';
import { logger } from '../utils/logger.js';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface PortfolioCommandOptions {
    all?: boolean;
    deployReady?: boolean;
    customAssets?: string;
    git?: boolean;
    skipValidation?: boolean;
    autoFix?: boolean;
    yes?: boolean;
    type?: string;
}

export async function portfolioCommand(projectName?: string, options: PortfolioCommandOptions = {}): Promise<void> {
    try {
        console.log(chalk.bold.magenta('\n🚀 ForgeStack Portfolio Generator\n'));
        console.log(chalk.gray('Create production-ready portfolio websites with validation\n'));

        // Debug: show if using defaults
        if (options.yes) {
            logger.info('Running in non-interactive mode with defaults');
        }

        // Handle --all flag to generate all portfolio types
        if (options.all) {
            await generateAllPortfolios(options);
            return;
        }

        // Get project name
        let finalProjectName = projectName;

        if (!finalProjectName) {
            if (options.yes) {
                finalProjectName = 'my-portfolio';
            } else {
                const inquirer = (await import('inquirer')).default;
                const { name } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'What is your project name?',
                        default: 'my-portfolio',
                        validate: (input: string) => {
                            const validation = validateNpmPackageName(input);
                            if (!validation.validForNewPackages) {
                                return validation.errors?.[0] || 'Invalid project name';
                            }
                            return true;
                        }
                    }
                ]);
                finalProjectName = name;
            }
        }

        if (!finalProjectName) {
            throw new Error('Project name is required');
        }

        // Validate project name
        const validation = validateNpmPackageName(finalProjectName);
        if (!validation.validForNewPackages) {
            logger.error(`Invalid project name: ${validation.errors?.[0]}`);
            process.exit(1);
        }

        const targetDir = path.resolve(process.cwd(), finalProjectName);

        // Check if directory exists
        if (await fs.pathExists(targetDir)) {
            logger.error(`Directory "${finalProjectName}" already exists!`);
            process.exit(1);
        }

        // Collect portfolio configuration
        logger.header('📝 Configure your portfolio');
        
        let portfolioConfig: PortfolioConfig;
        if (options.yes) {
            portfolioConfig = getDefaultPortfolioConfig(options.type);
            logger.info(`Using default configuration for: ${portfolioConfig.type.name}`);
        } else {
            portfolioConfig = await collectPortfolioData();
        }

        // Generate portfolio
        logger.header('🎨 Generating your portfolio...');
        const spinner = ora('Creating project files...').start();

        try {
            await generatePortfolioProject(finalProjectName, portfolioConfig, targetDir, options);
            spinner.succeed('Project files created!');
        } catch (error) {
            spinner.fail('Failed to create project files');
            throw error;
        }

        // Install dependencies
        logger.header('📦 Installing dependencies...');
        const installSpinner = ora('Installing packages...').start();

        try {
            await execAsync('npm install', { cwd: targetDir });
            installSpinner.succeed('Dependencies installed!');
        } catch (error) {
            installSpinner.warn('Failed to install dependencies automatically');
            logger.info('You can install them manually by running: npm install');
        }

        // Run validation if not skipped
        let validationResult: ValidationResult | null = null;
        if (!options.skipValidation) {
            logger.header('🔍 Validating generated code...');
            validationResult = await validateProject(targetDir, options.autoFix);
        }

        // Initialize git if requested
        if (options.git) {
            try {
                await execAsync('git init', { cwd: targetDir });
                await execAsync('git add .', { cwd: targetDir });
                await execAsync('git commit -m "Initial commit from ForgeStack Portfolio"', { cwd: targetDir });
                logger.success('Git repository initialized');
            } catch (error) {
                logger.warning('Failed to initialize git repository');
            }
        }

        // Print summary report
        printSummaryReport(finalProjectName, portfolioConfig, validationResult, options);

    } catch (error) {
        logger.error('An error occurred during generation');
        console.error(error);
        process.exit(1);
    }
}

async function generateAllPortfolios(options: PortfolioCommandOptions): Promise<void> {
    logger.header('🎯 Generating all portfolio types for demo/testing');
    
    const baseDir = path.resolve(process.cwd(), 'forgestack-portfolios');
    
    if (await fs.pathExists(baseDir)) {
        logger.error(`Directory "forgestack-portfolios" already exists!`);
        process.exit(1);
    }

    await fs.ensureDir(baseDir);

    const results: { name: string; success: boolean; error?: string }[] = [];

    for (const type of portfolioTypes) {
        const projectName = `portfolio-${type.value}`;
        const targetDir = path.join(baseDir, projectName);
        const spinner = ora(`Generating ${type.name}...`).start();

        try {
            const config = getDefaultPortfolioConfig(type.value);
            await generatePortfolioProject(projectName, config, targetDir, options);
            
            // Install dependencies
            await execAsync('npm install', { cwd: targetDir });
            
            // Validate if not skipped
            if (!options.skipValidation) {
                await validateProject(targetDir, options.autoFix);
            }
            
            spinner.succeed(`${type.name} generated successfully`);
            results.push({ name: type.name, success: true });
        } catch (error) {
            spinner.fail(`Failed to generate ${type.name}`);
            results.push({ name: type.name, success: false, error: String(error) });
        }
    }

    // Print summary
    console.log('\n');
    console.log(chalk.bold.cyan('📊 Generation Summary:'));
    console.log(chalk.gray('─'.repeat(50)));
    
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    for (const result of results) {
        if (result.success) {
            console.log(chalk.green(`  ✓ ${result.name}`));
        } else {
            console.log(chalk.red(`  ✗ ${result.name}: ${result.error}`));
        }
    }
    
    console.log(chalk.gray('─'.repeat(50)));
    console.log(chalk.white(`  Total: ${results.length} | `), 
        chalk.green(`Success: ${successful} | `),
        failed > 0 ? chalk.red(`Failed: ${failed}`) : chalk.gray('Failed: 0'));
    console.log('\n');
    console.log(chalk.cyan(`All portfolios generated in: ${baseDir}`));
}

function getDefaultPortfolioConfig(typeValue?: string): PortfolioConfig {
    const type = portfolioTypes.find(t => t.value === typeValue) || portfolioTypes[0];
    
    return {
        type,
        colorScheme: {
            name: 'Default',
            value: 'default',
            colors: type.defaultColors
        },
        layout: 'single-page',
        framework: 'react-vite',
        features: {
            contactForm: true,
            gallery: type.category === 'Creative' || type.category === 'Beauty',
            blog: type.category === 'Professional',
            testimonials: type.category === 'Business' || type.category === 'Beauty'
        },
        userData: {
            name: 'John Doe',
            role: type.defaultRole,
            bio: type.defaultBio,
            skills: type.defaultSkills,
            email: 'hello@example.com'
        },
        runValidation: true
    };
}

function printSummaryReport(
    projectName: string, 
    config: PortfolioConfig, 
    validation: ValidationResult | null,
    options: PortfolioCommandOptions
): void {
    console.log('\n');
    console.log(chalk.bold.green('═'.repeat(60)));
    console.log(chalk.bold.green('  🎉 Portfolio Generation Complete!'));
    console.log(chalk.bold.green('═'.repeat(60)));
    console.log('\n');

    // Project info
    console.log(chalk.cyan('📁 Project Details:'));
    console.log(chalk.gray('─'.repeat(40)));
    console.log(chalk.white(`  Location: ${chalk.bold('./' + projectName)}`));
    console.log(chalk.white(`  Type: ${chalk.bold(config.type.name)} ${config.type.emoji}`));
    console.log(chalk.white(`  Framework: ${chalk.bold(getFrameworkName(config.framework))}`));
    console.log(chalk.white(`  Layout: ${chalk.bold(config.layout === 'single-page' ? 'Single Page' : 'Multi-Page')}`));
    console.log('\n');

    // Features
    console.log(chalk.cyan('✨ Features Enabled:'));
    console.log(chalk.gray('─'.repeat(40)));
    if (config.features.contactForm) console.log(chalk.white('  ✓ Contact Form'));
    if (config.features.gallery) console.log(chalk.white('  ✓ Gallery/Portfolio'));
    if (config.features.blog) console.log(chalk.white('  ✓ Blog'));
    if (config.features.testimonials) console.log(chalk.white('  ✓ Testimonials'));
    console.log('\n');

    // Validation results
    if (validation) {
        console.log(chalk.cyan('🔍 Validation Results:'));
        console.log(chalk.gray('─'.repeat(40)));
        
        if (validation.typescript.success) {
            console.log(chalk.green('  ✅ TypeScript: no errors'));
        } else {
            console.log(chalk.red(`  ❌ TypeScript: ${validation.typescript.errors.length} error(s)`));
            validation.typescript.errors.slice(0, 3).forEach(err => {
                console.log(chalk.red(`     • ${err}`));
            });
        }

        if (validation.eslint.success) {
            console.log(chalk.green('  ✅ ESLint: clean'));
        } else {
            console.log(chalk.yellow(`  ⚠️ ESLint: ${validation.eslint.warnings} warning(s), ${validation.eslint.errors.length} error(s)`));
        }

        if (validation.dependencies.success) {
            console.log(chalk.green('  ✅ All dependencies installed'));
        } else {
            console.log(chalk.yellow(`  ⚠️ Missing dependencies: ${validation.dependencies.missing.join(', ')}`));
        }

        if (validation.files.success) {
            console.log(chalk.green('  ✅ All required files present'));
        } else {
            console.log(chalk.yellow(`  ⚠️ Missing files: ${validation.files.missing.join(', ')}`));
        }

        if (validation.assets.warnings.length > 0) {
            validation.assets.warnings.forEach(warning => {
                console.log(chalk.yellow(`  ⚠️ ${warning}`));
            });
        }
        console.log('\n');
    }

    // Next steps
    console.log(chalk.cyan('🚀 Next Steps:'));
    console.log(chalk.gray('─'.repeat(40)));
    console.log(chalk.white(`  cd ${projectName}`));
    console.log(chalk.white('  npm run dev'));
    console.log('\n');

    // Deploy info
    if (options.deployReady) {
        console.log(chalk.cyan('☁️ Deploy Ready:'));
        console.log(chalk.gray('─'.repeat(40)));
        console.log(chalk.white('  • Vercel: vercel deploy'));
        console.log(chalk.white('  • Netlify: netlify deploy'));
        console.log(chalk.white('  • Build: npm run build'));
        console.log('\n');
    }

    console.log(chalk.gray('Built with ❤️ using ForgeStack Portfolio Generator'));
    console.log('\n');
}

function getFrameworkName(framework: string): string {
    const names: Record<string, string> = {
        'react-vite': 'React + Vite',
        'nextjs': 'Next.js',
        'sveltekit': 'SvelteKit'
    };
    return names[framework] || framework;
}

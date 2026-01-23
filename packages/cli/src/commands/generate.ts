import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import chalk from 'chalk';
import validateNpmPackageName from 'validate-npm-package-name';
import { collectUserData, getDefaultUserData, themes } from '../prompts/index.js';
import { generatePortfolio } from '../generator/index.js';
import { logger } from '../utils/logger.js';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface GenerateOptions {
    yes?: boolean;
    theme?: string;
}

export async function generateCommand(projectName?: string, options: GenerateOptions = {}): Promise<void> {
    try {
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
                        validate: (input) => {
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

        // Display welcome banner
        console.log('\n');
        console.log(chalk.cyan.bold('╔════════════════════════════════════════════════════════════╗'));
        console.log(chalk.cyan.bold('║') + chalk.white.bold('  🚀 Portfolify - Create Beautiful Portfolios in Seconds  ') + chalk.cyan.bold('║'));
        console.log(chalk.cyan.bold('╚════════════════════════════════════════════════════════════╝'));
        console.log('\n');

        // Collect user data
        let userData;
        if (options.yes) {
            // Use defaults with optional theme override
            const themeValue = options.theme || 'developer';
            const selectedTheme = themes.find(t => t.value === themeValue) || themes[0];
            userData = getDefaultUserData(selectedTheme);
            console.log(chalk.green(`✓ Using theme: ${selectedTheme.emoji} ${selectedTheme.name}`));
            console.log(chalk.gray(`  Category: ${selectedTheme.category}`));
            console.log(chalk.gray(`  Style: ${selectedTheme.layout.heroStyle} hero layout`));
        } else {
            userData = await collectUserData();
        }

        // Generate portfolio
        console.log('\n');
        logger.header('🎨 Generating your portfolio...');
        await generatePortfolio(finalProjectName, userData, targetDir);

        // Install dependencies
        logger.header('📦 Installing dependencies...');
        const spinner = ora('Installing packages...').start();

        try {
            await execAsync('npm install', { cwd: targetDir });
            spinner.succeed('Dependencies installed!');
        } catch (error) {
            spinner.warn('Failed to install dependencies automatically');
            logger.info('You can install them manually by running: npm install');
        }

        // Initialize git
        try {
            await execAsync('git init', { cwd: targetDir });
            await execAsync('git add .', { cwd: targetDir });
            await execAsync('git commit -m "Initial commit from Portfolify"', { cwd: targetDir });
            logger.success('Git repository initialized');
        } catch (error) {
            // Git init is optional, don't fail if it doesn't work
        }

        // Success message
        printSuccessMessage(finalProjectName, userData.name);

    } catch (error) {
        logger.error('An error occurred during generation');
        console.error(error);
        process.exit(1);
    }
}

function printSuccessMessage(projectName: string, userName: string): void {
    console.log('\n');
    console.log(chalk.green.bold('🎉 Success! Your portfolio is ready!'));
    console.log('\n');
    console.log(chalk.cyan('Next steps:'));
    console.log(chalk.white(`  cd ${projectName}`));
    console.log(chalk.white('  npm run dev'));
    console.log('\n');
    console.log(chalk.cyan('Deploy to:'));
    console.log(chalk.white('  • Vercel: vercel'));
    console.log(chalk.white('  • Netlify: netlify deploy'));
    console.log(chalk.white('  • GitHub Pages: npm run build'));
    console.log('\n');
    console.log(chalk.magenta.bold('📢 Share your portfolio!'));
    console.log(chalk.white('  Tweet about it with #Portfolify'));
    console.log(chalk.white('  Star us on GitHub: https://github.com/halloffame12/portfolify'));
    console.log('\n');
    console.log(chalk.gray('Built with ❤️ using Portfolify'));
    console.log('\n');
}

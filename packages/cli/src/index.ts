#!/usr/bin/env node

import { Command } from 'commander';
import { generateCommand } from './commands/generate.js';
import { portfolioCommand } from './commands/portfolio.js';
import chalk from 'chalk';

const program = new Command();

program
    .name('portfolify')
    .description('🚀 Portfolify - Generate stunning portfolio websites in seconds')
    .version('2.0.0');

// Main portfolify command - npx portfolify my-portfolio
program
    .argument('[project-name]', 'Name of your portfolio project')
    .option('-y, --yes', 'Skip prompts and use defaults')
    .option('-t, --theme <theme>', 'Choose a theme (developer, designer, salon, photographer, startup)')
    .option('--deploy-ready', 'Create deploy-ready files for Vercel/Netlify')
    .option('--git', 'Initialize git repository')
    .action(async (projectName, options) => {
        console.log(chalk.bold.magenta('\n✨ Welcome to Portfolify! ✨\n'));
        console.log(chalk.gray('Create stunning, production-ready portfolio websites\n'));
        await generateCommand(projectName, options);
    });

// Alternative portfolio command with full features
program
    .command('portfolio [project-name]')
    .alias('p')
    .description('Generate a validated portfolio website with multiple frameworks')
    .option('-y, --yes', 'Skip prompts and use defaults')
    .option('-t, --type <type>', 'Portfolio type (developer, designer, photographer, etc.)')
    .option('--all', 'Generate all portfolio types for demo/testing')
    .option('--deploy-ready', 'Create deploy-ready files for Vercel/Netlify')
    .option('--custom-assets <path>', 'Path to custom assets folder')
    .option('--git', 'Initialize git repository')
    .option('--skip-validation', 'Skip code validation')
    .option('--auto-fix', 'Auto-fix ESLint and Prettier issues')
    .action(async (projectName, options) => {
        await portfolioCommand(projectName, options);
    });

program.parse();

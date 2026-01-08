#!/usr/bin/env node

import { Command } from 'commander';
import { generateCommand } from './commands/generate.js';
import chalk from 'chalk';

const program = new Command();

program
    .name('portfolify')
    .description('🚀 Generate a beautiful portfolio in seconds')
    .version('1.0.0');

program
    .argument('[project-name]', 'Name of your portfolio project')
    .description('Generate a new portfolio')
    .action(async (projectName) => {
        console.log(chalk.bold.cyan('\n✨ Welcome to Portfolify! ✨\n'));
        await generateCommand(projectName);
    });

program.parse();

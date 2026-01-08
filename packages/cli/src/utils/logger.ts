import chalk from 'chalk';

export const logger = {
    success: (message: string) => {
        console.log(chalk.green('✓'), message);
    },

    error: (message: string) => {
        console.log(chalk.red('✗'), message);
    },

    info: (message: string) => {
        console.log(chalk.blue('ℹ'), message);
    },

    warning: (message: string) => {
        console.log(chalk.yellow('⚠'), message);
    },

    step: (message: string) => {
        console.log(chalk.cyan('→'), message);
    },

    header: (message: string) => {
        console.log(chalk.bold.magenta(`\n${message}\n`));
    }
};

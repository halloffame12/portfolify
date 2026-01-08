import inquirer from 'inquirer';

export interface Project {
    name: string;
    description: string;
    tech: string[];
    github?: string;
    demo?: string;
}

export interface PortfolioData {
    name: string;
    role: string;
    bio: string;
    skills: string[];
    projects: Project[];
    enableBlog: boolean;
    social: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        email?: string;
    };
    theme: string;
}

export async function collectUserData(): Promise<PortfolioData> {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: (input) => input.trim().length > 0 || 'Name is required'
        },
        {
            type: 'input',
            name: 'role',
            message: 'What is your role/title?',
            default: 'Full Stack Developer'
        },
        {
            type: 'input',
            name: 'bio',
            message: 'Write a short bio about yourself:',
            validate: (input) => input.trim().length > 0 || 'Bio is required'
        },
        {
            type: 'input',
            name: 'skills',
            message: 'List your skills (comma-separated):',
            default: 'React, Node.js, TypeScript, Tailwind CSS',
            filter: (input) => input.split(',').map((s: string) => s.trim()).filter(Boolean)
        },
        {
            type: 'input',
            name: 'github',
            message: 'GitHub username (optional):',
        },
        {
            type: 'input',
            name: 'linkedin',
            message: 'LinkedIn username (optional):',
        },
        {
            type: 'input',
            name: 'twitter',
            message: 'Twitter/X username (optional):',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Email address (optional):',
        },
        {
            type: 'confirm',
            name: 'enableBlog',
            message: 'Enable blog section?',
            default: true
        }
    ]);

    // Collect projects
    const projects: Project[] = [];
    let addMore = true;
    let projectCount = 0;

    while (addMore && projectCount < 6) {
        const projectAnswers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: `Project ${projectCount + 1} name:`,
                validate: (input) => input.trim().length > 0 || 'Project name is required'
            },
            {
                type: 'input',
                name: 'description',
                message: 'Project description:',
                validate: (input) => input.trim().length > 0 || 'Description is required'
            },
            {
                type: 'input',
                name: 'tech',
                message: 'Technologies used (comma-separated):',
                filter: (input) => input.split(',').map((s: string) => s.trim()).filter(Boolean)
            },
            {
                type: 'input',
                name: 'github',
                message: 'GitHub repository URL (optional):'
            },
            {
                type: 'input',
                name: 'demo',
                message: 'Live demo URL (optional):'
            }
        ]);

        projects.push(projectAnswers);
        projectCount++;

        if (projectCount < 6) {
            const { continueAdding } = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'continueAdding',
                    message: 'Add another project?',
                    default: projectCount < 3
                }
            ]);
            addMore = continueAdding;
        } else {
            addMore = false;
        }
    }

    return {
        name: answers.name,
        role: answers.role,
        bio: answers.bio,
        skills: answers.skills,
        projects,
        enableBlog: answers.enableBlog,
        social: {
            github: answers.github || undefined,
            linkedin: answers.linkedin || undefined,
            twitter: answers.twitter || undefined,
            email: answers.email || undefined
        },
        theme: 'modern-dark'
    };
}

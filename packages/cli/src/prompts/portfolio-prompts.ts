import inquirer from 'inquirer';
import chalk from 'chalk';

// Portfolio Type definitions
export interface PortfolioType {
    name: string;
    value: string;
    category: 'Professional' | 'Creative' | 'Business' | 'Beauty' | 'Food' | 'Personal';
    emoji: string;
    defaultRole: string;
    defaultBio: string;
    defaultSkills: string[];
    defaultColors: ColorScheme['colors'];
    suggestedFeatures: string[];
}

export interface ColorScheme {
    name: string;
    value: string;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        foreground: string;
        muted: string;
    };
}

export interface PortfolioFeatures {
    contactForm: boolean;
    gallery: boolean;
    blog: boolean;
    testimonials: boolean;
}

export interface UserData {
    name: string;
    role: string;
    bio: string;
    skills: string[];
    email: string;
    phone?: string;
    location?: string;
    social?: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        instagram?: string;
        behance?: string;
        dribbble?: string;
        youtube?: string;
    };
}

export interface PortfolioConfig {
    type: PortfolioType;
    colorScheme: ColorScheme;
    layout: 'single-page' | 'multi-page';
    framework: 'react-vite' | 'nextjs' | 'sveltekit';
    features: PortfolioFeatures;
    userData: UserData;
    runValidation: boolean;
}

// 10+ Portfolio Types
export const portfolioTypes: PortfolioType[] = [
    // Professional Category
    {
        name: 'Programmer / Developer',
        value: 'developer',
        category: 'Professional',
        emoji: '💻',
        defaultRole: 'Full Stack Developer',
        defaultBio: 'Passionate developer creating innovative solutions with modern technologies.',
        defaultSkills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker', 'Git'],
        defaultColors: {
            primary: '220 90% 56%',
            secondary: '280 80% 60%',
            accent: '142 76% 36%',
            background: '224 71% 4%',
            foreground: '213 31% 91%',
            muted: '223 47% 11%'
        },
        suggestedFeatures: ['blog', 'gallery']
    },
    {
        name: 'Designer / Graphic Designer',
        value: 'designer',
        category: 'Creative',
        emoji: '🎨',
        defaultRole: 'UI/UX Designer',
        defaultBio: 'Creative designer crafting beautiful and intuitive user experiences.',
        defaultSkills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Prototyping', 'Design Systems'],
        defaultColors: {
            primary: '330 80% 60%',
            secondary: '270 70% 60%',
            accent: '45 93% 58%',
            background: '280 30% 5%',
            foreground: '300 20% 95%',
            muted: '280 20% 12%'
        },
        suggestedFeatures: ['gallery', 'testimonials']
    },
    {
        name: 'Photographer',
        value: 'photographer',
        category: 'Creative',
        emoji: '📷',
        defaultRole: 'Professional Photographer',
        defaultBio: 'Capturing moments and telling stories through the lens.',
        defaultSkills: ['Portrait', 'Landscape', 'Wedding', 'Product', 'Lightroom', 'Photoshop'],
        defaultColors: {
            primary: '0 0% 20%',
            secondary: '0 0% 40%',
            accent: '45 100% 50%',
            background: '0 0% 3%',
            foreground: '0 0% 98%',
            muted: '0 0% 10%'
        },
        suggestedFeatures: ['gallery', 'contactForm']
    },
    {
        name: 'Writer / Author',
        value: 'writer',
        category: 'Professional',
        emoji: '✍️',
        defaultRole: 'Content Writer & Author',
        defaultBio: 'Wordsmith crafting compelling stories and engaging content.',
        defaultSkills: ['Creative Writing', 'Copywriting', 'Content Strategy', 'SEO', 'Editing', 'Research'],
        defaultColors: {
            primary: '30 50% 45%',
            secondary: '25 40% 55%',
            accent: '200 80% 50%',
            background: '40 20% 6%',
            foreground: '40 30% 95%',
            muted: '35 15% 12%'
        },
        suggestedFeatures: ['blog', 'testimonials']
    },
    {
        name: 'Musician / Artist',
        value: 'musician',
        category: 'Creative',
        emoji: '🎵',
        defaultRole: 'Music Producer & Artist',
        defaultBio: 'Creating melodies that move souls and rhythms that inspire.',
        defaultSkills: ['Music Production', 'Mixing', 'Mastering', 'Composition', 'Live Performance', 'Vocals'],
        defaultColors: {
            primary: '280 70% 55%',
            secondary: '320 60% 50%',
            accent: '45 100% 55%',
            background: '260 30% 5%',
            foreground: '280 20% 95%',
            muted: '270 20% 12%'
        },
        suggestedFeatures: ['gallery', 'contactForm']
    },
    {
        name: 'Salon / Spa',
        value: 'salon-spa',
        category: 'Beauty',
        emoji: '💇',
        defaultRole: 'Beauty & Wellness Expert',
        defaultBio: 'Providing premium beauty and wellness services for your complete transformation.',
        defaultSkills: ['Hair Styling', 'Makeup', 'Skincare', 'Nail Art', 'Spa Treatments', 'Bridal'],
        defaultColors: {
            primary: '350 80% 65%',
            secondary: '320 60% 55%',
            accent: '30 80% 60%',
            background: '340 20% 5%',
            foreground: '340 20% 95%',
            muted: '340 15% 12%'
        },
        suggestedFeatures: ['gallery', 'testimonials', 'contactForm']
    },
    {
        name: 'Restaurant / Cafe',
        value: 'restaurant',
        category: 'Food',
        emoji: '🍽️',
        defaultRole: 'Restaurant & Culinary',
        defaultBio: 'Serving delicious cuisines and memorable dining experiences.',
        defaultSkills: ['Fine Dining', 'Casual Cuisine', 'Desserts', 'Beverages', 'Catering', 'Private Events'],
        defaultColors: {
            primary: '25 80% 50%',
            secondary: '15 70% 45%',
            accent: '45 90% 55%',
            background: '20 25% 6%',
            foreground: '30 30% 95%',
            muted: '25 20% 12%'
        },
        suggestedFeatures: ['gallery', 'contactForm', 'testimonials']
    },
    {
        name: 'Freelancer / Consultant',
        value: 'freelancer',
        category: 'Professional',
        emoji: '💼',
        defaultRole: 'Freelance Consultant',
        defaultBio: 'Helping businesses grow with strategic insights and expert solutions.',
        defaultSkills: ['Strategy', 'Project Management', 'Business Analysis', 'Marketing', 'Consulting', 'Leadership'],
        defaultColors: {
            primary: '210 80% 50%',
            secondary: '200 70% 45%',
            accent: '45 90% 55%',
            background: '220 30% 6%',
            foreground: '210 30% 95%',
            muted: '215 20% 12%'
        },
        suggestedFeatures: ['testimonials', 'contactForm', 'blog']
    },
    {
        name: 'Startup / Business',
        value: 'startup',
        category: 'Business',
        emoji: '🚀',
        defaultRole: 'Startup & Business',
        defaultBio: 'Innovative startup transforming ideas into reality.',
        defaultSkills: ['Innovation', 'Technology', 'Growth', 'Product Development', 'Funding', 'Team Building'],
        defaultColors: {
            primary: '250 80% 60%',
            secondary: '220 70% 55%',
            accent: '170 80% 45%',
            background: '230 30% 5%',
            foreground: '240 20% 95%',
            muted: '235 20% 12%'
        },
        suggestedFeatures: ['blog', 'testimonials', 'contactForm']
    },
    {
        name: 'Personal / Resume',
        value: 'personal',
        category: 'Personal',
        emoji: '👤',
        defaultRole: 'Professional',
        defaultBio: 'Dedicated professional with a passion for excellence.',
        defaultSkills: ['Communication', 'Leadership', 'Problem Solving', 'Team Collaboration', 'Time Management'],
        defaultColors: {
            primary: '200 60% 50%',
            secondary: '180 50% 45%',
            accent: '45 80% 55%',
            background: '210 25% 6%',
            foreground: '200 25% 95%',
            muted: '205 18% 12%'
        },
        suggestedFeatures: ['contactForm']
    },
    // Additional Types
    {
        name: 'Fitness Trainer',
        value: 'fitness',
        category: 'Personal',
        emoji: '💪',
        defaultRole: 'Fitness & Wellness Coach',
        defaultBio: 'Helping you achieve your fitness goals with personalized training.',
        defaultSkills: ['Personal Training', 'Nutrition', 'Weight Loss', 'Strength Training', 'HIIT', 'Yoga'],
        defaultColors: {
            primary: '142 70% 45%',
            secondary: '160 60% 40%',
            accent: '25 90% 55%',
            background: '150 25% 5%',
            foreground: '145 20% 95%',
            muted: '148 18% 12%'
        },
        suggestedFeatures: ['testimonials', 'gallery', 'contactForm']
    },
    {
        name: 'Real Estate Agent',
        value: 'realestate',
        category: 'Business',
        emoji: '🏠',
        defaultRole: 'Real Estate Professional',
        defaultBio: 'Helping you find your dream property with expert guidance.',
        defaultSkills: ['Property Sales', 'Rentals', 'Market Analysis', 'Negotiation', 'Property Management', 'Investment'],
        defaultColors: {
            primary: '25 70% 50%',
            secondary: '35 60% 45%',
            accent: '200 80% 50%',
            background: '30 20% 6%',
            foreground: '25 25% 95%',
            muted: '28 15% 12%'
        },
        suggestedFeatures: ['gallery', 'contactForm', 'testimonials']
    },
    {
        name: 'Healthcare Professional',
        value: 'healthcare',
        category: 'Professional',
        emoji: '🏥',
        defaultRole: 'Healthcare Professional',
        defaultBio: 'Providing compassionate care and medical expertise.',
        defaultSkills: ['Patient Care', 'Diagnosis', 'Treatment', 'Medical Research', 'Health Education', 'Wellness'],
        defaultColors: {
            primary: '200 80% 50%',
            secondary: '180 70% 45%',
            accent: '142 60% 45%',
            background: '195 25% 5%',
            foreground: '200 20% 95%',
            muted: '198 18% 12%'
        },
        suggestedFeatures: ['testimonials', 'contactForm', 'blog']
    },
    {
        name: 'Educator / Teacher',
        value: 'educator',
        category: 'Professional',
        emoji: '📚',
        defaultRole: 'Educator & Mentor',
        defaultBio: 'Inspiring minds and shaping futures through education.',
        defaultSkills: ['Teaching', 'Curriculum Design', 'Online Education', 'Mentoring', 'Research', 'Public Speaking'],
        defaultColors: {
            primary: '220 70% 50%',
            secondary: '200 60% 45%',
            accent: '45 85% 55%',
            background: '215 25% 5%',
            foreground: '220 20% 95%',
            muted: '218 18% 12%'
        },
        suggestedFeatures: ['blog', 'testimonials', 'contactForm']
    }
];

// Predefined color schemes
export const colorSchemes: ColorScheme[] = [
    {
        name: 'Ocean Blue',
        value: 'ocean-blue',
        colors: {
            primary: '210 90% 55%',
            secondary: '200 80% 50%',
            accent: '180 70% 45%',
            background: '215 30% 5%',
            foreground: '210 25% 95%',
            muted: '212 20% 12%'
        }
    },
    {
        name: 'Forest Green',
        value: 'forest-green',
        colors: {
            primary: '142 70% 45%',
            secondary: '160 60% 40%',
            accent: '80 60% 45%',
            background: '150 25% 5%',
            foreground: '145 20% 95%',
            muted: '148 18% 12%'
        }
    },
    {
        name: 'Sunset Orange',
        value: 'sunset-orange',
        colors: {
            primary: '25 90% 55%',
            secondary: '15 80% 50%',
            accent: '45 95% 55%',
            background: '20 25% 5%',
            foreground: '25 20% 95%',
            muted: '22 18% 12%'
        }
    },
    {
        name: 'Royal Purple',
        value: 'royal-purple',
        colors: {
            primary: '270 70% 55%',
            secondary: '280 60% 50%',
            accent: '330 70% 55%',
            background: '265 25% 5%',
            foreground: '270 20% 95%',
            muted: '268 18% 12%'
        }
    },
    {
        name: 'Elegant Rose',
        value: 'elegant-rose',
        colors: {
            primary: '350 70% 60%',
            secondary: '330 60% 55%',
            accent: '45 80% 55%',
            background: '345 20% 5%',
            foreground: '350 18% 95%',
            muted: '348 15% 12%'
        }
    },
    {
        name: 'Minimal Mono',
        value: 'minimal-mono',
        colors: {
            primary: '0 0% 20%',
            secondary: '0 0% 40%',
            accent: '0 0% 60%',
            background: '0 0% 3%',
            foreground: '0 0% 98%',
            muted: '0 0% 12%'
        }
    },
    {
        name: 'Tech Cyan',
        value: 'tech-cyan',
        colors: {
            primary: '185 80% 50%',
            secondary: '195 70% 45%',
            accent: '220 80% 55%',
            background: '190 25% 5%',
            foreground: '185 20% 95%',
            muted: '188 18% 12%'
        }
    }
];

export async function collectPortfolioData(): Promise<PortfolioConfig> {
    console.log(chalk.cyan('\nSelect your portfolio configuration:\n'));

    // Group portfolio types by category
    const groupedTypes = portfolioTypes.reduce((acc, type) => {
        if (!acc[type.category]) {
            acc[type.category] = [];
        }
        acc[type.category].push(type);
        return acc;
    }, {} as Record<string, PortfolioType[]>);

    // Create choices with separators
    const typeChoices: any[] = [];
    for (const [category, types] of Object.entries(groupedTypes)) {
        typeChoices.push(new inquirer.Separator(chalk.gray(`── ${category} ──`)));
        types.forEach(type => {
            typeChoices.push({
                name: `${type.emoji} ${type.name}`,
                value: type.value
            });
        });
    }

    const { portfolioType } = await inquirer.prompt([
        {
            type: 'list',
            name: 'portfolioType',
            message: 'Select portfolio type:',
            choices: typeChoices,
            pageSize: 15
        }
    ]);

    const selectedType = portfolioTypes.find(t => t.value === portfolioType)!;

    // Color scheme selection
    const colorChoices = [
        {
            name: `🎨 Use default (${selectedType.name} theme)`,
            value: 'default'
        },
        new inquirer.Separator(chalk.gray('── Predefined Schemes ──')),
        ...colorSchemes.map(c => ({
            name: `  ${c.name}`,
            value: c.value
        })),
        new inquirer.Separator(chalk.gray('──────────────────────')),
        {
            name: '🎯 Custom colors (enter HSL values)',
            value: 'custom'
        }
    ];

    const { colorScheme: colorChoice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'colorScheme',
            message: 'Choose color scheme:',
            choices: colorChoices
        }
    ]);

    let colorScheme: ColorScheme;
    if (colorChoice === 'default') {
        colorScheme = {
            name: 'Default',
            value: 'default',
            colors: selectedType.defaultColors
        };
    } else if (colorChoice === 'custom') {
        const customColors = await inquirer.prompt([
            {
                type: 'input',
                name: 'primary',
                message: 'Primary color (HSL, e.g., "220 90% 56%"):',
                default: '220 90% 56%'
            },
            {
                type: 'input',
                name: 'secondary',
                message: 'Secondary color (HSL):',
                default: '200 80% 50%'
            },
            {
                type: 'input',
                name: 'accent',
                message: 'Accent color (HSL):',
                default: '45 90% 55%'
            }
        ]);
        colorScheme = {
            name: 'Custom',
            value: 'custom',
            colors: {
                ...customColors,
                background: '220 30% 5%',
                foreground: '210 25% 95%',
                muted: '215 20% 12%'
            }
        };
    } else {
        colorScheme = colorSchemes.find(c => c.value === colorChoice)!;
    }

    // Layout selection
    const { layout } = await inquirer.prompt([
        {
            type: 'list',
            name: 'layout',
            message: 'Choose layout style:',
            choices: [
                { name: '📄 Single Page (scrolling sections)', value: 'single-page' },
                { name: '📚 Multi-Page (separate pages)', value: 'multi-page' }
            ]
        }
    ]);

    // Framework selection
    const { framework } = await inquirer.prompt([
        {
            type: 'list',
            name: 'framework',
            message: 'Select framework:',
            choices: [
                { name: '⚡ React + Vite (Fast, lightweight)', value: 'react-vite' },
                { name: '🔺 Next.js (Full-featured, SSR)', value: 'nextjs' },
                { name: '🔶 SvelteKit (Modern, performant)', value: 'sveltekit' }
            ]
        }
    ]);

    // Features selection
    const suggestedFeatures = selectedType.suggestedFeatures;
    const { features } = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'features',
            message: 'Select features to include:',
            choices: [
                { 
                    name: '📬 Contact Form', 
                    value: 'contactForm',
                    checked: suggestedFeatures.includes('contactForm')
                },
                { 
                    name: '🖼️ Gallery / Portfolio Showcase', 
                    value: 'gallery',
                    checked: suggestedFeatures.includes('gallery')
                },
                { 
                    name: '📝 Blog Section', 
                    value: 'blog',
                    checked: suggestedFeatures.includes('blog')
                },
                { 
                    name: '⭐ Testimonials', 
                    value: 'testimonials',
                    checked: suggestedFeatures.includes('testimonials')
                }
            ]
        }
    ]);

    // User information
    console.log(chalk.cyan('\n📝 Enter your information:\n'));

    const userData = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Your name:',
            default: 'John Doe'
        },
        {
            type: 'input',
            name: 'role',
            message: 'Your role/title:',
            default: selectedType.defaultRole
        },
        {
            type: 'input',
            name: 'bio',
            message: 'Short bio:',
            default: selectedType.defaultBio
        },
        {
            type: 'input',
            name: 'skills',
            message: 'Skills (comma-separated):',
            default: selectedType.defaultSkills.join(', '),
            filter: (input: string) => input.split(',').map(s => s.trim()).filter(Boolean)
        },
        {
            type: 'input',
            name: 'email',
            message: 'Email:',
            default: 'hello@example.com'
        }
    ]);

    // Social links based on portfolio type
    const socialPrompts = getSocialPrompts(selectedType.category);
    const socialData = await inquirer.prompt(socialPrompts);

    // Validation option
    const { runValidation } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'runValidation',
            message: 'Run code validation after generation?',
            default: true
        }
    ]);

    return {
        type: selectedType,
        colorScheme,
        layout,
        framework,
        features: {
            contactForm: features.includes('contactForm'),
            gallery: features.includes('gallery'),
            blog: features.includes('blog'),
            testimonials: features.includes('testimonials')
        },
        userData: {
            ...userData,
            social: socialData
        },
        runValidation
    };
}

function getSocialPrompts(category: string): any[] {
    const basePrompts = [
        {
            type: 'input',
            name: 'linkedin',
            message: 'LinkedIn URL (optional):',
            default: ''
        },
        {
            type: 'input',
            name: 'twitter',
            message: 'Twitter/X URL (optional):',
            default: ''
        }
    ];

    if (category === 'Professional') {
        return [
            {
                type: 'input',
                name: 'github',
                message: 'GitHub URL:',
                default: ''
            },
            ...basePrompts
        ];
    }

    if (category === 'Creative') {
        return [
            {
                type: 'input',
                name: 'instagram',
                message: 'Instagram URL:',
                default: ''
            },
            {
                type: 'input',
                name: 'behance',
                message: 'Behance URL (optional):',
                default: ''
            },
            {
                type: 'input',
                name: 'dribbble',
                message: 'Dribbble URL (optional):',
                default: ''
            },
            ...basePrompts
        ];
    }

    if (category === 'Beauty' || category === 'Food' || category === 'Business') {
        return [
            {
                type: 'input',
                name: 'instagram',
                message: 'Instagram URL:',
                default: ''
            },
            {
                type: 'input',
                name: 'youtube',
                message: 'YouTube URL (optional):',
                default: ''
            },
            ...basePrompts
        ];
    }

    return basePrompts;
}

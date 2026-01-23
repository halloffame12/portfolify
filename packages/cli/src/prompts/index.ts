import inquirer from 'inquirer';
import chalk from 'chalk';

export interface Project {
    name: string;
    description: string;
    tech: string[];
    github?: string;
    demo?: string;
    image?: string;
}

export interface ThemeConfig {
    name: string;
    value: string;
    category: 'developer' | 'designer' | 'salon' | 'photographer' | 'startup';
    description: string;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        foreground: string;
        muted: string;
        card: string;
        cardForeground: string;
        border: string;
        backgroundLight: string;
        foregroundLight: string;
        mutedLight: string;
        cardLight: string;
        borderLight: string;
    };
    typography: {
        headingFont: string;
        bodyFont: string;
        headingWeight: string;
        bodyWeight: string;
    };
    layout: {
        style: 'minimal' | 'creative' | 'elegant' | 'bold' | 'modern';
        heroStyle: 'centered' | 'split' | 'fullscreen' | 'asymmetric';
        gridColumns: number;
        borderRadius: string;
        glassmorphism: boolean;
    };
    defaultRole: string;
    defaultBio: string;
    defaultSkills: string[];
    defaultProjects: Project[];
    emoji: string;
}

export interface PortfolioData {
    name: string;
    role: string;
    bio: string;
    skills: string[];
    projects: Project[];
    enableBlog: boolean;
    enableDarkMode: boolean;
    defaultDarkMode: boolean;
    social: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        email?: string;
        instagram?: string;
        behance?: string;
        dribbble?: string;
        youtube?: string;
        phone?: string;
        website?: string;
    };
    theme: string;
    themeConfig: ThemeConfig;
    siteUrl?: string;
    portfolioType: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
}

// 5 Distinct Theme Categories
export const themes: ThemeConfig[] = [
    // DEVELOPER THEME
    {
        name: 'Developer Pro',
        value: 'developer',
        category: 'developer',
        description: 'Dark, minimalistic design with code aesthetics and GitHub integration',
        colors: {
            primary: '210 100% 50%',
            secondary: '280 100% 65%',
            accent: '142 70% 45%',
            background: '220 20% 6%',
            foreground: '210 40% 96%',
            muted: '220 15% 15%',
            card: '220 15% 10%',
            cardForeground: '210 40% 96%',
            border: '220 15% 20%',
            backgroundLight: '0 0% 100%',
            foregroundLight: '220 20% 10%',
            mutedLight: '220 15% 95%',
            cardLight: '220 15% 98%',
            borderLight: '220 15% 90%',
        },
        typography: {
            headingFont: 'JetBrains Mono, monospace',
            bodyFont: 'Inter, system-ui, sans-serif',
            headingWeight: '700',
            bodyWeight: '400',
        },
        layout: {
            style: 'minimal',
            heroStyle: 'centered',
            gridColumns: 3,
            borderRadius: '0.5rem',
            glassmorphism: true,
        },
        defaultRole: 'Full Stack Developer',
        defaultBio: 'Passionate developer crafting elegant solutions with clean code. I love building scalable applications and contributing to open source.',
        defaultSkills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL', 'PostgreSQL'],
        defaultProjects: [
            { name: 'Cloud Dashboard', description: 'Real-time cloud infrastructure monitoring', tech: ['React', 'TypeScript', 'AWS'], github: 'https://github.com', demo: 'https://demo.com' },
            { name: 'API Gateway', description: 'High-performance API gateway', tech: ['Node.js', 'Redis', 'Docker'], github: 'https://github.com' },
            { name: 'Dev Tools CLI', description: 'CLI toolkit for dev workflows', tech: ['TypeScript', 'Commander'], github: 'https://github.com' }
        ],
        emoji: '💻'
    },

    // DESIGNER THEME
    {
        name: 'Creative Studio',
        value: 'designer',
        category: 'designer',
        description: 'Vibrant, colorful design with portfolio galleries and creative animations',
        colors: {
            primary: '330 85% 60%',
            secondary: '45 100% 55%',
            accent: '180 100% 40%',
            background: '260 20% 8%',
            foreground: '300 20% 96%',
            muted: '260 15% 15%',
            card: '260 20% 12%',
            cardForeground: '300 20% 96%',
            border: '260 15% 22%',
            backgroundLight: '300 30% 99%',
            foregroundLight: '260 30% 10%',
            mutedLight: '280 20% 95%',
            cardLight: '300 20% 98%',
            borderLight: '280 20% 90%',
        },
        typography: {
            headingFont: 'Playfair Display, serif',
            bodyFont: 'Poppins, sans-serif',
            headingWeight: '700',
            bodyWeight: '400',
        },
        layout: {
            style: 'creative',
            heroStyle: 'asymmetric',
            gridColumns: 2,
            borderRadius: '1.5rem',
            glassmorphism: true,
        },
        defaultRole: 'UI/UX Designer & Creative Director',
        defaultBio: 'I design experiences that inspire and delight. Creating beautiful and functional designs with a keen eye for aesthetics.',
        defaultSkills: ['Figma', 'Adobe Creative Suite', 'UI Design', 'UX Research', 'Prototyping', 'Design Systems', 'Motion Design', 'Branding'],
        defaultProjects: [
            { name: 'Brand Identity System', description: 'Complete rebrand for a tech company', tech: ['Branding', 'Logo Design'], demo: 'https://dribbble.com' },
            { name: 'Mobile App Redesign', description: 'Increased engagement by 40%', tech: ['Figma', 'Prototyping'], demo: 'https://behance.net' },
            { name: 'Design System', description: 'Scalable component library', tech: ['Figma', 'Documentation'], demo: 'https://dribbble.com' }
        ],
        emoji: '🎨'
    },

    // SALON THEME
    {
        name: 'Elegance Spa',
        value: 'salon',
        category: 'salon',
        description: 'Soft, elegant design with service showcases and booking integration',
        colors: {
            primary: '350 60% 55%',
            secondary: '30 60% 50%',
            accent: '170 40% 45%',
            background: '30 20% 6%',
            foreground: '30 20% 95%',
            muted: '30 15% 15%',
            card: '30 15% 10%',
            cardForeground: '30 20% 95%',
            border: '30 15% 22%',
            backgroundLight: '30 50% 99%',
            foregroundLight: '30 30% 10%',
            mutedLight: '30 30% 95%',
            cardLight: '30 40% 98%',
            borderLight: '30 20% 90%',
        },
        typography: {
            headingFont: 'Cormorant Garamond, serif',
            bodyFont: 'Lato, sans-serif',
            headingWeight: '600',
            bodyWeight: '400',
        },
        layout: {
            style: 'elegant',
            heroStyle: 'fullscreen',
            gridColumns: 3,
            borderRadius: '0.75rem',
            glassmorphism: false,
        },
        defaultRole: 'Luxury Spa & Wellness Center',
        defaultBio: 'Experience tranquility at our award-winning spa. Premium treatments designed to restore balance and enhance your natural beauty.',
        defaultSkills: ['Massage Therapy', 'Facial Treatments', 'Body Wraps', 'Aromatherapy', 'Nail Services', 'Hair Styling'],
        defaultProjects: [
            { name: 'Signature Massage', description: '90-minute deep tissue massage', tech: ['$150', '90 min', 'Best Seller'] },
            { name: 'Radiance Facial', description: 'Luxurious anti-aging facial', tech: ['$120', '60 min', 'Popular'] },
            { name: 'Bridal Package', description: 'Complete pre-wedding beauty', tech: ['$500', 'Full Day', 'Premium'] }
        ],
        emoji: '💆'
    },

    // PHOTOGRAPHER THEME
    {
        name: 'Photo Gallery',
        value: 'photographer',
        category: 'photographer',
        description: 'Clean, image-focused design with gallery carousels and minimal text',
        colors: {
            primary: '0 0% 95%',
            secondary: '0 0% 60%',
            accent: '45 80% 50%',
            background: '0 0% 4%',
            foreground: '0 0% 96%',
            muted: '0 0% 12%',
            card: '0 0% 8%',
            cardForeground: '0 0% 96%',
            border: '0 0% 18%',
            backgroundLight: '0 0% 100%',
            foregroundLight: '0 0% 5%',
            mutedLight: '0 0% 96%',
            cardLight: '0 0% 98%',
            borderLight: '0 0% 92%',
        },
        typography: {
            headingFont: 'Montserrat, sans-serif',
            bodyFont: 'Source Sans Pro, sans-serif',
            headingWeight: '300',
            bodyWeight: '400',
        },
        layout: {
            style: 'minimal',
            heroStyle: 'fullscreen',
            gridColumns: 4,
            borderRadius: '0',
            glassmorphism: false,
        },
        defaultRole: 'Professional Photographer',
        defaultBio: 'I capture moments that tell stories. Specializing in portrait, wedding, and commercial photography.',
        defaultSkills: ['Portrait', 'Wedding', 'Commercial', 'Landscape', 'Product', 'Lightroom', 'Photoshop'],
        defaultProjects: [
            { name: 'Wedding Collection', description: 'Intimate wedding moments', tech: ['Wedding', 'Portrait'], demo: 'https://portfolio.com' },
            { name: 'Urban Portraits', description: 'Street photography meets portraiture', tech: ['Portrait', 'Street'], demo: 'https://portfolio.com' },
            { name: 'Commercial Work', description: 'Product and brand photography', tech: ['Product', 'Brand'], demo: 'https://portfolio.com' }
        ],
        emoji: '📷'
    },

    // STARTUP THEME
    {
        name: 'Startup Launch',
        value: 'startup',
        category: 'startup',
        description: 'Bold, modern design with product showcases and CTAs',
        colors: {
            primary: '250 90% 60%',
            secondary: '180 100% 45%',
            accent: '320 90% 55%',
            background: '240 15% 8%',
            foreground: '220 25% 96%',
            muted: '240 15% 15%',
            card: '240 15% 12%',
            cardForeground: '220 25% 96%',
            border: '240 15% 22%',
            backgroundLight: '220 30% 99%',
            foregroundLight: '240 20% 10%',
            mutedLight: '230 20% 95%',
            cardLight: '220 30% 98%',
            borderLight: '230 20% 90%',
        },
        typography: {
            headingFont: 'Space Grotesk, sans-serif',
            bodyFont: 'Inter, sans-serif',
            headingWeight: '700',
            bodyWeight: '400',
        },
        layout: {
            style: 'bold',
            heroStyle: 'split',
            gridColumns: 3,
            borderRadius: '1rem',
            glassmorphism: true,
        },
        defaultRole: 'Tech Startup & Product',
        defaultBio: 'Revolutionizing team collaboration with AI-powered solutions. Work smarter, not harder.',
        defaultSkills: ['AI & ML', 'Cloud', 'Mobile Apps', 'Analytics', 'Security', 'API Integration'],
        defaultProjects: [
            { name: 'Smart Collaboration', description: 'AI-powered workspace', tech: ['AI', 'Real-time'], demo: 'https://product.com' },
            { name: 'Analytics Dashboard', description: 'Beautiful data insights', tech: ['Data Viz', 'ML'], demo: 'https://product.com' },
            { name: 'Mobile Suite', description: 'Native iOS and Android apps', tech: ['iOS', 'Android'], demo: 'https://product.com' }
        ],
        emoji: '🚀'
    }
];

export function getDefaultUserData(theme: ThemeConfig): PortfolioData {
    return {
        name: 'John Doe',
        role: theme.defaultRole,
        bio: theme.defaultBio,
        skills: theme.defaultSkills,
        projects: theme.defaultProjects,
        enableBlog: theme.category === 'developer' || theme.category === 'designer',
        enableDarkMode: true,
        defaultDarkMode: true,
        social: getSocialDefaults(theme.category),
        theme: theme.value,
        themeConfig: theme,
        siteUrl: 'https://example.com',
        portfolioType: theme.category,
        seoTitle: `${theme.defaultRole} | Portfolio`,
        seoDescription: theme.defaultBio,
        seoKeywords: theme.defaultSkills.slice(0, 5),
    };
}

function getSocialDefaults(category: string): PortfolioData['social'] {
    switch (category) {
        case 'developer':
            return { github: 'https://github.com/johndoe', linkedin: 'https://linkedin.com/in/johndoe', email: 'hello@johndoe.dev' };
        case 'designer':
            return { behance: 'https://behance.net/johndoe', dribbble: 'https://dribbble.com/johndoe', instagram: 'https://instagram.com/johndoe', email: 'hello@johndoe.design' };
        case 'salon':
            return { instagram: 'https://instagram.com/elegancespa', phone: '+1 (555) 123-4567', email: 'book@elegancespa.com' };
        case 'photographer':
            return { instagram: 'https://instagram.com/johndoe_photo', email: 'hello@johndoe.photo' };
        case 'startup':
            return { twitter: 'https://twitter.com/startupco', linkedin: 'https://linkedin.com/company/startupco', email: 'hello@startup.co' };
        default:
            return { email: 'hello@example.com' };
    }
}

export async function collectUserData(): Promise<PortfolioData> {
    console.log(chalk.cyan('\n📋 Let\'s create your perfect portfolio!\n'));

    const themeChoices = themes.map(t => ({
        name: `${t.emoji} ${t.name} ${chalk.gray(`- ${t.description}`)}`,
        value: t.value,
        short: t.name
    }));

    const { selectedTheme } = await inquirer.prompt([{
        type: 'list',
        name: 'selectedTheme',
        message: 'Choose your portfolio theme:',
        choices: themeChoices,
        pageSize: 8
    }]);

    const theme = themes.find(t => t.value === selectedTheme)!;
    console.log(chalk.green(`\n✓ Selected: ${theme.emoji} ${theme.name}\n`));

    const personalInfo = await inquirer.prompt([
        { type: 'input', name: 'name', message: 'Your name:', default: 'John Doe' },
        { type: 'input', name: 'role', message: 'Your role/title:', default: theme.defaultRole },
        { type: 'input', name: 'bio', message: 'Short bio:', default: theme.defaultBio },
        { type: 'input', name: 'skills', message: 'Skills (comma-separated):', default: theme.defaultSkills.join(', '), filter: (input: string) => input.split(',').map(s => s.trim()).filter(Boolean) }
    ]);

    console.log(chalk.cyan('\n🔗 Social Links\n'));
    const socialPrompts = getSocialPrompts(theme.category);
    const socialInfo = await inquirer.prompt(socialPrompts);

    console.log(chalk.cyan('\n⚙️ Features\n'));
    const features = await inquirer.prompt([
        { type: 'confirm', name: 'enableDarkMode', message: 'Enable dark mode toggle?', default: true },
        { type: 'confirm', name: 'defaultDarkMode', message: 'Start in dark mode?', default: true },
        { type: 'confirm', name: 'enableBlog', message: 'Add MDX blog support?', default: theme.category === 'developer' }
    ]);

    const { siteUrl } = await inquirer.prompt([{ type: 'input', name: 'siteUrl', message: 'Website URL (for SEO):', default: 'https://yoursite.com' }]);

    return {
        ...personalInfo,
        projects: theme.defaultProjects,
        social: socialInfo,
        theme: theme.value,
        themeConfig: theme,
        portfolioType: theme.category,
        siteUrl,
        seoTitle: `${personalInfo.name} | ${personalInfo.role}`,
        seoDescription: personalInfo.bio,
        seoKeywords: personalInfo.skills.slice(0, 5),
        ...features
    };
}

function getSocialPrompts(category: string): any[] {
    const base = [{ type: 'input', name: 'email', message: 'Email:', default: 'hello@example.com' }];
    switch (category) {
        case 'developer':
            return [{ type: 'input', name: 'github', message: 'GitHub URL:', default: '' }, { type: 'input', name: 'linkedin', message: 'LinkedIn URL:', default: '' }, ...base];
        case 'designer':
            return [{ type: 'input', name: 'behance', message: 'Behance URL:', default: '' }, { type: 'input', name: 'dribbble', message: 'Dribbble URL:', default: '' }, { type: 'input', name: 'instagram', message: 'Instagram URL:', default: '' }, ...base];
        case 'salon':
            return [{ type: 'input', name: 'instagram', message: 'Instagram URL:', default: '' }, { type: 'input', name: 'phone', message: 'Phone:', default: '+1 (555) 123-4567' }, ...base];
        case 'photographer':
            return [{ type: 'input', name: 'instagram', message: 'Instagram URL:', default: '' }, ...base];
        case 'startup':
            return [{ type: 'input', name: 'twitter', message: 'Twitter URL:', default: '' }, { type: 'input', name: 'linkedin', message: 'LinkedIn URL:', default: '' }, ...base];
        default:
            return base;
    }
}

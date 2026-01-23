import path from 'path';
import fs from 'fs-extra';
import { PortfolioConfig } from '../prompts/portfolio-prompts.js';
import { PortfolioCommandOptions } from '../commands/portfolio.js';
import { logger } from '../utils/logger.js';

export async function generatePortfolioProject(
    projectName: string,
    config: PortfolioConfig,
    targetDir: string,
    options: PortfolioCommandOptions
): Promise<void> {
    // Create project directory
    await fs.ensureDir(targetDir);

    // Generate based on framework
    switch (config.framework) {
        case 'react-vite':
            await generateReactViteProject(projectName, config, targetDir, options);
            break;
        case 'nextjs':
            await generateNextJsProject(projectName, config, targetDir, options);
            break;
        case 'sveltekit':
            await generateSvelteKitProject(projectName, config, targetDir, options);
            break;
        default:
            await generateReactViteProject(projectName, config, targetDir, options);
    }

    // Copy custom assets if provided
    if (options.customAssets) {
        await copyCustomAssets(options.customAssets, targetDir);
    }

    // Generate deploy-ready files if requested
    if (options.deployReady) {
        await generateDeployFiles(targetDir, config);
    }
}

// =====================================================
// REACT + VITE GENERATOR
// =====================================================
async function generateReactViteProject(
    projectName: string,
    config: PortfolioConfig,
    targetDir: string,
    options: PortfolioCommandOptions
): Promise<void> {
    // Create directory structure
    const dirs = [
        'src/components',
        'src/pages',
        'src/styles',
        'src/assets',
        'src/lib',
        'src/config',
        'public'
    ];

    for (const dir of dirs) {
        await fs.ensureDir(path.join(targetDir, dir));
    }

    // Generate files
    await Promise.all([
        generatePackageJson(targetDir, projectName, config, 'react-vite'),
        generateTsConfig(targetDir, 'react-vite'),
        generateViteConfig(targetDir),
        generateIndexHtml(targetDir, config),
        generateGlobalStyles(targetDir, config),
        generateTailwindConfig(targetDir),
        generatePostCSSConfig(targetDir),
        generateMainTsx(targetDir, config),
        generateAppTsx(targetDir, config),
        generateComponents(targetDir, config),
        generatePortfolioConfig(targetDir, config),
        generateReadme(targetDir, projectName, config),
        generateEnvExample(targetDir),
        generateGitignore(targetDir),
        generateESLintConfig(targetDir, 'react-vite'),
        generatePrettierConfig(targetDir)
    ]);

    // Generate optional features
    if (config.features.blog) {
        await generateBlogFeature(targetDir, config, 'react-vite');
    }

    if (config.features.gallery) {
        await generateGalleryFeature(targetDir, config);
    }

    if (config.features.contactForm) {
        await generateContactFormFeature(targetDir, config);
    }

    if (config.features.testimonials) {
        await generateTestimonialsFeature(targetDir, config);
    }
}

// =====================================================
// NEXT.JS GENERATOR
// =====================================================
async function generateNextJsProject(
    projectName: string,
    config: PortfolioConfig,
    targetDir: string,
    options: PortfolioCommandOptions
): Promise<void> {
    // Create directory structure
    const dirs = [
        'src/app',
        'src/components',
        'src/styles',
        'src/lib',
        'public'
    ];

    for (const dir of dirs) {
        await fs.ensureDir(path.join(targetDir, dir));
    }

    // Generate files
    await Promise.all([
        generatePackageJson(targetDir, projectName, config, 'nextjs'),
        generateTsConfig(targetDir, 'nextjs'),
        generateNextConfig(targetDir),
        generateGlobalStyles(targetDir, config),
        generateTailwindConfig(targetDir),
        generatePostCSSConfig(targetDir),
        generateNextLayout(targetDir, config),
        generateNextPage(targetDir, config),
        generateNextComponents(targetDir, config),
        generateReadme(targetDir, projectName, config),
        generateEnvExample(targetDir),
        generateGitignore(targetDir),
        generateESLintConfig(targetDir, 'nextjs'),
        generatePrettierConfig(targetDir)
    ]);

    // Generate optional features
    if (config.features.blog && config.layout === 'multi-page') {
        await generateNextBlogFeature(targetDir, config);
    }
}

// =====================================================
// SVELTEKIT GENERATOR
// =====================================================
async function generateSvelteKitProject(
    projectName: string,
    config: PortfolioConfig,
    targetDir: string,
    options: PortfolioCommandOptions
): Promise<void> {
    // Create directory structure
    const dirs = [
        'src/routes',
        'src/lib/components',
        'src/lib/styles',
        'static'
    ];

    for (const dir of dirs) {
        await fs.ensureDir(path.join(targetDir, dir));
    }

    // Generate files
    await Promise.all([
        generatePackageJson(targetDir, projectName, config, 'sveltekit'),
        generateTsConfig(targetDir, 'sveltekit'),
        generateSvelteConfig(targetDir),
        generateSvelteGlobalStyles(targetDir, config),
        generateTailwindConfig(targetDir),
        generatePostCSSConfig(targetDir),
        generateSvelteLayout(targetDir, config),
        generateSveltePage(targetDir, config),
        generateSvelteComponents(targetDir, config),
        generateReadme(targetDir, projectName, config),
        generateEnvExample(targetDir),
        generateGitignore(targetDir),
        generatePrettierConfig(targetDir)
    ]);
}

// =====================================================
// FILE GENERATORS
// =====================================================

async function generatePackageJson(
    targetDir: string,
    projectName: string,
    config: PortfolioConfig,
    framework: string
): Promise<void> {
    let packageJson: any;

    if (framework === 'react-vite') {
        packageJson = {
            name: projectName,
            private: true,
            version: '0.1.0',
            type: 'module',
            scripts: {
                dev: 'vite',
                build: 'tsc && vite build',
                lint: 'eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0',
                preview: 'vite preview',
                format: 'prettier --write "src/**/*.{ts,tsx,css}"'
            },
            dependencies: {
                'react': '^18.2.0',
                'react-dom': '^18.2.0',
                'framer-motion': '^10.16.16',
                'lucide-react': '^0.303.0',
                'clsx': '^2.1.0',
                'tailwind-merge': '^2.2.0'
            },
            devDependencies: {
                '@types/react': '^18.2.47',
                '@types/react-dom': '^18.2.18',
                '@vitejs/plugin-react': '^4.2.1',
                'autoprefixer': '^10.4.16',
                'eslint': '^8.56.0',
                'eslint-plugin-react-hooks': '^4.6.0',
                'eslint-plugin-react-refresh': '^0.4.5',
                '@typescript-eslint/eslint-plugin': '^6.18.1',
                '@typescript-eslint/parser': '^6.18.1',
                'postcss': '^8.4.33',
                'prettier': '^3.2.2',
                'tailwindcss': '^3.4.1',
                'typescript': '^5.3.3',
                'vite': '^5.0.11'
            }
        };
    } else if (framework === 'nextjs') {
        packageJson = {
            name: projectName,
            private: true,
            version: '0.1.0',
            scripts: {
                dev: 'next dev',
                build: 'next build',
                start: 'next start',
                lint: 'next lint',
                format: 'prettier --write "src/**/*.{ts,tsx,css}"'
            },
            dependencies: {
                'next': '^14.1.0',
                'react': '^18.2.0',
                'react-dom': '^18.2.0',
                'framer-motion': '^10.16.16',
                'lucide-react': '^0.303.0',
                'clsx': '^2.1.0',
                'tailwind-merge': '^2.2.0'
            },
            devDependencies: {
                '@types/node': '^20.11.0',
                '@types/react': '^18.2.47',
                '@types/react-dom': '^18.2.18',
                'autoprefixer': '^10.4.16',
                'eslint': '^8.56.0',
                'eslint-config-next': '^14.1.0',
                'postcss': '^8.4.33',
                'prettier': '^3.2.2',
                'tailwindcss': '^3.4.1',
                'typescript': '^5.3.3'
            }
        };
    } else {
        packageJson = {
            name: projectName,
            private: true,
            version: '0.1.0',
            type: 'module',
            scripts: {
                dev: 'vite dev',
                build: 'vite build',
                preview: 'vite preview',
                format: 'prettier --write "src/**/*.{ts,svelte,css}"'
            },
            dependencies: {
                'lucide-svelte': '^0.303.0'
            },
            devDependencies: {
                '@sveltejs/adapter-auto': '^3.1.0',
                '@sveltejs/kit': '^2.0.6',
                '@sveltejs/vite-plugin-svelte': '^3.0.1',
                'autoprefixer': '^10.4.16',
                'postcss': '^8.4.33',
                'prettier': '^3.2.2',
                'prettier-plugin-svelte': '^3.1.2',
                'svelte': '^4.2.8',
                'tailwindcss': '^3.4.1',
                'typescript': '^5.3.3',
                'vite': '^5.0.11'
            }
        };
    }

    await fs.writeJson(path.join(targetDir, 'package.json'), packageJson, { spaces: 2 });
}

async function generateTsConfig(targetDir: string, framework: string): Promise<void> {
    let tsConfig: any;

    if (framework === 'react-vite') {
        tsConfig = {
            compilerOptions: {
                target: 'ES2020',
                useDefineForClassFields: true,
                lib: ['ES2020', 'DOM', 'DOM.Iterable'],
                module: 'ESNext',
                skipLibCheck: true,
                moduleResolution: 'bundler',
                allowImportingTsExtensions: true,
                resolveJsonModule: true,
                isolatedModules: true,
                noEmit: true,
                jsx: 'react-jsx',
                strict: true,
                noUnusedLocals: true,
                noUnusedParameters: true,
                noFallthroughCasesInSwitch: true,
                baseUrl: '.',
                paths: {
                    '@/*': ['./src/*']
                }
            },
            include: ['src'],
            references: [{ path: './tsconfig.node.json' }]
        };

        // Also create tsconfig.node.json
        const tsConfigNode = {
            compilerOptions: {
                composite: true,
                skipLibCheck: true,
                module: 'ESNext',
                moduleResolution: 'bundler',
                allowSyntheticDefaultImports: true
            },
            include: ['vite.config.ts']
        };
        await fs.writeJson(path.join(targetDir, 'tsconfig.node.json'), tsConfigNode, { spaces: 2 });
    } else if (framework === 'nextjs') {
        tsConfig = {
            compilerOptions: {
                target: 'es5',
                lib: ['dom', 'dom.iterable', 'esnext'],
                allowJs: true,
                skipLibCheck: true,
                strict: true,
                noEmit: true,
                esModuleInterop: true,
                module: 'esnext',
                moduleResolution: 'bundler',
                resolveJsonModule: true,
                isolatedModules: true,
                jsx: 'preserve',
                incremental: true,
                plugins: [{ name: 'next' }],
                paths: {
                    '@/*': ['./src/*']
                }
            },
            include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
            exclude: ['node_modules']
        };
    } else {
        tsConfig = {
            extends: './.svelte-kit/tsconfig.json',
            compilerOptions: {
                allowJs: true,
                checkJs: true,
                esModuleInterop: true,
                forceConsistentCasingInFileNames: true,
                resolveJsonModule: true,
                skipLibCheck: true,
                sourceMap: true,
                strict: true
            }
        };
    }

    await fs.writeJson(path.join(targetDir, 'tsconfig.json'), tsConfig, { spaces: 2 });
}

async function generateViteConfig(targetDir: string): Promise<void> {
    const config = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
`;
    await fs.writeFile(path.join(targetDir, 'vite.config.ts'), config);
}

async function generateNextConfig(targetDir: string): Promise<void> {
    const config = `/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
};

module.exports = nextConfig;
`;
    await fs.writeFile(path.join(targetDir, 'next.config.js'), config);
}

async function generateSvelteConfig(targetDir: string): Promise<void> {
    const config = `import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter()
    }
};

export default config;
`;
    await fs.writeFile(path.join(targetDir, 'svelte.config.js'), config);
}

async function generateIndexHtml(targetDir: string, config: PortfolioConfig): Promise<void> {
    const html = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${config.userData.bio}" />
        <meta name="author" content="${config.userData.name}" />
        <title>${config.userData.name} | ${config.userData.role}</title>
    </head>
    <body>
        <div id="root"></div>
        <script type="module" src="/src/main.tsx"></script>
    </body>
</html>
`;
    await fs.writeFile(path.join(targetDir, 'index.html'), html);
}

async function generateGlobalStyles(targetDir: string, config: PortfolioConfig): Promise<void> {
    const colors = config.colorScheme.colors;
    const css = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
    :root {
        --primary: ${colors.primary};
        --secondary: ${colors.secondary};
        --accent: ${colors.accent};
        --background: ${colors.background};
        --foreground: ${colors.foreground};
        --muted: ${colors.muted};
    }

    .dark {
        --background: ${colors.background};
        --foreground: ${colors.foreground};
    }

    .light {
        --background: 0 0% 100%;
        --foreground: ${colors.background};
    }
}

@layer base {
    * {
        @apply border-border;
    }

    body {
        @apply bg-background text-foreground;
        font-feature-settings: "rlig" 1, "calt" 1;
    }
}

/* Smooth scrolling */
html {
    scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: hsl(var(--muted));
}

::-webkit-scrollbar-thumb {
    background: hsl(var(--primary));
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--secondary));
}

/* Selection color */
::selection {
    background: hsl(var(--primary) / 0.3);
}
`;
    await fs.writeFile(path.join(targetDir, 'src/styles/globals.css'), css);
}

async function generateSvelteGlobalStyles(targetDir: string, config: PortfolioConfig): Promise<void> {
    const colors = config.colorScheme.colors;
    const css = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
    --primary: ${colors.primary};
    --secondary: ${colors.secondary};
    --accent: ${colors.accent};
    --background: ${colors.background};
    --foreground: ${colors.foreground};
    --muted: ${colors.muted};
}

html {
    scroll-behavior: smooth;
}

body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
}
`;
    await fs.writeFile(path.join(targetDir, 'src/lib/styles/app.css'), css);
}

async function generateTailwindConfig(targetDir: string): Promise<void> {
    const config = `/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx,svelte}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                border: 'hsl(var(--muted))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--background))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--background))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--background))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--foreground) / 0.7)',
                },
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
};
`;
    await fs.writeFile(path.join(targetDir, 'tailwind.config.js'), config);
}

async function generatePostCSSConfig(targetDir: string): Promise<void> {
    const config = `export default {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
};
`;
    await fs.writeFile(path.join(targetDir, 'postcss.config.js'), config);
}

async function generateMainTsx(targetDir: string, config: PortfolioConfig): Promise<void> {
    const content = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
`;
    await fs.writeFile(path.join(targetDir, 'src/main.tsx'), content);
}

async function generateAppTsx(targetDir: string, config: PortfolioConfig): Promise<void> {
    const components = ['Hero'];
    if (config.features.gallery) components.push('Gallery');
    if (config.features.testimonials) components.push('Testimonials');
    if (config.features.blog) components.push('Blog');
    if (config.features.contactForm) components.push('Contact');
    components.push('Footer');

    const imports = components.map(c => `import ${c} from './components/${c}';`).join('\n');
    const jsx = components.map(c => `                <${c} />`).join('\n');

    const content = `import { useState, useEffect } from 'react';
import ThemeToggle from './components/ThemeToggle';
${imports}

function App() {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setDarkMode(savedTheme === 'dark');
        }
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        document.documentElement.classList.toggle('light', !darkMode);
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            <main>
${jsx}
            </main>
        </div>
    );
}

export default App;
`;
    await fs.writeFile(path.join(targetDir, 'src/App.tsx'), content);
}

async function generateComponents(targetDir: string, config: PortfolioConfig): Promise<void> {
    // Generate Hero component
    await generateHeroComponent(targetDir, config);
    
    // Generate ThemeToggle
    await generateThemeToggle(targetDir);
    
    // Generate Footer
    await generateFooterComponent(targetDir, config);
}

async function generateHeroComponent(targetDir: string, config: PortfolioConfig): Promise<void> {
    const content = `import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-6xl mb-6 block">${config.type.emoji}</span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        ${config.userData.name}
                    </h1>
                    <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">
                        ${config.userData.role}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                        ${config.userData.bio}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {${JSON.stringify(config.userData.skills)}.map((skill, index) => (
                        <span
                            key={index}
                            className="px-4 py-2 bg-muted rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                            {skill}
                        </span>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="flex justify-center gap-4"
                >
                    <a
                        href="#contact"
                        className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                        Get in Touch
                    </a>
                    <a
                        href="#portfolio"
                        className="px-8 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                        View Work
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
`;
    await fs.writeFile(path.join(targetDir, 'src/components/Hero.tsx'), content);
}

async function generateThemeToggle(targetDir: string): Promise<void> {
    const content = `import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
}

const ThemeToggle = ({ darkMode, setDarkMode }: ThemeToggleProps) => {
    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className="fixed top-6 right-6 z-50 p-3 rounded-full bg-muted hover:bg-primary transition-colors"
            aria-label="Toggle theme"
        >
            {darkMode ? (
                <Sun className="w-5 h-5 text-foreground" />
            ) : (
                <Moon className="w-5 h-5 text-foreground" />
            )}
        </motion.button>
    );
};

export default ThemeToggle;
`;
    await fs.writeFile(path.join(targetDir, 'src/components/ThemeToggle.tsx'), content);
}

async function generateFooterComponent(targetDir: string, config: PortfolioConfig): Promise<void> {
    const content = `import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 px-4 border-t border-muted">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <p className="text-muted-foreground flex items-center justify-center gap-2">
                        Made with <Heart className="w-4 h-4 text-red-500" /> by ${config.userData.name}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                        © {currentYear} All rights reserved.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
`;
    await fs.writeFile(path.join(targetDir, 'src/components/Footer.tsx'), content);
}

async function generatePortfolioConfig(targetDir: string, config: PortfolioConfig): Promise<void> {
    const portfolioData = {
        name: config.userData.name,
        role: config.userData.role,
        bio: config.userData.bio,
        skills: config.userData.skills,
        email: config.userData.email,
        social: config.userData.social || {},
        theme: config.type.value,
        colorScheme: config.colorScheme.value
    };

    await fs.writeJson(path.join(targetDir, 'src/config/portfolio.json'), portfolioData, { spaces: 2 });
}

async function generateReadme(targetDir: string, projectName: string, config: PortfolioConfig): Promise<void> {
    const content = `# ${config.userData.name} - Portfolio

${config.type.emoji} **${config.type.name}** portfolio built with ${getFrameworkName(config.framework)}.

## 🚀 Getting Started

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
\`\`\`

## ✨ Features

${config.features.contactForm ? '- 📬 Contact Form\n' : ''}${config.features.gallery ? '- 🖼️ Gallery/Portfolio Showcase\n' : ''}${config.features.blog ? '- 📝 Blog Section\n' : ''}${config.features.testimonials ? '- ⭐ Testimonials\n' : ''}- 🌙 Dark/Light Mode Toggle
- 📱 Fully Responsive
- ⚡ Fast & Optimized

## 🛠️ Tech Stack

- ${getFrameworkName(config.framework)}
- TypeScript
- Tailwind CSS
- Framer Motion

## 📁 Project Structure

\`\`\`
${projectName}/
├── src/
│   ├── components/    # React components
│   ├── styles/        # Global styles
│   ├── config/        # Configuration files
│   └── assets/        # Static assets
├── public/            # Public files
└── package.json
\`\`\`

## 🚀 Deployment

### Vercel
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Netlify
\`\`\`bash
npm run build
# Upload dist folder to Netlify
\`\`\`

---

Built with ❤️ using [ForgeStack Portfolio Generator](https://github.com/forgestack)
`;
    await fs.writeFile(path.join(targetDir, 'README.md'), content);
}

async function generateEnvExample(targetDir: string): Promise<void> {
    const content = `# Environment Variables
# Copy this file to .env and fill in your values

# Site Configuration
VITE_SITE_URL=http://localhost:5173

# Contact Form (optional)
# VITE_CONTACT_API_URL=

# Analytics (optional)
# VITE_GA_ID=
`;
    await fs.writeFile(path.join(targetDir, '.env.example'), content);
}

async function generateGitignore(targetDir: string): Promise<void> {
    const content = `# Dependencies
node_modules/

# Build outputs
dist/
.next/
.svelte-kit/
build/

# Environment files
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# TypeScript
*.tsbuildinfo
`;
    await fs.writeFile(path.join(targetDir, '.gitignore'), content);
}

async function generateESLintConfig(targetDir: string, framework: string): Promise<void> {
    let config: any;

    if (framework === 'react-vite') {
        config = {
            root: true,
            env: { browser: true, es2020: true },
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:react-hooks/recommended'
            ],
            ignorePatterns: ['dist', '.eslintrc.json'],
            parser: '@typescript-eslint/parser',
            plugins: ['react-refresh'],
            rules: {
                'react-refresh/only-export-components': [
                    'warn',
                    { allowConstantExport: true }
                ]
            }
        };
    } else if (framework === 'nextjs') {
        config = {
            extends: ['next/core-web-vitals']
        };
    } else {
        // SvelteKit uses different linting
        return;
    }

    await fs.writeJson(path.join(targetDir, '.eslintrc.json'), config, { spaces: 2 });
}

async function generatePrettierConfig(targetDir: string): Promise<void> {
    const config = {
        semi: true,
        singleQuote: true,
        tabWidth: 4,
        trailingComma: 'es5',
        printWidth: 100
    };
    await fs.writeJson(path.join(targetDir, '.prettierrc'), config, { spaces: 2 });
}

// Feature generators
async function generateGalleryFeature(targetDir: string, config: PortfolioConfig): Promise<void> {
    const content = `import { motion } from 'framer-motion';
import { ExternalLink, Image } from 'lucide-react';

const galleryItems = [
    {
        id: 1,
        title: 'Project One',
        description: 'A beautiful project showcasing creative work',
        image: '/placeholder-1.jpg',
        link: '#'
    },
    {
        id: 2,
        title: 'Project Two',
        description: 'Another amazing project with great attention to detail',
        image: '/placeholder-2.jpg',
        link: '#'
    },
    {
        id: 3,
        title: 'Project Three',
        description: 'Innovative solution with modern design',
        image: '/placeholder-3.jpg',
        link: '#'
    },
    {
        id: 4,
        title: 'Project Four',
        description: 'Creative exploration and experimentation',
        image: '/placeholder-4.jpg',
        link: '#'
    }
];

const Gallery = () => {
    return (
        <section id="portfolio" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        My <span className="text-primary">Work</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Explore my latest projects and creative endeavors
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {galleryItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative bg-muted rounded-xl overflow-hidden"
                        >
                            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                <Image className="w-16 h-16 text-muted-foreground" />
                            </div>
                            <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="text-center p-6">
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground mb-4">{item.description}</p>
                                    <a
                                        href={item.link}
                                        className="inline-flex items-center gap-2 text-primary hover:underline"
                                    >
                                        View Project <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
`;
    await fs.writeFile(path.join(targetDir, 'src/components/Gallery.tsx'), content);
}

async function generateContactFormFeature(targetDir: string, config: PortfolioConfig): Promise<void> {
    const content = `import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        alert('Thank you for your message! I will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitting(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <section id="contact" className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Get in <span className="text-primary">Touch</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Have a project in mind? Let's work together to bring your ideas to life.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xl font-bold mb-6">Contact Info</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <Mail className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium">${config.userData.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <MapPin className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Location</p>
                                    <p className="font-medium">${config.userData.location || 'Available Worldwide'}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-muted rounded-lg border border-muted focus:border-primary focus:outline-none transition-colors"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-muted rounded-lg border border-muted focus:border-primary focus:outline-none transition-colors"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full px-4 py-3 bg-muted rounded-lg border border-muted focus:border-primary focus:outline-none transition-colors resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? 'Sending...' : (
                                <>
                                    Send Message <Send className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
`;
    await fs.writeFile(path.join(targetDir, 'src/components/Contact.tsx'), content);
}

async function generateTestimonialsFeature(targetDir: string, config: PortfolioConfig): Promise<void> {
    const content = `import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Sarah Johnson',
        role: 'CEO, TechStart',
        content: 'Absolutely amazing work! The attention to detail and professionalism exceeded our expectations.',
        rating: 5
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'Founder, DesignCo',
        content: 'A pleasure to work with. Delivered on time and the quality was outstanding.',
        rating: 5
    },
    {
        id: 3,
        name: 'Emily Brown',
        role: 'Marketing Director',
        content: 'Creative, reliable, and truly understands client needs. Highly recommended!',
        rating: 5
    }
];

const Testimonials = () => {
    return (
        <section className="py-20 px-4 bg-muted/30">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        What Clients <span className="text-primary">Say</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Hear from the people I've had the pleasure of working with
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-background p-6 rounded-xl border border-muted"
                        >
                            <Quote className="w-8 h-8 text-primary mb-4" />
                            <p className="text-muted-foreground mb-6 italic">
                                "{testimonial.content}"
                            </p>
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                                ))}
                            </div>
                            <div>
                                <p className="font-bold">{testimonial.name}</p>
                                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
`;
    await fs.writeFile(path.join(targetDir, 'src/components/Testimonials.tsx'), content);
}

async function generateBlogFeature(targetDir: string, config: PortfolioConfig, framework: string): Promise<void> {
    const content = `import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const blogPosts = [
    {
        id: 1,
        title: 'Getting Started with Modern Web Development',
        excerpt: 'A comprehensive guide to starting your journey in web development with the latest tools and frameworks.',
        date: '2024-01-15',
        readTime: '5 min',
        slug: 'getting-started'
    },
    {
        id: 2,
        title: 'Best Practices for Clean Code',
        excerpt: 'Learn how to write maintainable, readable, and efficient code that your future self will thank you for.',
        date: '2024-01-10',
        readTime: '8 min',
        slug: 'clean-code'
    },
    {
        id: 3,
        title: 'The Future of AI in Development',
        excerpt: 'Exploring how artificial intelligence is shaping the future of software development and what it means for developers.',
        date: '2024-01-05',
        readTime: '6 min',
        slug: 'ai-future'
    }
];

const Blog = () => {
    return (
        <section id="blog" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Latest <span className="text-primary">Articles</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Thoughts, tutorials, and insights from my journey
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-muted/50 rounded-xl overflow-hidden hover:bg-muted transition-colors"
                        >
                            <div className="p-6">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(post.date).toLocaleDateString('en-US', { 
                                            month: 'short', 
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {post.readTime}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    {post.excerpt}
                                </p>
                                <a
                                    href={\`/blog/\${post.slug}\`}
                                    className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                                >
                                    Read More <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
`;
    await fs.writeFile(path.join(targetDir, 'src/components/Blog.tsx'), content);
}

// Next.js specific generators
async function generateNextLayout(targetDir: string, config: PortfolioConfig): Promise<void> {
    const content = `import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: '${config.userData.name} | ${config.userData.role}',
    description: '${config.userData.bio}',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
`;
    await fs.writeFile(path.join(targetDir, 'src/app/layout.tsx'), content);

    // Also create globals.css in app folder
    const colors = config.colorScheme.colors;
    const css = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
    :root {
        --primary: ${colors.primary};
        --secondary: ${colors.secondary};
        --accent: ${colors.accent};
        --background: ${colors.background};
        --foreground: ${colors.foreground};
        --muted: ${colors.muted};
    }
}

body {
    @apply bg-background text-foreground;
}
`;
    await fs.writeFile(path.join(targetDir, 'src/app/globals.css'), css);
}

async function generateNextPage(targetDir: string, config: PortfolioConfig): Promise<void> {
    const content = `'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <main className="min-h-screen">
            <Hero />
            <Footer />
        </main>
    );
}
`;
    await fs.writeFile(path.join(targetDir, 'src/app/page.tsx'), content);
}

async function generateNextComponents(targetDir: string, config: PortfolioConfig): Promise<void> {
    await generateHeroComponent(targetDir, config);
    await generateThemeToggle(targetDir);
    await generateFooterComponent(targetDir, config);
}

async function generateNextBlogFeature(targetDir: string, config: PortfolioConfig): Promise<void> {
    await fs.ensureDir(path.join(targetDir, 'src/app/blog'));
    await generateBlogFeature(targetDir, config, 'nextjs');
}

// SvelteKit specific generators
async function generateSvelteLayout(targetDir: string, config: PortfolioConfig): Promise<void> {
    const content = `<script>
    import '../lib/styles/app.css';
</script>

<slot />
`;
    await fs.writeFile(path.join(targetDir, 'src/routes/+layout.svelte'), content);
}

async function generateSveltePage(targetDir: string, config: PortfolioConfig): Promise<void> {
    const content = `<script lang="ts">
    import Hero from '$lib/components/Hero.svelte';
    import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
    <title>${config.userData.name} | ${config.userData.role}</title>
    <meta name="description" content="${config.userData.bio}" />
</svelte:head>

<main class="min-h-screen bg-background text-foreground">
    <Hero />
    <Footer />
</main>
`;
    await fs.writeFile(path.join(targetDir, 'src/routes/+page.svelte'), content);
}

async function generateSvelteComponents(targetDir: string, config: PortfolioConfig): Promise<void> {
    // Hero component
    const heroContent = `<script lang="ts">
    const name = '${config.userData.name}';
    const role = '${config.userData.role}';
    const bio = '${config.userData.bio}';
    const skills = ${JSON.stringify(config.userData.skills)};
</script>

<section class="min-h-screen flex items-center justify-center px-4 py-20">
    <div class="max-w-4xl mx-auto text-center">
        <span class="text-6xl mb-6 block">${config.type.emoji}</span>
        <h1 class="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {name}
        </h1>
        <h2 class="text-xl md:text-2xl text-muted-foreground mb-6">
            {role}
        </h2>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {bio}
        </p>
        <div class="flex flex-wrap justify-center gap-3 mb-12">
            {#each skills as skill}
                <span class="px-4 py-2 bg-muted rounded-full text-sm font-medium">
                    {skill}
                </span>
            {/each}
        </div>
        <div class="flex justify-center gap-4">
            <a
                href="#contact"
                class="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
                Get in Touch
            </a>
        </div>
    </div>
</section>

<style>
    .bg-clip-text {
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }
</style>
`;
    await fs.writeFile(path.join(targetDir, 'src/lib/components/Hero.svelte'), heroContent);

    // Footer component
    const footerContent = `<script lang="ts">
    const currentYear = new Date().getFullYear();
    const name = '${config.userData.name}';
</script>

<footer class="py-8 px-4 border-t border-muted">
    <div class="max-w-4xl mx-auto text-center">
        <p class="text-muted-foreground">
            Made with ❤️ by {name}
        </p>
        <p class="text-sm text-muted-foreground mt-2">
            © {currentYear} All rights reserved.
        </p>
    </div>
</footer>
`;
    await fs.writeFile(path.join(targetDir, 'src/lib/components/Footer.svelte'), footerContent);
}

// Helper functions
async function copyCustomAssets(assetsPath: string, targetDir: string): Promise<void> {
    const sourceDir = path.resolve(assetsPath);
    const destDir = path.join(targetDir, 'src', 'assets');
    
    if (await fs.pathExists(sourceDir)) {
        await fs.copy(sourceDir, destDir);
        logger.success('Custom assets copied');
    }
}

async function generateDeployFiles(targetDir: string, config: PortfolioConfig): Promise<void> {
    // Vercel config
    const vercelConfig = {
        framework: config.framework === 'nextjs' ? 'nextjs' : 'vite',
        buildCommand: 'npm run build',
        outputDirectory: config.framework === 'nextjs' ? '.next' : 'dist'
    };
    await fs.writeJson(path.join(targetDir, 'vercel.json'), vercelConfig, { spaces: 2 });

    // Netlify config
    const netlifyConfig = `[build]
  command = "npm run build"
  publish = "${config.framework === 'nextjs' ? '.next' : 'dist'}"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`;
    await fs.writeFile(path.join(targetDir, 'netlify.toml'), netlifyConfig);

    logger.success('Deploy configuration files created');
}

function getFrameworkName(framework: string): string {
    const names: Record<string, string> = {
        'react-vite': 'React + Vite',
        'nextjs': 'Next.js',
        'sveltekit': 'SvelteKit'
    };
    return names[framework] || framework;
}

function getHeroIcons(category: string): string {
    const icons: Record<string, string> = {
        'Professional': 'Code, Terminal, Briefcase',
        'Creative': 'Palette, Camera, PenTool',
        'Business': 'Building, TrendingUp, Users',
        'Beauty': 'Sparkles, Heart, Star',
        'Food': 'UtensilsCrossed, Coffee, ChefHat',
        'Personal': 'User, Award, Target'
    };
    return icons[category] || 'Star, Heart, Zap';
}

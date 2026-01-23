import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { PortfolioData } from '../prompts/index.js';
import { copyDirectory, writeFile } from '../utils/file.js';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function generatePortfolio(
    projectName: string,
    data: PortfolioData,
    targetDir: string
): Promise<void> {
    const spinner = ora('Generating your portfolio...').start();

    try {
        // Determine template path
        let templatePath = path.resolve(__dirname, '../../templates');

        const isDebug = process.env.DEBUG === 'true';

        if (isDebug) {
            logger.info(`Template source path: ${templatePath}`);
            logger.info(`Target destination: ${targetDir}`);
        }

        // Check if template path exists
        if (!await fs.pathExists(templatePath)) {
            const fallbacks = [
                path.resolve(__dirname, '../../../template'),
                path.resolve(__dirname, '../../../../packages/template'),
                path.resolve(__dirname, '../templates'),
            ];

            let found = false;
            for (const fallback of fallbacks) {
                if (await fs.pathExists(fallback)) {
                    templatePath = fallback;
                    found = true;
                    if (isDebug) logger.info(`Found template at: ${templatePath}`);
                    break;
                }
            }

            if (!found) {
                throw new Error(`Template directory not found.`);
            }
        }

        const templateFiles = await fs.readdir(templatePath);
        if (templateFiles.length === 0) {
            throw new Error(`Template directory is empty: ${templatePath}`);
        }

        await fs.ensureDir(targetDir);

        spinner.text = 'Copying template files...';
        await copyDirectory(templatePath, targetDir);

        const packageCheckPath = path.join(targetDir, 'package.json');
        if (!await fs.pathExists(packageCheckPath)) {
            throw new Error(`Failed to copy template files.`);
        }

        spinner.text = 'Creating configuration...';
        const config = {
            name: data.name,
            role: data.role,
            bio: data.bio,
            skills: data.skills,
            projects: data.projects,
            enableBlog: data.enableBlog,
            enableDarkMode: data.enableDarkMode,
            defaultDarkMode: data.defaultDarkMode,
            social: data.social,
            theme: data.theme,
            themeConfig: data.themeConfig,
            siteUrl: data.siteUrl,
            portfolioType: data.portfolioType || 'developer'
        };

        await writeFile(
            path.join(targetDir, 'src', 'config', 'portfolio.json'),
            JSON.stringify(config, null, 2)
        );

        spinner.text = 'Applying theme styles...';
        await generateThemeCSS(targetDir, data);
        await generateIndexHtml(targetDir, data);

        const targetPackageJsonPath = path.join(targetDir, 'package.json');
        const packageJson = await fs.readJson(targetPackageJsonPath);
        packageJson.name = projectName;
        
        if (data.enableBlog) {
            packageJson.dependencies = packageJson.dependencies || {};
            packageJson.dependencies['@mdx-js/react'] = '^3.0.0';
            packageJson.dependencies['@mdx-js/rollup'] = '^3.0.0';
            packageJson.dependencies['gray-matter'] = '^4.0.3';
            packageJson.dependencies['reading-time'] = '^1.5.0';
            packageJson.devDependencies = packageJson.devDependencies || {};
            packageJson.devDependencies['@types/mdx'] = '^2.0.10';
        }
        
        await fs.writeJson(targetPackageJsonPath, packageJson, { spaces: 2 });

        spinner.text = 'Creating README...';
        await writeFile(path.join(targetDir, 'README.md'), generateReadme(projectName, data));

        spinner.text = 'Adding MIT License...';
        await writeFile(path.join(targetDir, 'LICENSE'), generateLicense(data.name));

        spinner.text = 'Adding contributing guide...';
        await writeFile(path.join(targetDir, 'CONTRIBUTING.md'), generateContributing(projectName));

        if (data.siteUrl) {
            spinner.text = 'Generating sitemap...';
            await writeFile(path.join(targetDir, 'public', 'sitemap.xml'), generateSitemap(data));
            await writeFile(path.join(targetDir, 'public', 'robots.txt'), generateRobotsTxt(data.siteUrl));
        }

        if (data.enableBlog) {
            spinner.text = 'Setting up blog structure...';
            await setupBlogStructure(targetDir);
        }

        spinner.succeed('Portfolio generated successfully!');
    } catch (error) {
        spinner.fail('Failed to generate portfolio');
        throw error;
    }
}

async function generateThemeCSS(targetDir: string, data: PortfolioData): Promise<void> {
    const { themeConfig, enableDarkMode, defaultDarkMode } = data;
    const colors = themeConfig.colors;
    const typography = themeConfig.typography;
    const layout = themeConfig.layout;

    const cssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-family: ${typography.bodyFont};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${typography.headingFont};
    font-weight: ${typography.headingWeight};
  }

  :root {
    --background: ${enableDarkMode && !defaultDarkMode ? colors.backgroundLight : colors.background};
    --foreground: ${enableDarkMode && !defaultDarkMode ? colors.foregroundLight : colors.foreground};
    --muted: ${enableDarkMode && !defaultDarkMode ? colors.mutedLight : colors.muted};
    --muted-foreground: 215.4 16.3% 56.9%;
    --primary: ${colors.primary};
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: ${colors.secondary};
    --secondary-foreground: 210 40% 98%;
    --accent: ${colors.accent};
    --accent-foreground: 222.2 47.4% 11.2%;
    --card: ${enableDarkMode && !defaultDarkMode ? colors.cardLight : colors.card};
    --card-foreground: ${enableDarkMode && !defaultDarkMode ? colors.foregroundLight : colors.cardForeground};
    --border: ${enableDarkMode && !defaultDarkMode ? colors.borderLight : colors.border};
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
    --radius: ${layout.borderRadius};
  }

  .dark {
    --background: ${colors.background};
    --foreground: ${colors.foreground};
    --muted: ${colors.muted};
    --muted-foreground: 215.4 16.3% 56.9%;
    --card: ${colors.card};
    --card-foreground: ${colors.cardForeground};
    --border: ${colors.border};
    --input: 217.2 32.6% 17.5%;
  }

  .light {
    --background: ${colors.backgroundLight};
    --foreground: ${colors.foregroundLight};
    --muted: ${colors.mutedLight};
    --muted-foreground: 215.4 16.3% 46.9%;
    --card: ${colors.cardLight};
    --card-foreground: ${colors.foregroundLight};
    --border: ${colors.borderLight};
    --input: 220 13% 91%;
  }
}

@layer utilities {
  .glass {
    background: rgba(255, 255, 255, 0.05);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .light .glass {
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(0, 0, 0, 0.08);
  }

  .gradient-text {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent;
  }

  .glow-effect {
    box-shadow: 0 0 25px hsla(var(--primary), 0.4);
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-glow {
    animation: glow 2s ease-in-out infinite alternate;
  }

  .card-hover {
    @apply transition-all duration-300 hover:scale-105 hover:-translate-y-2;
  }
  
  .btn-primary {
    @apply px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg;
  }

  .btn-secondary {
    @apply px-6 py-3 rounded-lg bg-muted hover:bg-muted/80 font-medium transition-all duration-300;
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes glow {
  from { filter: brightness(1); }
  to { filter: brightness(1.2); }
}

html {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: hsl(var(--muted));
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--primary));
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--secondary));
}

body {
  transition: background-color 0.3s ease, color 0.3s ease;
}

*:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
}
`;

    await writeFile(path.join(targetDir, 'src', 'styles', 'globals.css'), cssContent);
}

async function generateIndexHtml(targetDir: string, data: PortfolioData): Promise<void> {
    const typography = data.themeConfig.typography;
    
    const fontMap: Record<string, string> = {
        'JetBrains Mono, monospace': 'JetBrains+Mono:wght@400;500;600;700',
        'Inter, system-ui, sans-serif': 'Inter:wght@300;400;500;600;700;800',
        'Inter, sans-serif': 'Inter:wght@300;400;500;600;700;800',
        'Playfair Display, serif': 'Playfair+Display:wght@400;500;600;700',
        'Poppins, sans-serif': 'Poppins:wght@300;400;500;600;700',
        'Cormorant Garamond, serif': 'Cormorant+Garamond:wght@400;500;600;700',
        'Lato, sans-serif': 'Lato:wght@300;400;700',
        'Montserrat, sans-serif': 'Montserrat:wght@300;400;500;600;700',
        'Source Sans Pro, sans-serif': 'Source+Sans+3:wght@300;400;600',
        'Space Grotesk, sans-serif': 'Space+Grotesk:wght@400;500;600;700',
    };

    const headingFontUrl = fontMap[typography.headingFont] || 'Inter:wght@400;500;600;700';
    const bodyFontUrl = fontMap[typography.bodyFont] || 'Inter:wght@300;400;500;600;700';
    
    const fonts = new Set([headingFontUrl, bodyFontUrl]);
    const fontsUrl = `https://fonts.googleapis.com/css2?${Array.from(fonts).map(f => `family=${f}`).join('&')}&display=swap`;

    const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#000000" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="${fontsUrl}" rel="stylesheet">
    <title>${data.name} | ${data.role}</title>
    <meta name="description" content="${data.bio}" />
    <meta name="keywords" content="${data.seoKeywords?.join(', ') || data.skills.slice(0, 5).join(', ')}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${data.siteUrl || 'https://example.com'}" />
    <meta property="og:title" content="${data.name} | ${data.role}" />
    <meta property="og:description" content="${data.bio}" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${data.name} | ${data.role}" />
    <meta name="twitter:description" content="${data.bio}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

    await writeFile(path.join(targetDir, 'index.html'), indexHtml);
}

async function setupBlogStructure(targetDir: string): Promise<void> {
    const blogDir = path.join(targetDir, 'src', 'content', 'blog');
    await fs.ensureDir(blogDir);

    const today = new Date().toISOString().split('T')[0];
    const samplePost = `---
title: "Welcome to My Blog"
date: "${today}"
excerpt: "This is my first blog post using MDX. Learn how to customize and add more posts."
tags: ["welcome", "intro", "mdx"]
---

# Welcome to My Blog!

This is a sample blog post written in **MDX**. You can use all the power of Markdown with React components.

## Getting Started

To add a new blog post:

1. Create a new \`.mdx\` file in \`src/content/blog/\`
2. Add frontmatter with title, date, excerpt, and tags
3. Write your content using Markdown and JSX

## Code Example

\`\`\`typescript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

## What's Next?

Start customizing your portfolio and adding more content. Happy blogging! 🚀
`;

    await writeFile(path.join(blogDir, 'welcome.mdx'), samplePost);

    const blogUtils = `import { useState, useEffect } from 'react';

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    content?: string;
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'welcome',
        title: 'Welcome to My Blog',
        date: '${today}',
        excerpt: 'This is my first blog post using MDX. Learn how to customize and add more posts.',
        tags: ['welcome', 'intro', 'mdx']
    }
];

export function useBlogPosts() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setPosts(blogPosts);
        setLoading(false);
    }, []);

    return { posts, loading };
}

export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function getReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const words = content.split(/\\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return \`\${minutes} min read\`;
}
`;

    await writeFile(path.join(targetDir, 'src', 'lib', 'blog.ts'), blogUtils);
}

function generateSitemap(data: PortfolioData): string {
    const siteUrl = data.siteUrl?.replace(/\/$/, '') || 'https://example.com';
    const today = new Date().toISOString().split('T')[0];
    
    let urls = `
    <url>
        <loc>${siteUrl}/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${siteUrl}/#projects</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`;

    if (data.enableBlog) {
        urls += `
    <url>
        <loc>${siteUrl}/#blog</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>`;
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

function generateRobotsTxt(siteUrl: string): string {
    return `User-agent: *
Allow: /

Sitemap: ${siteUrl.replace(/\/$/, '')}/sitemap.xml
`;
}

function generateLicense(authorName: string): string {
    const year = new Date().getFullYear();
    return `MIT License

Copyright (c) ${year} ${authorName}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;
}

function generateContributing(projectName: string): string {
    return `# Contributing to ${projectName}

Thank you for your interest in contributing! 🎉

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### Suggesting Features

We love new ideas! Please create an issue with:
- A clear description of the feature
- Why it would be useful
- Any implementation ideas

### Pull Requests

1. Fork the repository
2. Create a branch: \`git checkout -b feature/amazing-feature\`
3. Make your changes
4. Test your changes
5. Commit: \`git commit -m 'Add amazing feature'\`
6. Push: \`git push origin feature/amazing-feature\`
7. Open a Pull Request

## Development Setup

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
\`\`\`

## Code Style

- Follow existing code formatting
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly

## Questions?

Feel free to open an issue for any questions!

---

Thank you for contributing! ❤️
`;
}

function generateReadme(projectName: string, data: PortfolioData): string {
    return `# ${data.name}'s Portfolio

> Built with [Portfolify](https://github.com/halloffame12/portfolify) ⚡

## 🚀 Quick Start

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

## 📦 Deployment

### Vercel
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Netlify
\`\`\`bash
npm install -g netlify-cli
netlify deploy
\`\`\`

### GitHub Pages
\`\`\`bash
npm run build
# Push the dist folder to gh-pages branch
\`\`\`

## 🎨 Customization

Edit \`src/config/portfolio.json\` to update your information.

## 📄 License

MIT

---

**Built with ❤️ using Portfolify**
`;
}

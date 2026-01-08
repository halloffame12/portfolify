import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { PortfolioData } from '../prompts/index.js';
import { getTheme } from '../themes/index.js';
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
        // In production (npm), templates are in ../templates relative to this file
        // In development, they are in ../../../template
        let templatePath = path.resolve(__dirname, '../../templates');

        // Fallback for local development if bundled templates don't exist
        if (!await fs.pathExists(templatePath)) {
            templatePath = path.resolve(__dirname, '../../../../template');
        }

        // Copy template files
        spinner.text = 'Copying template files...';
        await copyDirectory(templatePath, targetDir);

        // Generate portfolio config
        spinner.text = 'Creating configuration...';
        const config = {
            ...data,
            theme: getTheme(data.theme)
        };

        await writeFile(
            path.join(targetDir, 'src', 'config', 'portfolio.json'),
            JSON.stringify(config, null, 2)
        );

        // Update package.json with project name
        const packageJsonPath = path.join(targetDir, 'package.json');
        const packageJson = await fs.readJson(packageJsonPath);
        packageJson.name = projectName;
        await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

        // Generate custom CSS with theme colors
        spinner.text = 'Applying theme...';
        const theme = getTheme(data.theme);
        const customCSS = `
@layer base {
  :root {
    --primary: ${theme.colors.primary};
    --secondary: ${theme.colors.secondary};
    --accent: ${theme.colors.accent};
    --background: ${theme.colors.background};
    --foreground: ${theme.colors.foreground};
    --muted: ${theme.colors.muted};
  }
}
`;

        const globalCssPath = path.join(targetDir, 'src', 'styles', 'globals.css');
        let globalCss = await fs.readFile(globalCssPath, 'utf-8');
        globalCss = customCSS + '\n' + globalCss;
        await fs.writeFile(globalCssPath, globalCss);

        // Generate README
        spinner.text = 'Creating README...';
        const readme = generateReadme(projectName, data);
        await writeFile(path.join(targetDir, 'README.md'), readme);

        // Remove blog files if not enabled
        if (!data.enableBlog) {
            const blogPath = path.join(targetDir, 'src', 'components', 'Blog.tsx');
            if (await fs.pathExists(blogPath)) {
                await fs.remove(blogPath);
            }
        }

        spinner.succeed('Portfolio generated successfully!');
    } catch (error) {
        spinner.fail('Failed to generate portfolio');
        throw error;
    }
}

function generateReadme(projectName: string, data: PortfolioData): string {
    return `# ${data.name}'s Portfolio

> Built with [Portfolify](https://github.com/yourusername/portfolify) ⚡

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

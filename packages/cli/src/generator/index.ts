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
        // In production (npm), templates are in ../templates relative to this file (dist/generator/index.js)
        let templatePath = path.resolve(__dirname, '../../templates');

        const isDebug = process.env.DEBUG === 'true';

        if (isDebug) {
            logger.info(`Template source path: ${templatePath}`);
            logger.info(`Target destination: ${targetDir}`);
        }

        // Check if template path exists
        if (!await fs.pathExists(templatePath)) {
            // Fallback for different environments
            const fallbacks = [
                path.resolve(__dirname, '../../../template'), // Local dev
                path.resolve(__dirname, '../../../../packages/template'), // Monorepo
                path.resolve(__dirname, '../templates'), // Alternative bundle structure
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

        // Verify template folder is not empty
        const templateFiles = await fs.readdir(templatePath);
        if (templateFiles.length === 0) {
            throw new Error(`Template directory is empty: ${templatePath}`);
        }

        // Ensure target directory exists
        await fs.ensureDir(targetDir);

        // Copy template files
        spinner.text = 'Copying template files...';
        await copyDirectory(templatePath, targetDir);

        // Verify package.json was copied
        const packageCheckPath = path.join(targetDir, 'package.json');
        if (!await fs.pathExists(packageCheckPath)) {
            throw new Error(`Failed to copy template files.`);
        }

        // Generate portfolio config
        spinner.text = 'Creating configuration...';
        const config = {
            ...data,
            theme: data.theme
        };

        await writeFile(
            path.join(targetDir, 'src', 'config', 'portfolio.json'),
            JSON.stringify(config, null, 2)
        );

        // Update package.json with project name
        const targetPackageJsonPath = path.join(targetDir, 'package.json');
        const packageJson = await fs.readJson(targetPackageJsonPath);
        packageJson.name = projectName;
        await fs.writeJson(targetPackageJsonPath, packageJson, { spaces: 2 });

        // Generate custom CSS with theme colors - REMOVED AS WE USE STATIC DARK THEME
        // Generate README
        spinner.text = 'Creating README...';
        const readme = generateReadme(projectName, data);
        await writeFile(path.join(targetDir, 'README.md'), readme);

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

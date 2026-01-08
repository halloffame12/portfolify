import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';

export async function copyDirectory(src: string, dest: string): Promise<void> {
    await fs.copy(src, dest, {
        filter: (srcPath) => {
            const basename = path.basename(srcPath);
            // Skip node_modules and build artifacts at any level
            if (basename === 'node_modules' || basename === 'dist') {
                return false;
            }
            return true;
        }
    });
}

export async function writeFile(filePath: string, content: string): Promise<void> {
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, content, 'utf-8');
}

export async function processTemplate(templatePath: string, data: any): Promise<string> {
    const template = await fs.readFile(templatePath, 'utf-8');
    return ejs.render(template, data);
}

export async function fileExists(filePath: string): Promise<boolean> {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

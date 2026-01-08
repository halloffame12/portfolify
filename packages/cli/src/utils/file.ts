import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';

export async function copyDirectory(src: string, dest: string): Promise<void> {
    await fs.copy(src, dest, {
        filter: (src) => {
            // Skip node_modules and build artifacts
            return !src.includes('node_modules') && !src.includes('dist');
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

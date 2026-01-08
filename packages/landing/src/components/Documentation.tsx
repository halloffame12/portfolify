import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const tabs = [
    {
        id: 'getting-started',
        label: 'Getting Started',
        content: {
            title: 'Quick Start Guide',
            sections: [
                {
                    title: 'Installation',
                    content: `Run the following command in your terminal:

\`\`\`bash
npx @halloffame12/portfolify my-portfolio
\`\`\`

The CLI will guide you through the setup process with interactive prompts.`,
                },
                {
                    title: 'Requirements',
                    content: `- Node.js 16.x or higher
- npm or yarn
- A terminal/command prompt`,
                },
                {
                    title: 'First Steps',
                    content: `After generation:

\`\`\`bash
cd my-portfolio
npm run dev
\`\`\`

Your portfolio will be available at http://localhost:5173`,
                },
            ],
        },
    },
    {
        id: 'configuration',
        label: 'Configuration',
        content: {
            title: 'Customizing Your Portfolio',
            sections: [
                {
                    title: 'Portfolio Config',
                    content: `Edit \`src/config/portfolio.json\` to update your information:

\`\`\`json
{
  "name": "Your Name",
  "role": "Your Role",
  "bio": "Your bio",
  "skills": ["React", "Node.js"],
  "projects": [...]
}
\`\`\``,
                },
                {
                    title: 'Adding Content',
                    content: `Add your projects, skills, and blog posts by editing the configuration file. All changes are hot-reloaded during development.`,
                },
            ],
        },
    },
    {
        id: 'deployment',
        label: 'Deployment',
        content: {
            title: 'Deploy Your Portfolio',
            sections: [
                {
                    title: 'Vercel',
                    content: `\`\`\`bash
npm install -g vercel
vercel
\`\`\`

Follow the prompts to deploy to Vercel.`,
                },
                {
                    title: 'Netlify',
                    content: `\`\`\`bash
npm install -g netlify-cli
netlify deploy
\`\`\`

Or drag and drop the \`dist\` folder to Netlify's web interface.`,
                },
                {
                    title: 'GitHub Pages',
                    content: `Build your portfolio:

\`\`\`bash
npm run build
\`\`\`

Then push the \`dist\` folder to your \`gh-pages\` branch.`,
                },
            ],
        },
    },
    {
        id: 'customization',
        label: 'Customization',
        content: {
            title: 'Advanced Customization',
            sections: [
                {
                    title: 'Adding Components',
                    content: `Create new components in \`src/components/\` and import them in \`App.tsx\`. Use Framer Motion for animations.`,
                },
                {
                    title: 'Styling',
                    content: `Portfolify uses Tailwind CSS. Add custom styles in \`globals.css\` or use Tailwind utility classes directly.`,
                },
                {
                    title: 'Blog Posts',
                    content: `Add MDX files to \`src/content/blog/\` to create blog posts. They'll automatically appear in your blog section.`,
                },
            ],
        },
    },
];

export default function Documentation() {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    const activeContent = tabs.find(tab => tab.id === activeTab)?.content;

    return (
        <section id="documentation" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">Documentation</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Everything you need to know to get started
                    </p>
                </motion.div>

                <div className="glass rounded-2xl overflow-hidden border border-border/50">
                    {/* Tabs */}
                    <div className="flex flex-wrap border-b border-border/50 bg-muted/30">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    'px-6 py-4 font-medium transition-all relative',
                                    activeTab === tab.id
                                        ? 'text-primary'
                                        : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {activeContent && (
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="text-2xl font-bold mb-6 gradient-text">
                                    {activeContent.title}
                                </h3>
                                <div className="space-y-6">
                                    {activeContent.sections.map((section, index) => (
                                        <div key={index}>
                                            <h4 className="text-lg font-semibold mb-2">
                                                {section.title}
                                            </h4>
                                            <div className="text-muted-foreground whitespace-pre-wrap">
                                                {section.content}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

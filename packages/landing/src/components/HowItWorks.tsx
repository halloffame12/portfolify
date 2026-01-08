import { motion } from 'framer-motion';
import { Terminal, MessageSquare, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
    {
        icon: Terminal,
        number: '01',
        title: 'Run the Command',
        description: 'Open your terminal and run npx @halloffame12/portfolify my-portfolio',
        code: 'npx @halloffame12/portfolify my-portfolio',
    },
    {
        icon: MessageSquare,
        number: '02',
        title: 'Answer Prompts',
        description: 'Fill in your name, role, skills, projects, and social links',
        code: '? What is your name: John Doe\n? What is your role: Full Stack Developer',
    },
    {
        icon: Rocket,
        number: '03',
        title: 'Deploy & Share',
        description: 'Your portfolio is ready! Deploy to Vercel, Netlify, or GitHub Pages',
        code: 'npm run dev\n# Your portfolio is live! 🎉',
    },
];

export default function HowItWorks() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        How It <span className="gradient-text">Works</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Three simple steps to your dream portfolio
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="grid md:grid-cols-2 gap-8 items-center"
                        >
                            <div className={cn(
                                'order-2',
                                index % 2 === 1 && 'md:order-1'
                            )}>
                                <div className="glass rounded-xl p-6 border border-border/50">
                                    <pre className="text-sm font-mono text-primary overflow-x-auto">
                                        <code>{step.code}</code>
                                    </pre>
                                </div>
                            </div>

                            <div className={cn(
                                'order-1',
                                index % 2 === 1 && 'md:order-2'
                            )}>
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                                        <step.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-mono text-muted-foreground mb-2">
                                            STEP {step.number}
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                                        <p className="text-muted-foreground text-lg">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

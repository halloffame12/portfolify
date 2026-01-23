import { motion } from 'framer-motion';
import { Code, Palette, Scissors, Camera, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const examples = [
    {
        name: 'Developer Portfolio',
        theme: 'developer',
        icon: Code,
        description: 'Clean, code-inspired design with terminal aesthetics',
        command: 'npx portfolify dev --theme developer',
        color: 'from-emerald-500 to-cyan-500',
    },
    {
        name: 'Designer Portfolio',
        theme: 'designer',
        icon: Palette,
        description: 'Bold gradients with creative, asymmetric layouts',
        command: 'npx portfolify design --theme designer',
        color: 'from-pink-500 to-violet-500',
    },
    {
        name: 'Salon & Spa',
        theme: 'salon',
        icon: Scissors,
        description: 'Elegant typography for beauty & wellness',
        command: 'npx portfolify spa --theme salon',
        color: 'from-rose-400 to-amber-400',
    },
    {
        name: 'Photographer',
        theme: 'photographer',
        icon: Camera,
        description: 'Gallery-focused, minimal, image-first design',
        command: 'npx portfolify photo --theme photographer',
        color: 'from-gray-600 to-gray-400',
    },
    {
        name: 'Startup Landing',
        theme: 'startup',
        icon: Rocket,
        description: 'Modern SaaS style for founders & entrepreneurs',
        command: 'npx portfolify launch --theme startup',
        color: 'from-blue-500 to-indigo-500',
    },
];

export default function Examples() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    return (
        <section id="examples" className="py-20 px-4 bg-muted/30">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Theme <span className="gradient-text">Examples</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Pick a theme and start building in seconds
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {examples.map((example, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className={cn(
                                'glass rounded-xl overflow-hidden hover:glow-effect transition-all duration-300',
                                'border border-border/50 hover:border-primary/50 group'
                            )}
                        >
                            <div className={cn(
                                'h-32 bg-gradient-to-br flex items-center justify-center',
                                example.color
                            )}>
                                <example.icon className="w-16 h-16 text-white/90" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{example.name}</h3>
                                <p className="text-muted-foreground text-sm mb-4">{example.description}</p>
                                <div className="glass rounded-lg p-3 border border-border/30">
                                    <code className="text-xs font-mono text-primary">{example.command}</code>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

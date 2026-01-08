import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const examples = [
    {
        name: 'Modern Dark',
        theme: 'modern-dark',
        image: 'https://via.placeholder.com/600x400/1e293b/60a5fa?text=Modern+Dark+Theme',
        url: '#',
    },
    {
        name: 'Gradient Purple',
        theme: 'gradient-purple',
        image: 'https://via.placeholder.com/600x400/1e1b4b/a78bfa?text=Gradient+Purple+Theme',
        url: '#',
    },
    {
        name: 'Ocean Blue',
        theme: 'ocean-blue',
        image: 'https://via.placeholder.com/600x400/0c4a6e/06b6d4?text=Ocean+Blue+Theme',
        url: '#',
    },
    {
        name: 'Sunset Orange',
        theme: 'sunset-orange',
        image: 'https://via.placeholder.com/600x400/431407/fb923c?text=Sunset+Orange+Theme',
        url: '#',
    },
    {
        name: 'Minimal Light',
        theme: 'minimal-light',
        image: 'https://via.placeholder.com/600x400/f8fafc/6366f1?text=Minimal+Light+Theme',
        url: '#',
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
                        Example <span className="gradient-text">Portfolios</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        See what you can build with Portfolify
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {examples.map((example, index) => (
                        <motion.a
                            key={index}
                            href={example.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={cardVariants}
                            whileHover={{ scale: 1.03, y: -5 }}
                            className={cn(
                                'glass rounded-xl overflow-hidden hover:glow-effect transition-all duration-300',
                                'border border-border/50 hover:border-primary/50 group'
                            )}
                        >
                            <div className="aspect-video bg-muted relative overflow-hidden">
                                <img
                                    src={example.image}
                                    alt={example.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                        <ExternalLink className="w-4 h-4" />
                                        View Demo
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold gradient-text mb-2">
                                    {example.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Theme: {example.theme}
                                </p>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

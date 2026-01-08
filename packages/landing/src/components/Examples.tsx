import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const examples = [
    {
        name: 'Modern Developer Portfolio',
        image: 'https://i.postimg.cc/D0q65Fxf/image.png',
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
                        Example <span className="gradient-text">Portfolio</span>
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
                    className="flex justify-center"
                >
                    {examples.map((example, index) => (
                        <motion.a
                            key={index}
                            href={example.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={cardVariants}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className={cn(
                                'glass rounded-xl overflow-hidden hover:glow-effect transition-all duration-300',
                                'border border-border/50 hover:border-primary/50 group max-w-4xl w-full'
                            )}
                        >
                            <div className="aspect-video bg-muted relative overflow-hidden">
                                <img
                                    src={example.image}
                                    alt={example.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                        <ExternalLink className="w-4 h-4" />
                                        View Demo
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 text-center">
                                <h3 className="text-2xl font-bold gradient-text">
                                    {example.name}
                                </h3>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

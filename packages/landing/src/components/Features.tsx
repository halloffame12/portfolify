import { motion } from 'framer-motion';
import {
    Zap,
    Palette,
    Smartphone,
    Search,
    FileText,
    Github,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
    {
        icon: Zap,
        title: 'One Command Setup',
        description: 'Get your portfolio up and running in less than a minute with a single command.',
    },
    {
        icon: Palette,
        title: 'Modern Dark Theme',
        description: 'A carefully crafted dark theme that looks professional, modern, and high-end.',
    },
    {
        icon: Smartphone,
        title: 'Fully Responsive',
        description: 'Perfect on mobile, tablet, and desktop. Your portfolio looks great everywhere.',
    },
    {
        icon: Search,
        title: 'SEO Ready',
        description: 'Built-in meta tags, Open Graph, and structured data for better discoverability.',
    },
    {
        icon: FileText,
        title: 'Blog Support',
        description: 'Optional MDX-powered blog to share your thoughts and tutorials.',
    },
    {
        icon: Github,
        title: '100% Open Source',
        description: 'Free forever. Contribute, customize, and make it your own.',
    },
];

export default function Features() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    return (
        <section className="py-20 px-4 bg-muted/30">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Everything You <span className="gradient-text">Need</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Portfolify comes packed with features to make your portfolio stand out
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className={cn(
                                'glass rounded-xl p-6 hover:glow-effect transition-all duration-300',
                                'border border-border/50 hover:border-primary/50'
                            )}
                        >
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

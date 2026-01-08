import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample blog posts - in a real app, these would come from MDX files
const blogPosts = [
    {
        title: 'Getting Started with React and TypeScript',
        excerpt: 'Learn how to set up a modern React project with TypeScript and best practices.',
        date: '2024-01-15',
        readTime: '5 min read',
        slug: 'react-typescript-guide',
    },
    {
        title: 'Building Performant Web Applications',
        excerpt: 'Tips and tricks for optimizing your web applications for better performance.',
        date: '2024-01-10',
        readTime: '8 min read',
        slug: 'performant-web-apps',
    },
    {
        title: 'Modern CSS Techniques',
        excerpt: 'Explore the latest CSS features and how to use them in your projects.',
        date: '2024-01-05',
        readTime: '6 min read',
        slug: 'modern-css-techniques',
    },
];

export default function Blog() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
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
                        Latest <span className="gradient-text">Blog Posts</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Thoughts, tutorials, and insights
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={index}
                            variants={cardVariants}
                            whileHover={{ scale: 1.03, y: -5 }}
                            className={cn(
                                'glass rounded-xl p-6 hover:glow-effect transition-all duration-300',
                                'border border-border/50 hover:border-primary/50 cursor-pointer'
                            )}
                        >
                            <h3 className="text-xl font-bold mb-3 gradient-text">
                                {post.title}
                            </h3>

                            <p className="text-muted-foreground mb-4 line-clamp-2">
                                {post.excerpt}
                            </p>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(post.date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {post.readTime}
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-border/50">
                                <span className="text-primary font-medium hover:underline">
                                    Read more →
                                </span>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

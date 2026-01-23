import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroProps {
    data: {
        name: string;
        role: string;
        bio: string;
        social: {
            github?: string;
            linkedin?: string;
            twitter?: string;
            email?: string;
        };
    };
}

export default function Hero({ data }: HeroProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    const normalizeLink = (url: string, baseUrl: string) => {
        if (!url) return '';
        if (url.startsWith('http') || url.startsWith('mailto:')) return url;
        return `${baseUrl}/${url.replace(/^@/, '')}`;
    };

    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 opacity-30 animate-pulse" />

            {/* Floating orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

            <motion.div
                className="max-w-4xl mx-auto text-center relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants}>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
                        Hi, I'm{' '}
                        <span className="gradient-text animate-glow">
                            {data.name}
                        </span>
                    </h1>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <h2 className="text-2xl md:text-4xl font-semibold text-muted-foreground mb-8">
                        {data.role}
                    </h2>
                </motion.div>

                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    {data.bio}
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap gap-4 justify-center mb-12"
                >
                    {data.social.github && (
                        <a
                            href={normalizeLink(data.social.github, 'https://github.com')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                'px-6 py-3 rounded-lg glass hover:glow-effect transition-all duration-300',
                                'flex items-center gap-2 hover:scale-105 active:scale-95'
                            )}
                        >
                            <Github className="w-5 h-5" />
                            GitHub
                        </a>
                    )}

                    {data.social.linkedin && (
                        <a
                            href={normalizeLink(data.social.linkedin, 'https://linkedin.com/in')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                'px-6 py-3 rounded-lg glass hover:glow-effect transition-all duration-300',
                                'flex items-center gap-2 hover:scale-105 active:scale-95'
                            )}
                        >
                            <Linkedin className="w-5 h-5" />
                            LinkedIn
                        </a>
                    )}

                    {data.social.twitter && (
                        <a
                            href={normalizeLink(data.social.twitter, 'https://twitter.com')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                'px-6 py-3 rounded-lg glass hover:glow-effect transition-all duration-300',
                                'flex items-center gap-2 hover:scale-105 active:scale-95'
                            )}
                        >
                            <Twitter className="w-5 h-5" />
                            Twitter
                        </a>
                    )}

                    {data.social.email && (
                        <a
                            href={data.social.email.startsWith('mailto:') ? data.social.email : `mailto:${data.social.email}`}
                            className={cn(
                                'px-6 py-3 rounded-lg glass hover:glow-effect transition-all duration-300',
                                'flex items-center gap-2 hover:scale-105 active:scale-95'
                            )}
                        >
                            <Mail className="w-5 h-5" />
                            Email
                        </a>
                    )}

                    <button
                        className={cn(
                            'px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary hover:glow-effect transition-all duration-300',
                            'flex items-center gap-2 hover:scale-105 active:scale-95 font-semibold'
                        )}
                    >
                        <Download className="w-5 h-5" />
                        Resume
                    </button>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="flex justify-center"
                >
                    <a
                        href="#projects"
                        title="Scroll to projects"
                        aria-label="Scroll to projects section"
                        className="text-muted-foreground hover:text-foreground transition-colors animate-bounce"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}

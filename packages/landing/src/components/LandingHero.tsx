import { motion } from 'framer-motion';
import { Copy, Check, Github, Star } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function LandingHero() {
    const [copied, setCopied] = useState(false);
    const command = 'npx @halloffame12/portfolify my-portfolio';

    const copyCommand = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 opacity-30" />
            <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

            <div className="max-w-5xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* GitHub Badge */}
                    <a
                        href="https://github.com/yourusername/portfolify"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 hover:glow-effect transition-all"
                    >
                        <Github className="w-4 h-4" />
                        <span className="text-sm">Star us on GitHub</span>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </a>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
                        Build Your Portfolio
                        <br />
                        <span className="gradient-text">in Seconds</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
                        Free, open-source portfolio generator for developers.
                        <br />
                        One command. Beautiful results. No coding required.
                    </p>

                    {/* Command Box */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="max-w-2xl mx-auto mb-12"
                    >
                        <div className={cn(
                            'glass rounded-2xl p-6 border-2',
                            'hover:glow-effect transition-all duration-300'
                        )}>
                            <div className="flex items-center justify-between gap-4">
                                <code className="text-lg md:text-xl font-mono text-primary flex-1 text-left">
                                    {command}
                                </code>
                                <button
                                    onClick={copyCommand}
                                    className={cn(
                                        'p-3 rounded-lg transition-all duration-300',
                                        copied
                                            ? 'bg-green-500/20 text-green-400'
                                            : 'bg-primary/20 text-primary hover:bg-primary/30'
                                    )}
                                    aria-label="Copy command"
                                >
                                    {copied ? (
                                        <Check className="w-5 h-5" />
                                    ) : (
                                        <Copy className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        <a
                            href="#documentation"
                            className={cn(
                                'px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary',
                                'font-semibold text-lg hover:scale-105 transition-transform'
                            )}
                        >
                            Get Started
                        </a>
                        <a
                            href="#examples"
                            className={cn(
                                'px-8 py-4 rounded-xl glass',
                                'font-semibold text-lg hover:glow-effect hover:scale-105 transition-all'
                            )}
                        >
                            View Examples
                        </a>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="mt-16 flex flex-wrap justify-center gap-8 text-muted-foreground"
                    >
                        <div className="text-center">
                            <div className="text-3xl font-bold gradient-text">100%</div>
                            <div className="text-sm">Free & Open Source</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold gradient-text">5+</div>
                            <div className="text-sm">Premium Themes</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold gradient-text">&lt;60s</div>
                            <div className="text-sm">Setup Time</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

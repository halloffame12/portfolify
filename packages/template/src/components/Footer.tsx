import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterProps {
    social: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        email?: string;
    };
    name: string;
}

export default function Footer({ social, name }: FooterProps) {
    const currentYear = new Date().getFullYear();

    const normalizeLink = (url: string, baseUrl: string) => {
        if (!url) return '';
        if (url.startsWith('http') || url.startsWith('mailto:')) return url;
        return `${baseUrl}/${url.replace(/^@/, '')}`;
    };

    return (
        <footer className="py-12 px-4 border-t border-border/50 bg-muted/20">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col items-center gap-6">
                    {/* Social Links */}
                    <div className="flex gap-4">
                        {social.github && (
                            <a
                                href={normalizeLink(social.github, 'https://github.com')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    'p-3 rounded-full glass hover:glow-effect transition-all duration-300',
                                    'hover:scale-110 active:scale-95'
                                )}
                                aria-label="GitHub"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                        )}

                        {social.linkedin && (
                            <a
                                href={normalizeLink(social.linkedin, 'https://linkedin.com/in')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    'p-3 rounded-full glass hover:glow-effect transition-all duration-300',
                                    'hover:scale-110 active:scale-95'
                                )}
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        )}

                        {social.twitter && (
                            <a
                                href={normalizeLink(social.twitter, 'https://twitter.com')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    'p-3 rounded-full glass hover:glow-effect transition-all duration-300',
                                    'hover:scale-110 active:scale-95'
                                )}
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                        )}

                        {social.email && (
                            <a
                                href={social.email.startsWith('mailto:') ? social.email : `mailto:${social.email}`}
                                className={cn(
                                    'p-3 rounded-full glass hover:glow-effect transition-all duration-300',
                                    'hover:scale-110 active:scale-95'
                                )}
                                aria-label="Email"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        )}
                    </div>

                    {/* Built with Portfolify Badge */}
                    <a
                        href="https://github.com/halloffame12/portfolify"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            'px-4 py-2 rounded-full glass hover:glow-effect transition-all duration-300',
                            'flex items-center gap-2 text-sm hover:scale-105'
                        )}
                    >
                        Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using{' '}
                        <span className="gradient-text font-semibold">Portfolify</span>
                    </a>

                    {/* Copyright */}
                    <p className="text-muted-foreground text-sm">
                        © {currentYear} {name}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

import { Github, Linkedin, Twitter, Mail, Heart, Instagram, Youtube, Phone, Music, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterProps {
    social: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        email?: string;
        instagram?: string;
        behance?: string;
        dribbble?: string;
        youtube?: string;
        tiktok?: string;
        phone?: string;
    };
    name: string;
}

export default function Footer({ social, name }: FooterProps) {
    const currentYear = new Date().getFullYear();

    const normalizeLink = (url: string, baseUrl: string) => {
        if (!url) return '';
        if (url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('tel:')) return url;
        return `${baseUrl}/${url.replace(/^@/, '')}`;
    };

    return (
        <footer className="py-12 px-4 border-t border-border/50 bg-muted/20">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col items-center gap-6">
                    {/* Social Links */}
                    <div className="flex flex-wrap justify-center gap-4">
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

                        {social.instagram && (
                            <a
                                href={normalizeLink(social.instagram, 'https://instagram.com')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    'p-3 rounded-full glass hover:glow-effect transition-all duration-300',
                                    'hover:scale-110 active:scale-95'
                                )}
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        )}

                        {social.youtube && (
                            <a
                                href={normalizeLink(social.youtube, 'https://youtube.com')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    'p-3 rounded-full glass hover:glow-effect transition-all duration-300',
                                    'hover:scale-110 active:scale-95'
                                )}
                                aria-label="YouTube"
                            >
                                <Youtube className="w-5 h-5" />
                            </a>
                        )}

                        {social.behance && (
                            <a
                                href={normalizeLink(social.behance, 'https://behance.net')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    'p-3 rounded-full glass hover:glow-effect transition-all duration-300',
                                    'hover:scale-110 active:scale-95'
                                )}
                                aria-label="Behance"
                            >
                                <Palette className="w-5 h-5" />
                            </a>
                        )}

                        {social.dribbble && (
                            <a
                                href={normalizeLink(social.dribbble, 'https://dribbble.com')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    'p-3 rounded-full glass hover:glow-effect transition-all duration-300',
                                    'hover:scale-110 active:scale-95'
                                )}
                                aria-label="Dribbble"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm7.938 5.5a10.27 10.27 0 012.312 6.375c-3.375-.688-6.375-.688-9-.375.375-.75.375-.75.75-1.5C15.875 9.125 18.5 7.625 19.938 5.5zM12 1.75c2.688 0 5.125 1.063 6.938 2.75-1.313 1.875-3.688 3.375-5.313 4.125-1.687-3-3.562-5.438-4.125-6.188A10.2 10.2 0 0112 1.75zm-4.063.938c.563.75 2.438 3.188 4.125 6.063-4.312 1.125-8.063 1.125-9 1.125.687-3.25 2.625-6 4.875-7.188zM1.75 12v-.375c1.125.063 5.625 0 10.313-1.313.313.563.563 1.125.875 1.688-4.688 1.313-7.875 4.5-9.375 6.563A10.196 10.196 0 011.75 12zm10.25 10.25c-2.438 0-4.687-.813-6.5-2.188 1.313-1.875 4.125-4.813 8.438-6.188 1.125 3 2.063 6.375 2.438 8.063a10.3 10.3 0 01-4.376.313zm6.063-1.688c-.375-1.563-1.188-4.688-2.25-7.5 2.438-.313 5.063 0 8.063.563-.563 3-2.625 5.625-5.813 6.937z"/>
                                </svg>
                            </a>
                        )}

                        {social.tiktok && (
                            <a
                                href={normalizeLink(social.tiktok, 'https://tiktok.com/@')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    'p-3 rounded-full glass hover:glow-effect transition-all duration-300',
                                    'hover:scale-110 active:scale-95'
                                )}
                                aria-label="TikTok"
                            >
                                <Music className="w-5 h-5" />
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

                        {social.phone && (
                            <a
                                href={social.phone.startsWith('tel:') ? social.phone : `tel:${social.phone}`}
                                className={cn(
                                    'p-3 rounded-full glass hover:glow-effect transition-all duration-300',
                                    'hover:scale-110 active:scale-95'
                                )}
                                aria-label="Phone"
                            >
                                <Phone className="w-5 h-5" />
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

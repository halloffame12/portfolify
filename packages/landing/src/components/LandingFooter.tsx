import { Github, Linkedin, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LandingFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 px-4 border-t border-border/50 bg-muted/20">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col items-center gap-8">
                    {/* Logo/Brand */}
                    <div className="text-center">
                        <h3 className="text-2xl font-bold gradient-text mb-2">
                            Portfolify
                        </h3>
                        <p className="text-muted-foreground">
                            Build your developer portfolio in seconds
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-8 justify-center text-sm">
                        <a
                            href="#documentation"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Documentation
                        </a>
                        <a
                            href="#examples"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Examples
                        </a>
                        <a
                            href="https://github.com/yourusername/portfolify"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://github.com/yourusername/portfolify/blob/main/CONTRIBUTING.md"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Contributing
                        </a>
                    </div>

                    {/* Social */}
                    <div className="flex gap-4">
                        <a
                            href="https://github.com/yourusername/portfolify"
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
                        <a
                            href="https://www.linkedin.com/in/sumit-chauhan-a4ba98325/"
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
                    </div>

                    {/* Made with love */}
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by the community
                    </div>

                    {/* Copyright */}
                    <p className="text-muted-foreground text-sm">
                        © {currentYear} Portfolify. Open source under MIT License.
                    </p>
                </div>
            </div>
        </footer>
    );
}

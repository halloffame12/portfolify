import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
    theme: 'dark' | 'light';
    toggleTheme: () => void;
}

export default function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
    return (
        <button
            onClick={toggleTheme}
            className={cn(
                'fixed top-6 right-6 z-50 p-3 rounded-full glass hover:glow-effect transition-all duration-300',
                'hover:scale-110 active:scale-95'
            )}
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
                <Moon className="w-5 h-5 text-blue-600" />
            )}
        </button>
    );
}

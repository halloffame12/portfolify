import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

export default function ThemeToggle({ isDarkMode, toggleTheme }: ThemeToggleProps) {
    return (
        <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            onClick={toggleTheme}
            className={cn(
                'fixed top-6 right-6 z-50',
                'p-3 rounded-full glass',
                'hover:glow-effect transition-all duration-300',
                'hover:scale-110 active:scale-95',
                'border border-border/50 hover:border-primary/50'
            )}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <motion.div
                initial={false}
                animate={{ rotate: isDarkMode ? 0 : 180 }}
                transition={{ duration: 0.3 }}
            >
                {isDarkMode ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                    <Moon className="w-5 h-5 text-primary" />
                )}
            </motion.div>
        </motion.button>
    );
}

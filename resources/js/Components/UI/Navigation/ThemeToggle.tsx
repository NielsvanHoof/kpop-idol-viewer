import { motion } from 'framer-motion';
import { MoonIcon, SunIcon } from 'lucide-react';

interface ThemeToggleProps {
    theme: string;
    toggleTheme: () => void;
}

export default function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            aria-label="Toggle Theme"
        >
            <motion.span
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
            >
                {theme === 'light' ? (
                    <MoonIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                    <SunIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
            </motion.span>
        </motion.button>
    );
}

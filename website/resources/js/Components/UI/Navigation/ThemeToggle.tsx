import { Button } from '@headlessui/react';
import { motion, Variants } from 'framer-motion';
import { MoonIcon, SunIcon } from 'lucide-react';

interface ThemeToggleProps {
    theme: string;
    toggleTheme: () => void;
}

const buttonVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    hover: {
        scale: 1.05,
        transition: {
            duration: 0.2,
            ease: 'easeInOut',
        },
    },
    tap: {
        scale: 0.95,
        transition: {
            duration: 0.1,
            ease: 'easeInOut',
        },
    },
};

const iconVariants: Variants = {
    initial: { rotate: -180, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    exit: { rotate: 180, opacity: 0 },
};

export default function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
        >
            <Button
                onClick={toggleTheme}
                className="group relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/80 shadow-sm backdrop-blur-xl transition-all duration-300 hover:bg-white/90 hover:shadow-md dark:bg-gray-800/80 dark:hover:bg-gray-800/90"
                aria-label="Toggle theme"
            >
                <motion.div
                    key={theme}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={iconVariants}
                    transition={{ duration: 0.3 }}
                >
                    {theme === 'light' ? (
                        <MoonIcon className="h-5 w-5 text-gray-600 transition-colors group-hover:text-purple-600 dark:text-gray-400 dark:group-hover:text-purple-400" />
                    ) : (
                        <SunIcon className="h-5 w-5 text-gray-600 transition-colors group-hover:text-purple-600 dark:text-gray-400 dark:group-hover:text-purple-400" />
                    )}
                </motion.div>
            </Button>
        </motion.div>
    );
}

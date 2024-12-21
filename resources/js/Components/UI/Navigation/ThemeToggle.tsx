import { Button } from '@headlessui/react';
import { MoonIcon, SunIcon } from 'lucide-react';

interface ThemeToggleProps {
    theme: string;
    toggleTheme: () => void;
}

export default function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
    return (
        <Button
            onClick={toggleTheme}
            className="group rounded-full p-2 transition-colors hover:bg-purple-50 dark:hover:bg-purple-900/30"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <MoonIcon className="h-5 w-5 text-gray-600 group-hover:text-purple-600 dark:text-gray-400" />
            ) : (
                <SunIcon className="h-5 w-5 text-gray-600 group-hover:text-purple-600 dark:text-gray-400" />
            )}
        </Button>
    );
}

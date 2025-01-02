import { motion, Variants } from 'framer-motion';
import {
    CalendarIcon,
    NewspaperIcon,
    ShoppingBagIcon,
    SparklesIcon,
    UsersIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import AuthLinks from './Navigation/AuthLinks';
import Logo from './Navigation/Logo';
import MobileMenu from './Navigation/MobileMenu';
import { NavLink } from './Navigation/NavLink';
import ThemeToggle from './Navigation/ThemeToggle';

const navigationLinks = [
    {
        name: 'Groups',
        href: route('groups.index'),
        icon: <UsersIcon className="h-5 w-5" />,
    },
    {
        name: 'Idols',
        href: route('idols.index'),
        icon: <SparklesIcon className="h-5 w-5" />,
    },
    {
        name: 'Events',
        href: '/events',
        icon: <CalendarIcon className="h-5 w-5" />,
    },
    {
        name: 'News',
        href: route('articles.index'),
        icon: <NewspaperIcon className="h-5 w-5" />,
    },
    {
        name: 'Shop',
        href: '/shop',
        icon: <ShoppingBagIcon className="h-5 w-5" />,
    },
    {
        name: 'Community',
        href: '/community',
        icon: <UsersIcon className="h-5 w-5" />,
    },
];

const containerVariants: Variants = {
    hidden: { y: -100 },
    visible: {
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 20,
        },
    },
};

export default function Navigation() {
    const [theme, setTheme] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            return (
                localStorage.getItem('theme') ||
                (window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light')
            );
        }
        return 'light';
    });

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <motion.header
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className={`sticky top-0 z-50 bg-white/95 shadow-lg backdrop-blur-xl transition-all duration-500 dark:bg-gray-900/95`}
        >
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between lg:h-20">
                    <div className="flex items-center gap-8">
                        <Logo />
                        <div className="hidden md:flex md:items-center md:space-x-1">
                            {navigationLinks.map((link) => (
                                <NavLink key={link.name} {...link} />
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                        <div className="hidden sm:block">
                            <AuthLinks />
                        </div>
                        <MobileMenu navigationLinks={navigationLinks} />
                    </div>
                </div>
            </nav>
        </motion.header>
    );
}

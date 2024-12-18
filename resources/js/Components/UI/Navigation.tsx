import { motion } from 'framer-motion';
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
        href: route('welcome'),
        icon: <CalendarIcon className="h-5 w-5" />,
    },
    {
        name: 'News',
        href: route('articles.index'),
        icon: <NewspaperIcon className="h-5 w-5" />,
    },
    {
        name: 'Shop',
        href: route('welcome'),
        icon: <ShoppingBagIcon className="h-5 w-5" />,
    },
];

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
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`sticky top-0 z-50 transition-all duration-500 ${
                isScrolled
                    ? 'bg-white/80 shadow-lg backdrop-blur-md dark:bg-gray-800/80'
                    : 'bg-transparent'
            }`}
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

import useDarkMode from '@/Hooks/useDarkMode';
import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Switch,
} from '@headlessui/react';
import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.1,
            when: 'beforeChildren',
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
};

export default function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const { url } = usePage();

    return (
        <nav className="fixed left-0 top-0 z-50 w-full bg-gray-900 text-gray-200 shadow-lg transition-colors duration-500 dark:bg-gray-100 dark:text-gray-800">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                {/* Logo and Brand Name */}
                <div className="flex items-center space-x-2">
                    <Link href={route('welcome')}>
                        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 bg-clip-text text-2xl font-extrabold tracking-wide text-transparent">
                            KPop Universe
                        </span>
                    </Link>
                </div>

                {/* Dark Mode Toggle */}
                <Switch
                    checked={isDarkMode}
                    onChange={toggleDarkMode}
                    className="hidden items-center rounded-full p-2 shadow-lg transition md:flex"
                >
                    <span className="sr-only">Toggle Dark Mode</span>
                    {isDarkMode ? (
                        <MoonIcon className="h-5 w-5 text-yellow-400" />
                    ) : (
                        <SunIcon className="h-5 w-5 text-blue-500" />
                    )}
                </Switch>

                {/* Desktop Navigation Links */}
                <ul className="hidden space-x-6 md:flex">
                    <li>
                        <Link
                            href={route('welcome')}
                            className={`transition hover:text-pink-500 ${
                                url === '/' ? 'text-pink-500' : ''
                            }`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route('idols.index')}
                            prefetch
                            className={`transition hover:text-pink-500 ${
                                url === '/idols' ? 'text-pink-500' : ''
                            }`}
                        >
                            Idols
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route('groups.index')}
                            prefetch
                            className={`transition hover:text-pink-500 ${
                                url === '/groups' ? 'text-pink-500' : ''
                            }`}
                        >
                            Groups
                        </Link>
                    </li>
                    {/* Dropdown */}
                    <li>
                        <Popover className="relative">
                            <PopoverButton className="transition hover:text-pink-500 focus:outline-none">
                                More
                            </PopoverButton>
                            <PopoverPanel className="absolute z-10 mt-2 w-48 rounded-lg bg-gray-800 text-gray-300 shadow-lg dark:bg-gray-200 dark:text-gray-800">
                                <motion.div
                                    className="flex flex-col"
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={dropdownVariants}
                                >
                                    {[
                                        'Analytics',
                                        'Engagement',
                                        'Security',
                                        'Integrations',
                                    ].map((item, index) => (
                                        <motion.a
                                            key={index}
                                            href={`/${item.toLowerCase()}`}
                                            className={`px-4 py-2 ${
                                                index === 0
                                                    ? 'rounded-t-lg'
                                                    : ''
                                            } ${
                                                index === 3
                                                    ? 'rounded-b-lg'
                                                    : ''
                                            } hover:bg-gray-700 hover:text-pink-500 dark:hover:bg-gray-300`}
                                            variants={itemVariants}
                                        >
                                            {item}
                                        </motion.a>
                                    ))}
                                </motion.div>
                            </PopoverPanel>
                        </Popover>
                    </li>
                </ul>

                {/* Mobile Hamburger Menu */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-gray-200 md:hidden dark:text-gray-800"
                >
                    {isMobileMenuOpen ? (
                        <XMarkIcon className="h-6 w-6" />
                    ) : (
                        <Bars3Icon className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="bg-gray-900 text-gray-300 shadow-lg md:hidden dark:bg-gray-100 dark:text-gray-800"
                >
                    <ul className="space-y-4 px-6 py-4">
                        {['Home', 'Idols', 'Events', 'Contact'].map(
                            (item, index) => (
                                <li key={index}>
                                    <Link
                                        href={
                                            item === 'Home'
                                                ? route('welcome')
                                                : `#${item.toLowerCase()}`
                                        }
                                        className="block transition hover:text-pink-500"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ),
                        )}
                        {/* Dropdown */}
                        <li>
                            <Popover>
                                <PopoverButton className="block w-full text-left transition hover:text-pink-500 focus:outline-none">
                                    More
                                </PopoverButton>
                                <PopoverPanel className="mt-2 rounded-lg bg-gray-800 text-gray-300 shadow-lg dark:bg-gray-200 dark:text-gray-800">
                                    <motion.div
                                        className="flex flex-col"
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        variants={dropdownVariants}
                                    >
                                        {[
                                            'Analytics',
                                            'Engagement',
                                            'Security',
                                            'Integrations',
                                        ].map((item, index) => (
                                            <motion.a
                                                key={index}
                                                href={`/${item.toLowerCase()}`}
                                                className={`px-4 py-2 ${
                                                    index === 0
                                                        ? 'rounded-t-lg'
                                                        : ''
                                                } ${
                                                    index === 3
                                                        ? 'rounded-b-lg'
                                                        : ''
                                                } hover:bg-gray-700 hover:text-pink-500 dark:hover:bg-gray-300`}
                                                variants={itemVariants}
                                            >
                                                {item}
                                            </motion.a>
                                        ))}
                                    </motion.div>
                                </PopoverPanel>
                            </Popover>
                        </li>
                        {/* Dark Mode Toggle */}
                        <li className="mt-4 flex justify-center">
                            <Switch
                                checked={isDarkMode}
                                onChange={toggleDarkMode}
                                className={`flex items-center rounded-full p-2 shadow-lg transition ${
                                    isDarkMode ? 'bg-gray-800' : 'bg-gray-300'
                                }`}
                            >
                                <span className="sr-only">
                                    Toggle Dark Mode
                                </span>
                                {isDarkMode ? (
                                    <MoonIcon className="h-5 w-5 text-yellow-400" />
                                ) : (
                                    <SunIcon className="h-5 w-5 text-blue-500" />
                                )}
                            </Switch>
                        </li>
                    </ul>
                </motion.div>
            )}
        </nav>
    );
}

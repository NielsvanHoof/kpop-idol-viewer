import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { Link, usePage } from '@inertiajs/react';
import { Popover, PopoverButton, PopoverPanel, Switch } from '@headlessui/react';
import { motion } from 'framer-motion';
import useDarkMode from '@/Hooks/useDarkMode';
import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';

const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            when: 'beforeChildren',
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
};

export default function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const { url } = usePage();

    return (
        <nav
            className="bg-gray-900 dark:bg-gray-100 text-gray-200 dark:text-gray-800 shadow-lg fixed top-0 left-0 w-full z-50 transition-colors duration-500"
        >
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo and Brand Name */}
                <div className="flex items-center space-x-2">
          <span
              className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 tracking-wide">
            KPop Universe
          </span>
                </div>

                {/* Dark Mode Toggle */}
                <Switch
                    checked={isDarkMode}
                    onChange={toggleDarkMode}
                    className={`hidden md:flex items-center p-2 rounded-full shadow-lg transition ${
                        isDarkMode ? 'bg-gray-800' : 'bg-gray-300'
                    }`}
                >
                    <span className="sr-only">Toggle Dark Mode</span>
                    {isDarkMode ? (
                        <MoonIcon className="h-5 w-5 text-yellow-400" />
                    ) : (
                        <SunIcon className="h-5 w-5 text-blue-500" />
                    )}
                </Switch>

                {/* Desktop Navigation Links */}
                <ul className="hidden md:flex space-x-6">
                    <Link
                        href={route('welcome')}
                        className={'hover:text-pink-500 transition' + (url === '/' ? ' text-pink-500' : '')}
                    >
                        Home
                    </Link>

                    <Link
                        href={route('idols.overview')}
                        className={'hover:text-pink-500 transition' + (url === '/idols' ? ' text-pink-500' : '')}
                    >
                        Idols
                    </Link>

                    {/* Dropdown Using Headless UI Popover */}
                    <li>
                        <Popover className="relative">
                            <PopoverButton className="hover:text-pink-500 transition focus:outline-none">
                                More
                            </PopoverButton>
                            <PopoverPanel
                                className="absolute z-10 mt-2 w-48 bg-gray-800 dark:bg-gray-200 text-gray-300 dark:text-gray-800 rounded-lg shadow-lg"
                            >
                                <motion.div
                                    className="flex flex-col"
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={dropdownVariants}
                                >
                                    {['Analytics', 'Engagement', 'Security', 'Integrations'].map((item, index) => (
                                        <motion.a
                                            key={index}
                                            href={`/${item.toLowerCase()}`}
                                            className={`px-4 py-2 ${
                                                index === 0 ? 'rounded-t-lg' : ''
                                            } ${index === 3 ? 'rounded-b-lg' : ''} hover:bg-gray-700 dark:hover:bg-gray-300 hover:text-pink-500`}
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
                    className="md:hidden text-gray-200 dark:text-gray-800"
                >
                    {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="md:hidden bg-gray-900 dark:bg-gray-100 text-gray-300 dark:text-gray-800 shadow-lg"
                >
                    <ul className="space-y-4 px-6 py-4">
                        {['Home', 'Idols', 'Events', 'Contact'].map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item === 'Home' ? route('welcome') : `#${item.toLowerCase()}`}
                                    className="block hover:text-pink-500 transition"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}

                        {/* Dropdown for Mobile */}
                        <li>
                            <Popover>
                                <PopoverButton
                                    className="block w-full text-left hover:text-pink-500 transition focus:outline-none"
                                >
                                    More
                                </PopoverButton>
                                <PopoverPanel
                                    className="mt-2 bg-gray-800 dark:bg-gray-200 text-gray-300 dark:text-gray-800 rounded-lg shadow-lg"
                                >
                                    <motion.div
                                        className="flex flex-col"
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        variants={dropdownVariants}
                                    >
                                        {['Analytics', 'Engagement', 'Security', 'Integrations'].map((item, index) => (
                                            <motion.a
                                                key={index}
                                                href={`/${item.toLowerCase()}`}
                                                className={`px-4 py-2 ${
                                                    index === 0 ? 'rounded-t-lg' : ''
                                                } ${index === 3 ? 'rounded-b-lg' : ''} hover:bg-gray-700 dark:hover:bg-gray-300 hover:text-pink-500`}
                                                variants={itemVariants}
                                            >
                                                {item}
                                            </motion.a>
                                        ))}
                                    </motion.div>
                                </PopoverPanel>
                            </Popover>
                        </li>

                        {/* Dark Mode Toggle for Mobile */}
                        <li className="flex justify-center mt-4">
                            <Switch
                                checked={isDarkMode}
                                onChange={toggleDarkMode}
                                className={`flex items-center p-2 rounded-full shadow-lg transition ${
                                    isDarkMode ? 'bg-gray-800' : 'bg-gray-300'
                                }`}
                            >
                                <span className="sr-only">Toggle Dark Mode</span>
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

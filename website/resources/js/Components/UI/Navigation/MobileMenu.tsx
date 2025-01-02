import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from '@headlessui/react';
import { Link, usePage } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import { CircleXIcon, MenuIcon, UserCircleIcon } from 'lucide-react';
import { Fragment } from 'react';

interface MobileMenuProps {
    navigationLinks: Array<{
        name: string;
        href: string;
        icon: React.ReactNode;
    }>;
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

const menuVariants: Variants = {
    closed: {
        opacity: 0,
        y: -20,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
    open: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.07,
            delayChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
};

export default function MobileMenu({ navigationLinks }: MobileMenuProps) {
    const { auth } = usePage().props;

    return (
        <Popover className="relative md:hidden">
            {({ open: menuOpen, close: closeMenu }) => (
                <>
                    <motion.div
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        whileTap="tap"
                        variants={buttonVariants}
                    >
                        <PopoverButton className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/80 shadow-sm backdrop-blur-xl transition-all duration-300 hover:bg-white/90 hover:shadow-md dark:bg-gray-800/80 dark:hover:bg-gray-800/90">
                            {menuOpen ? (
                                <CircleXIcon className="h-5 w-5 text-gray-600 transition-colors hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400" />
                            ) : (
                                <MenuIcon className="h-5 w-5 text-gray-600 transition-colors hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400" />
                            )}
                        </PopoverButton>
                    </motion.div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <PopoverPanel className="absolute right-0 z-50 mt-2 w-screen max-w-[calc(100vw-2rem)] transform px-4 sm:px-0">
                            <div className="overflow-hidden rounded-2xl bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur-xl dark:bg-gray-800/80 dark:ring-white/5">
                                <motion.div
                                    initial="closed"
                                    animate="open"
                                    variants={menuVariants}
                                    className="p-4"
                                >
                                    {/* Navigation Links */}
                                    {navigationLinks.map((link) => (
                                        <motion.div
                                            key={link.name}
                                            variants={itemVariants}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => closeMenu()}
                                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition-all duration-300 hover:bg-white/90 hover:text-purple-600 hover:shadow-sm dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-purple-400"
                                            >
                                                {link.icon}
                                                {link.name}
                                            </Link>
                                        </motion.div>
                                    ))}

                                    {/* Auth Section */}
                                    <div className="my-2 border-t border-gray-200/80 dark:border-gray-700/80" />

                                    <div className="relative">
                                        <button
                                            onClick={() => {
                                                if (auth.user) {
                                                    closeMenu();
                                                    window.location.href =
                                                        route('dashboard');
                                                } else {
                                                    window.location.href =
                                                        route('login');
                                                }
                                            }}
                                            className="flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-gray-700 transition-all duration-300 hover:bg-white/90 hover:text-purple-600 hover:shadow-sm dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-purple-400"
                                        >
                                            <div className="flex items-center gap-3">
                                                <UserCircleIcon className="h-5 w-5" />
                                                <span>
                                                    {auth.user
                                                        ? auth.user.name
                                                        : 'Sign In'}
                                                </span>
                                            </div>
                                            {!auth.user && (
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="rounded-xl bg-purple-600 px-3 py-1 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-purple-700 hover:shadow-md"
                                                >
                                                    Sign Up
                                                </motion.div>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        </PopoverPanel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}

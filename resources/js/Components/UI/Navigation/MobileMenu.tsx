import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from '@headlessui/react';
import { Link, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleXIcon, MenuIcon, UserCircleIcon } from 'lucide-react';
import { Fragment } from 'react';
import { NavLink } from './NavLink';

interface MobileMenuProps {
    navigationLinks: Array<{
        name: string;
        href: string;
        icon: React.ReactNode;
    }>;
}

const menuVariants = {
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

const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
};

// Add new variants for menu items
const dropdownVariants = {
    closed: {
        opacity: 0,
        y: -10,
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

export default function MobileMenu({ navigationLinks }: MobileMenuProps) {
    const { auth } = usePage().props;

    return (
        <div className="md:hidden">
            <Popover>
                {({ open, close }) => (
                    <>
                        <PopoverButton
                            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                            aria-label="Toggle Menu"
                        >
                            <motion.span
                                initial={false}
                                animate={{ rotate: open ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {open ? (
                                    <CircleXIcon className="h-6 w-6" />
                                ) : (
                                    <MenuIcon className="h-6 w-6" />
                                )}
                            </motion.span>
                        </PopoverButton>

                        <AnimatePresence>
                            {open && (
                                <PopoverPanel
                                    static
                                    className="fixed inset-x-0 top-16 z-50 origin-top px-4 pt-2"
                                >
                                    <motion.div
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                        variants={menuVariants}
                                        className="overflow-hidden rounded-2xl bg-white/80 shadow-xl ring-1 ring-black/5 backdrop-blur-md dark:bg-gray-800/80 dark:ring-white/5"
                                    >
                                        <div className="p-3">
                                            {navigationLinks.map((link) => (
                                                <motion.div
                                                    key={link.name}
                                                    variants={itemVariants}
                                                    className="mb-1 last:mb-0"
                                                    onClick={() => close()}
                                                >
                                                    <NavLink {...link} />
                                                </motion.div>
                                            ))}
                                        </div>

                                        <motion.div
                                            variants={itemVariants}
                                            className="border-t border-gray-200 p-3 dark:border-gray-700"
                                        >
                                            {auth.user ? (
                                                <Menu
                                                    as="div"
                                                    className="w-full"
                                                >
                                                    <MenuButton className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                                                        <UserCircleIcon className="h-5 w-5" />
                                                        <span>
                                                            {auth.user.name}
                                                        </span>
                                                    </MenuButton>
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <MenuItems
                                                            as={motion.div}
                                                            initial="closed"
                                                            animate="open"
                                                            exit="closed"
                                                            variants={
                                                                dropdownVariants
                                                            }
                                                            className="mt-1 w-full rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-white/5"
                                                        >
                                                            <motion.div
                                                                variants={
                                                                    itemVariants
                                                                }
                                                                className="border-b border-gray-200 px-4 py-2 dark:border-gray-700"
                                                            >
                                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                    {
                                                                        auth
                                                                            .user
                                                                            .name
                                                                    }
                                                                </p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                    {
                                                                        auth
                                                                            .user
                                                                            .email
                                                                    }
                                                                </p>
                                                            </motion.div>
                                                            <motion.div
                                                                variants={
                                                                    itemVariants
                                                                }
                                                            >
                                                                <MenuItem>
                                                                    {({
                                                                        focus,
                                                                    }) => (
                                                                        <Link
                                                                            href={route(
                                                                                'dashboard',
                                                                            )}
                                                                            className={`block px-4 py-2 text-sm ${
                                                                                focus
                                                                                    ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                                                                                    : 'text-gray-700 dark:text-gray-300'
                                                                            }`}
                                                                            onClick={() =>
                                                                                close()
                                                                            }
                                                                        >
                                                                            Dashboard
                                                                        </Link>
                                                                    )}
                                                                </MenuItem>
                                                            </motion.div>
                                                            <motion.div
                                                                variants={
                                                                    itemVariants
                                                                }
                                                            >
                                                                <MenuItem>
                                                                    {({
                                                                        focus,
                                                                    }) => (
                                                                        <Link
                                                                            href={route(
                                                                                'logout',
                                                                            )}
                                                                            method="post"
                                                                            as="button"
                                                                            className={`block w-full px-4 py-2 text-left text-sm ${
                                                                                focus
                                                                                    ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                                                                                    : 'text-gray-700 dark:text-gray-300'
                                                                            }`}
                                                                            onClick={() =>
                                                                                close()
                                                                            }
                                                                        >
                                                                            Sign
                                                                            Out
                                                                        </Link>
                                                                    )}
                                                                </MenuItem>
                                                            </motion.div>
                                                        </MenuItems>
                                                    </Transition>
                                                </Menu>
                                            ) : (
                                                <div className="flex flex-col gap-2">
                                                    <Link
                                                        href={route('login')}
                                                        className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-purple-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-purple-400"
                                                        onClick={() => close()}
                                                    >
                                                        Sign In
                                                    </Link>
                                                    <Link
                                                        href={route('register')}
                                                        className="block rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl"
                                                        onClick={() => close()}
                                                    >
                                                        Sign Up
                                                    </Link>
                                                </div>
                                            )}
                                        </motion.div>
                                    </motion.div>
                                </PopoverPanel>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </Popover>
        </div>
    );
}

import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from '@headlessui/react';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { UserCircleIcon } from 'lucide-react';
import { Fragment } from 'react';

export default function AuthLinks() {
    const { auth } = usePage().props;

    return (
        <div className="flex items-center gap-4">
            {auth.user ? (
                <Menu as="div" className="relative">
                    <MenuButton className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                        <UserCircleIcon className="h-6 w-6" />
                        <span className="hidden md:block">
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
                        <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-white/5">
                            <div className="border-b border-gray-200 px-4 py-2 dark:border-gray-700">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {auth.user.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {auth.user.email}
                                </p>
                            </div>
                            <MenuItem>
                                {({ focus }) => (
                                    <Link
                                        href={route('dashboard')}
                                        className={`block px-4 py-2 text-sm ${
                                            focus
                                                ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                                                : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                    >
                                        Dashboard
                                    </Link>
                                )}
                            </MenuItem>
                            <MenuItem>
                                {({ focus }) => (
                                    <Link
                                        href={route('profile.edit')}
                                        className={`block px-4 py-2 text-sm ${
                                            focus
                                                ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                                                : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                    >
                                        Profile
                                    </Link>
                                )}
                            </MenuItem>
                            <MenuItem>
                                {({ focus }) => (
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className={`block w-full px-4 py-2 text-left text-sm ${
                                            focus
                                                ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                                                : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                    >
                                        Sign Out
                                    </Link>
                                )}
                            </MenuItem>
                        </MenuItems>
                    </Transition>
                </Menu>
            ) : (
                <>
                    <Link
                        href={route('login')}
                        className="text-sm font-medium text-gray-700 transition-colors hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                    >
                        Sign In
                    </Link>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            href={route('register')}
                            className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
                        >
                            Sign Up
                        </Link>
                    </motion.div>
                </>
            )}
        </div>
    );
}

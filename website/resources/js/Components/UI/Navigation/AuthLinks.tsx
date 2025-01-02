import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from '@headlessui/react';
import { Link, usePage } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import { UserCircleIcon } from 'lucide-react';
import { Fragment } from 'react';

const buttonVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    hover: {
        scale: 1.02,
        transition: {
            duration: 0.2,
            ease: 'easeInOut',
        },
    },
    tap: {
        scale: 0.98,
        transition: {
            duration: 0.1,
            ease: 'easeInOut',
        },
    },
};

export default function AuthLinks() {
    const { auth } = usePage().props;

    return (
        <div className="flex items-center gap-4">
            {auth.user ? (
                <Menu as="div" className="relative">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        whileTap="tap"
                        variants={buttonVariants}
                    >
                        <MenuButton className="group flex items-center gap-2 rounded-xl bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:bg-white/90 hover:shadow-md dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-800/90">
                            <UserCircleIcon className="h-5 w-5 transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                            <span className="hidden md:block">
                                {auth.user.name}
                            </span>
                        </MenuButton>
                    </motion.div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right overflow-hidden rounded-xl bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur-xl focus:outline-none dark:bg-gray-800/80 dark:ring-white/5">
                            <div className="border-b border-gray-200/80 px-4 py-3 dark:border-gray-700/80">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {auth.user.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {auth.user.email}
                                </p>
                            </div>
                            <div className="py-1">
                                <MenuItem>
                                    {({ active }) => (
                                        <Link
                                            href={route('dashboard')}
                                            className={`block px-4 py-2 text-sm transition-colors ${
                                                active
                                                    ? 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'
                                                    : 'text-gray-700 dark:text-gray-300'
                                            }`}
                                        >
                                            Dashboard
                                        </Link>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ active }) => (
                                        <Link
                                            href={route('profile.edit')}
                                            className={`block px-4 py-2 text-sm transition-colors ${
                                                active
                                                    ? 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'
                                                    : 'text-gray-700 dark:text-gray-300'
                                            }`}
                                        >
                                            Profile
                                        </Link>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ active }) => (
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                                                active
                                                    ? 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'
                                                    : 'text-gray-700 dark:text-gray-300'
                                            }`}
                                        >
                                            Sign Out
                                        </Link>
                                    )}
                                </MenuItem>
                            </div>
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
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        whileTap="tap"
                        variants={buttonVariants}
                    >
                        <Link
                            href={route('register')}
                            className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl dark:from-purple-500 dark:to-pink-500"
                        >
                            Sign Up
                        </Link>
                    </motion.div>
                </>
            )}
        </div>
    );
}

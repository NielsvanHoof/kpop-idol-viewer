import { Link, usePage } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';

interface NavLinkProps {
    name: string;
    href: string;
    icon: React.ReactNode;
}

const linkVariants: Variants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
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

export function NavLink({ name, href, icon }: NavLinkProps) {
    const { url } = usePage();

    // Convert href to path by removing the origin
    const hrefPath = href.replace(/^https?:\/\/[^/]+/i, '');

    // Special handling for index route
    const isActive =
        hrefPath === '/'
            ? url === '/' // Exact match for index route
            : url.startsWith(hrefPath); // Prefix match for other routes

    return (
        <Link href={href}>
            <motion.div
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                variants={linkVariants}
                className={`group relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                        ? 'bg-purple-500 text-white shadow-md dark:bg-purple-600'
                        : 'text-gray-600 hover:bg-white/80 hover:text-purple-600 hover:shadow-sm hover:backdrop-blur-xl dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-purple-400'
                }`}
            >
                {icon && (
                    <span
                        className={`transition-colors ${
                            isActive
                                ? 'text-white'
                                : 'text-gray-500 group-hover:text-purple-600 dark:text-gray-400 dark:group-hover:text-purple-400'
                        }`}
                    >
                        {icon}
                    </span>
                )}
                {name}
            </motion.div>
        </Link>
    );
}

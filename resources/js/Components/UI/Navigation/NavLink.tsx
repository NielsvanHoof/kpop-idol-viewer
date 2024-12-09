import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface NavLinkProps {
    name: string;
    href: string;
    icon: React.ReactNode;
}

export function NavLink({ name, href, icon }: NavLinkProps) {
    const isActiveLink = (name: string) =>
        route().current()?.startsWith(name.toLowerCase());

    return (
        <Link
            href={href}
            className="group relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-purple-600 dark:hover:text-purple-400"
        >
            <motion.span
                className="transition-transform duration-300 group-hover:scale-110"
                initial={false}
                animate={{
                    rotate: isActiveLink(name) ? 360 : 0,
                }}
                transition={{ duration: 0.5 }}
            >
                {icon}
            </motion.span>
            <span className="relative">
                {name}
                {isActiveLink(name) && (
                    <motion.span
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-0 h-0.5 w-full bg-purple-600 dark:bg-purple-400"
                    />
                )}
            </span>
        </Link>
    );
}

import { Link } from '@inertiajs/react';

interface NavLinkProps {
    name: string;
    href: string;
    icon: React.ReactNode;
}

export function NavLink({ name, href, icon }: NavLinkProps) {
    return (
        <Link
            href={href}
            className="group relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-purple-50 hover:text-purple-700 dark:text-gray-300 dark:hover:bg-purple-900/30 dark:hover:text-purple-400"
        >
            {icon && (
                <span className="text-gray-500 transition-colors group-hover:text-purple-600 dark:text-gray-400 dark:group-hover:text-purple-400">
                    {icon}
                </span>
            )}
            {name}
        </Link>
    );
}

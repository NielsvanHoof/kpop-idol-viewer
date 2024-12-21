import clsx from 'clsx';
import { motion } from 'framer-motion';
import { InboxIcon } from 'lucide-react';
import { PropsWithChildren } from 'react';

interface EmptyStateProps extends PropsWithChildren {
    fullScreen?: boolean;
    title?: string;
    message?: string;
    icon?: React.ReactNode;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}

export default function EmptyState({
    fullScreen = false,
    title = 'No items found',
    message = 'No items are currently available.',
    icon,
    action,
    className = '',
    children,
}: EmptyStateProps) {
    return (
        <div
            className={clsx(
                'flex items-center justify-center',
                fullScreen &&
                    'fixed inset-0 bg-white/90 backdrop-blur-sm dark:bg-gray-900/90',
                !fullScreen && 'w-full py-12',
                className,
            )}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md px-4 text-center sm:px-6 lg:px-8"
            >
                {icon || (
                    <InboxIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
                )}
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                    {title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {message}
                </p>
                {action && (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={action.onClick}
                        className={clsx(
                            'mt-6 inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold',
                            'bg-purple-600 text-white shadow-sm dark:bg-purple-500',
                            'hover:bg-purple-500 dark:hover:bg-purple-400',
                            'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
                        )}
                    >
                        {action.label}
                    </motion.button>
                )}
                {children}
            </motion.div>
        </div>
    );
}

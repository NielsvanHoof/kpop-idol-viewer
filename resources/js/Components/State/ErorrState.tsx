import clsx from 'clsx';
import { motion } from 'framer-motion';
import { TriangleAlert } from 'lucide-react';
import { PropsWithChildren } from 'react';

interface ErrorStateProps extends PropsWithChildren {
    fullScreen?: boolean;
    title?: string;
    message?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}

export default function ErrorState({
    fullScreen = false,
    title = 'Something went wrong',
    message = 'An error occurred while processing your request.',
    action,
    className = '',
    children,
}: ErrorStateProps) {
    return (
        <div
            className={clsx(
                'flex items-center justify-center',
                fullScreen && 'fixed inset-0 bg-gray-50 dark:bg-gray-900',
                !fullScreen && 'w-full py-12',
                className,
            )}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md px-4 text-center sm:px-6 lg:px-8"
            >
                <TriangleAlert className="mx-auto h-12 w-12 text-red-500" />
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
                            'bg-purple-600 text-white shadow-sm',
                            'hover:bg-purple-500',
                            'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
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
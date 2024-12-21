import clsx from 'clsx';
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

interface LoadingStateProps extends PropsWithChildren {
    fullScreen?: boolean;
    message?: string;
    className?: string;
}

export default function LoadingState({
    fullScreen = false,
    message = 'Loading...',
    className = '',
    children,
}: LoadingStateProps) {
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
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-purple-100 border-t-purple-600 sm:h-16 sm:w-16 dark:border-purple-900 dark:border-t-purple-400" />
                <p className="mt-4 text-sm text-gray-600 sm:text-base dark:text-gray-400">
                    {message}
                </p>
                {children}
            </motion.div>
        </div>
    );
}

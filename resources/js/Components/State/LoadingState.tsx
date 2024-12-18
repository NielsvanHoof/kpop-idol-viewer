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
                'flex flex-col items-center justify-center',
                fullScreen &&
                    'fixed inset-0 bg-gray-50/90 backdrop-blur-sm dark:bg-gray-900/90',
                !fullScreen && 'w-full',
                className,
            )}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
            >
                <div
                    className={clsx(
                        'animate-spin rounded-full border-t-4 border-purple-600',
                        'h-12 w-12 sm:h-16 sm:w-16',
                        'mb-4',
                    )}
                />
                <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
                    {message}
                </p>
                {children}
            </motion.div>
        </div>
    );
}

import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';
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

const containerVariants: Variants = {
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

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
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className={clsx(
                'flex items-center justify-center',
                fullScreen &&
                    'fixed inset-0 bg-white/80 backdrop-blur-xl dark:bg-gray-900/80',
                !fullScreen && 'w-full py-12',
                className,
            )}
        >
            <motion.div
                variants={itemVariants}
                className="relative max-w-md rounded-2xl bg-white/50 px-6 py-8 text-center shadow-lg backdrop-blur-xl transition-all duration-300 sm:px-8 dark:bg-white/5"
            >
                <motion.div
                    variants={itemVariants}
                    className="flex justify-center"
                >
                    {icon || (
                        <div className="rounded-xl bg-purple-500/10 p-3 dark:bg-purple-500/20">
                            <InboxIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                        </div>
                    )}
                </motion.div>
                <motion.h3
                    variants={itemVariants}
                    className="mt-4 text-lg font-semibold text-gray-900 dark:text-white"
                >
                    {title}
                </motion.h3>
                <motion.p
                    variants={itemVariants}
                    className="mt-2 text-sm text-gray-600 dark:text-gray-400"
                >
                    {message}
                </motion.p>
                {action && (
                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={action.onClick}
                        className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-purple-500 dark:bg-purple-500 dark:hover:bg-purple-400"
                    >
                        <span>{action.label}</span>
                        <motion.span
                            initial={{ x: 0 }}
                            animate={{ x: [0, 2, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="transition-transform duration-300 group-hover:translate-x-0.5"
                        >
                            →
                        </motion.span>
                    </motion.button>
                )}
                {children}
            </motion.div>
        </motion.div>
    );
}

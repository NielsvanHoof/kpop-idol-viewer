import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';
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

const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
    },
};

export default function ErrorState({
    fullScreen = false,
    title = 'Something went wrong',
    message = 'An error occurred while processing your request.',
    action,
    className = '',
    children,
}: ErrorStateProps) {
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
                    <div className="rounded-xl bg-red-500/10 p-3 dark:bg-red-500/20">
                        <motion.div animate={pulseAnimation}>
                            <TriangleAlert className="h-8 w-8 text-red-600 dark:text-red-400" />
                        </motion.div>
                    </div>
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
                        className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-400"
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

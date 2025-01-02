import clsx from 'clsx';
import { motion, Transition, Variants } from 'framer-motion';
import { Loader2Icon } from 'lucide-react';
import { PropsWithChildren } from 'react';

interface LoadingStateProps extends PropsWithChildren {
    fullScreen?: boolean;
    message?: string;
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

const spinTransition: Transition = {
    repeat: Infinity,
    duration: 1,
    ease: 'linear',
};

export default function LoadingState({
    fullScreen = false,
    message = 'Loading...',
    className = '',
    children,
}: LoadingStateProps) {
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
                    <div className="rounded-xl bg-purple-500/10 p-3 dark:bg-purple-500/20">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={spinTransition}
                        >
                            <Loader2Icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                        </motion.div>
                    </div>
                </motion.div>
                <motion.p
                    variants={itemVariants}
                    className="mt-4 text-sm font-medium text-gray-600 sm:text-base dark:text-gray-400"
                >
                    {message}
                </motion.p>
                {children}
            </motion.div>
        </motion.div>
    );
}

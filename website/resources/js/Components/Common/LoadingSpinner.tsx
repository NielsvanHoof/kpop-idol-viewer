import { motion, Transition } from 'framer-motion';
import { Loader2Icon } from 'lucide-react';

const spinTransition: Transition = {
    repeat: Infinity,
    duration: 1,
    ease: 'linear',
};

export default function LoadingSpinner() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
        >
            {/* Background overlay */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xl transition-all duration-300 dark:bg-gray-900/80" />

            {/* Spinner */}
            <div className="relative z-10">
                <div className="rounded-xl bg-purple-500/10 p-3 dark:bg-purple-500/20">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={spinTransition}
                    >
                        <Loader2Icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </motion.div>
                </div>

                {/* Loading text */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400"
                >
                    Loading...
                </motion.p>
            </div>
        </motion.div>
    );
}

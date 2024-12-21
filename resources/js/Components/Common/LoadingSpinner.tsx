import { motion } from 'framer-motion';

export default function LoadingSpinner() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
        >
            {/* Background overlay */}
            <div className="absolute inset-0 bg-white backdrop-blur-sm dark:bg-gray-900" />

            {/* Spinner */}
            <div className="relative z-10">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-100 border-t-purple-600 sm:h-16 sm:w-16 dark:border-purple-900 dark:border-t-purple-400" />

                {/* Loading text */}
                <span className="sr-only">Loading...</span>
            </div>
        </motion.div>
    );
}

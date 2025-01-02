import LoadingSpinner from '@/Components/Common/LoadingSpinner';
import Footer from '@/Components/UI/Footer';
import Navigation from '@/Components/UI/Navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren, useEffect, useState } from 'react';

const pageVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: 'easeOut',
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.2,
            ease: 'easeIn',
        },
    },
};

export default function MainLayout({ children }: PropsWithChildren) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 transition-colors duration-500 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
                    >
                        <LoadingSpinner />
                    </motion.div>
                ) : (
                    <motion.main
                        key="content"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                        className="relative h-full w-full overflow-auto"
                    >
                        <div className="flex min-h-full flex-col">
                            <Navigation />
                            <div className="flex-grow">{children}</div>
                            <Footer />
                        </div>
                    </motion.main>
                )}
            </AnimatePresence>
        </div>
    );
}

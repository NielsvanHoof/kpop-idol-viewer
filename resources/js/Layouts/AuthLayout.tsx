import LoadingSpinner from '@/Components/Common/LoadingSpinner';
import Footer from '@/Components/UI/Footer';
import Navigation from '@/Components/UI/Navigation';
import { motion } from 'framer-motion';
import { PropsWithChildren, useEffect, useState } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
            <Navigation />

            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
            >
                {/* Background Decoration */}
                <div className="pointer-events-none fixed inset-0 overflow-hidden">
                    <div className="animate-pulse-slow absolute left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-purple-100/30 blur-3xl dark:bg-purple-900/20" />
                    <div className="animate-pulse-slow absolute right-[15%] top-[40%] h-[600px] w-[600px] rounded-full bg-pink-100/30 blur-3xl dark:bg-pink-900/20" />
                </div>

                {/* Content */}
                <div className="relative">{children}</div>
            </motion.main>

            <Footer />
        </div>
    );
}

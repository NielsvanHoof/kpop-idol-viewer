import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8"
                >
                    <motion.button
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }
                        className="group relative overflow-hidden rounded-full bg-purple-600 p-3 text-white shadow-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl sm:p-4 dark:bg-purple-600 dark:hover:bg-purple-700"
                    >
                        <span className="relative z-10 flex items-center justify-center">
                            <ArrowUpIcon className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 sm:h-6 sm:w-6" />
                        </span>
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

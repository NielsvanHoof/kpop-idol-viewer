import { Button } from '@headlessui/react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { ArrowUpIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const buttonVariants: Variants = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 260,
            damping: 20,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        y: 20,
        transition: {
            duration: 0.2,
        },
    },
    hover: {
        scale: 1.02,
        transition: {
            duration: 0.2,
            ease: 'easeInOut',
        },
    },
    tap: {
        scale: 0.98,
        transition: {
            duration: 0.1,
            ease: 'easeInOut',
        },
    },
};

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // Show when scrolled down 200px AND not at the bottom of the page
            setIsVisible(
                scrollY > 200 && scrollY + windowHeight < documentHeight - 100,
            );
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial state
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    variants={buttonVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    whileHover="hover"
                    whileTap="tap"
                    className="fixed bottom-6 right-6 z-[60] sm:bottom-8 sm:right-8"
                >
                    <Button
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }
                        className="group relative overflow-hidden rounded-xl bg-white/80 p-3 text-gray-900 shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-white/90 hover:shadow-xl sm:p-4 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                    >
                        <motion.div
                            animate={{ y: [-2, 0, -2] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="flex items-center justify-center"
                        >
                            <ArrowUpIcon className="h-5 w-5 text-purple-600 sm:h-6 sm:w-6 dark:text-purple-400" />
                        </motion.div>
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

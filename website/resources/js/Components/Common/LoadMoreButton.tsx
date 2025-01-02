import { Button } from '@headlessui/react';
import { motion, Transition } from 'framer-motion';
import { ArrowDownIcon, Loader2Icon } from 'lucide-react';
import { Variants } from 'motion/react';

interface LoadMoreButtonProps {
    onClick: () => void;
    isLoading: boolean;
    variants?: Variants;
}

const spinTransition: Transition = {
    repeat: Infinity,
    duration: 1,
    ease: 'linear',
};

const buttonVariants: Variants = {
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

export default function LoadMoreButton({
    onClick,
    isLoading,
    variants,
}: LoadMoreButtonProps) {
    return (
        <motion.div variants={variants} className="my-16 flex justify-center">
            <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="relative"
            >
                <Button
                    onClick={onClick}
                    disabled={isLoading}
                    className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-white/80 px-6 py-3 text-sm font-medium text-gray-900 shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-white/90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                >
                    {isLoading ? (
                        <>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={spinTransition}
                            >
                                <Loader2Icon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            </motion.div>
                            <span>Loading...</span>
                        </>
                    ) : (
                        <>
                            <span>Load More</span>
                            <motion.div
                                animate={{ y: [0, 2, 0] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            >
                                <ArrowDownIcon className="h-4 w-4 text-purple-600 transition-transform duration-300 group-hover:translate-y-0.5 dark:text-purple-400" />
                            </motion.div>
                        </>
                    )}
                </Button>
            </motion.div>
        </motion.div>
    );
}

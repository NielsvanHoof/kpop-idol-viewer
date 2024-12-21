import { Button } from '@headlessui/react';
import { motion } from 'framer-motion';
import { ArrowDownIcon, Loader2Icon } from 'lucide-react';
import { Variants } from 'motion/react';

interface LoadMoreButtonProps {
    onClick: () => void;
    isLoading: boolean;
    variants?: Variants;
}

export default function LoadMoreButton({
    onClick,
    isLoading,
    variants,
}: LoadMoreButtonProps) {
    return (
        <motion.div variants={variants} className="my-16 flex justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                    onClick={onClick}
                    disabled={isLoading}
                    className="group relative overflow-hidden rounded-full bg-purple-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 dark:bg-purple-600 dark:hover:bg-purple-700"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {isLoading ? (
                            <>
                                <Loader2Icon className="h-4 w-4 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            <>
                                Load More
                                <ArrowDownIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                            </>
                        )}
                    </span>
                </Button>
            </motion.div>
        </motion.div>
    );
}

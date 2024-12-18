import { Button } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Loader2Icon } from 'lucide-react';

interface LoadMoreButtonProps {
    onClick: () => void;
    isLoading: boolean;
    variants?: any;
}

export default function LoadMoreButton({
    onClick,
    isLoading,
    variants,
}: LoadMoreButtonProps) {
    return (
        <motion.div variants={variants} className="my-16 flex justify-center">
            <Button
                onClick={onClick}
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
                {isLoading ? (
                    <>
                        <Loader2Icon className="h-4 w-4 animate-spin" />
                        Loading...
                    </>
                ) : (
                    'Load More'
                )}
            </Button>
        </motion.div>
    );
}

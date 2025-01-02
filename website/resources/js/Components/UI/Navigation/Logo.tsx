import { Link } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import { SparklesIcon } from 'lucide-react';

const logoVariants: Variants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
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

export default function Logo() {
    return (
        <Link href={route('welcome')}>
            <motion.div
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                variants={logoVariants}
                className="flex items-center gap-2"
            >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10 backdrop-blur-sm dark:bg-purple-500/20">
                    <SparklesIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </span>
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 hover:from-purple-500 hover:to-pink-500 sm:text-2xl dark:from-purple-400 dark:to-pink-400 dark:hover:from-purple-300 dark:hover:to-pink-300">
                    KPOP Project
                </span>
            </motion.div>
        </Link>
    );
}

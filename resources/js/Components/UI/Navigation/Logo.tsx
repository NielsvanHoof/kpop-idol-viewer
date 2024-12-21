import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Logo() {
    return (
        <Link href={route('welcome')}>
            <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 hover:from-purple-500 hover:to-pink-500 sm:text-2xl dark:from-purple-400 dark:to-pink-400 dark:hover:from-purple-300 dark:hover:to-pink-300"
            >
                KPOP Project
            </motion.h1>
        </Link>
    );
}

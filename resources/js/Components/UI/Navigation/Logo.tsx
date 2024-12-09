import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Logo() {
    return (
        <Link href={route('welcome')}>
            <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-xl font-bold text-transparent sm:text-2xl"
            >
                KPOP Project
            </motion.h1>
        </Link>
    );
} 
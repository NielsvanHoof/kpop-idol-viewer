import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

export default function HeroSection() {
    return (
        <header
            id="hero"
            className="relative z-10 mx-auto max-w-6xl bg-gray-900 px-6 py-16 text-center transition-colors duration-500 dark:bg-gray-100"
        >
            {/* Hero Heading */}
            <motion.h1
                className="text-5xl font-extrabold leading-tight tracking-tight text-gray-100 md:text-7xl dark:text-gray-900"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 1,
                    delayChildren: 0.3,
                    staggerChildren: 0.2,
                }}
            >
                Enter the{' '}
                <span className="text-pink-500 dark:text-pink-600">
                    <Typewriter
                        words={['KPop Universe', 'Idol Haven', 'Fan Paradise']}
                        loop={6}
                        cursor
                        cursorStyle="_"
                        typeSpeed={70}
                        deleteSpeed={50}
                    />
                </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
                className="mt-6 text-lg text-gray-300 opacity-90 md:text-2xl dark:text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
            >
                Discover your favorite idols, exclusive tracks, and
                unforgettable experiences.
            </motion.p>

            {/* CTA Button */}
            <motion.button
                className="mt-8 transform rounded-full bg-pink-600 px-8 py-4 text-lg font-semibold text-gray-100 shadow-lg transition hover:scale-110 hover:bg-pink-500 hover:shadow-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-500/50 dark:bg-pink-500 dark:text-gray-900 dark:hover:bg-pink-400 dark:hover:shadow-pink-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Join the KPop Revolution"
            >
                Join the Revolution
            </motion.button>
        </header>
    );
}

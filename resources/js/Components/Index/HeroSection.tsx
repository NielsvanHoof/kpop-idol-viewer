import { motion } from "framer-motion";
import React from "react";
import { Typewriter } from "react-simple-typewriter";

export default function HeroSection() {
    return (
        <header
            id="hero"
            className="max-w-6xl mx-auto px-6 py-16 text-center relative z-10 bg-gray-900 dark:bg-gray-100"
        >
            <motion.h1
                className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-gray-100 dark:text-gray-900"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delayChildren: 0.3, staggerChildren: 0.2 }}
            >
                Enter the{" "}
                <span className="text-pink-500 dark:text-pink-600">
                    <Typewriter
                        words={["KPop Universe", "Idol Haven", "Fan Paradise"]}
                        loop={0}
                        cursor
                        cursorStyle="_"
                        typeSpeed={70}
                        deleteSpeed={50}
                    />
                </span>
            </motion.h1>
            <motion.p
                className="mt-6 text-lg md:text-2xl opacity-90 text-gray-300 dark:text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
            >
                Discover your favorite idols, exclusive tracks, and unforgettable
                experiences.
            </motion.p>
            <motion.button
                className="mt-8 px-8 py-4 rounded-full bg-pink-600 text-gray-100 font-semibold text-lg shadow-lg
                   hover:bg-pink-500 hover:shadow-pink-400 dark:bg-pink-500 dark:text-gray-900
                   dark:hover:bg-pink-400 dark:hover:shadow-pink-300
                   transition transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-pink-500/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Join the Revolution
            </motion.button>
        </header>
    );
}

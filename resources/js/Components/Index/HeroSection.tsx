import { Button } from '@headlessui/react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, SparklesIcon } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

const backgroundVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 1.5,
            ease: 'easeOut',
        },
    },
};

export default function HeroSection() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500">
            {/* Content Container */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8"
            >
                <motion.div
                    variants={itemVariants}
                    className="mb-8 flex justify-center"
                >
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                        <span className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-300 to-pink-300" />
                        <span className="text-sm font-medium text-white">
                            Welcome to KPOP Project
                        </span>
                    </span>
                </motion.div>

                {/* Main Heading */}
                <motion.div variants={itemVariants} className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                        <span className="mb-2 flex items-center justify-center gap-3 sm:mb-4">
                            <SparklesIcon className="h-8 w-8 animate-pulse text-yellow-300 sm:h-10 sm:w-10" />
                            <Typewriter
                                words={['Experience', 'Discover', 'Celebrate']}
                                loop={true}
                                cursor
                                cursorStyle="_"
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            />
                            <SparklesIcon className="h-8 w-8 animate-pulse text-yellow-300 sm:h-10 sm:w-10" />
                        </span>
                        <motion.span
                            variants={itemVariants}
                            className="mt-2 block bg-gradient-to-r from-white via-white to-purple-200 bg-clip-text font-extrabold text-transparent sm:mt-4"
                        >
                            The K-pop Universe
                        </motion.span>
                    </h1>

                    {/* Description */}
                    <motion.p
                        variants={itemVariants}
                        className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-purple-50 sm:mt-8 sm:text-xl"
                    >
                        Your ultimate destination for everything K-pop: from
                        chart-topping hits to behind-the-scenes exclusives. Join
                        our community and immerse yourself in the world of
                        K-pop.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-8 flex flex-col justify-center gap-4 sm:mt-12 sm:flex-row sm:gap-6"
                    >
                        <Button
                            as={motion.button}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative overflow-hidden rounded-full bg-white px-6 py-3 text-purple-600 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-purple-600 sm:px-8 sm:py-4"
                        >
                            <span className="relative z-10 flex items-center justify-center font-medium">
                                Get Started
                                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
                            </span>
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-purple-50 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </Button>
                        <Button
                            as={motion.button}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group rounded-full border-2 border-white/80 px-6 py-3 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-purple-600 sm:px-8 sm:py-4"
                        >
                            Learn More
                        </Button>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Animated Background */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={backgroundVariants}
                className="absolute inset-0 overflow-hidden"
            >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-purple-900/40" />

                <div className="pointer-events-none absolute inset-0">
                    <motion.div
                        animate={{
                            rotate: 360,
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                        className="absolute inset-0"
                    >
                        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-purple-400/30 blur-3xl" />
                        <div className="absolute right-40 top-60 h-48 w-48 rounded-full bg-pink-400/30 blur-3xl" />
                        <div className="absolute bottom-40 left-1/2 h-72 w-72 rounded-full bg-purple-500/30 blur-3xl" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

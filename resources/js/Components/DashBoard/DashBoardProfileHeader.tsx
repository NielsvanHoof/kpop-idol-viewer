import { usePage } from '@inertiajs/react';
import { FlameIcon } from 'lucide-react';

import { SparklesIcon } from 'lucide-react';
import { motion } from 'motion/react';

export default function DashBoardProfileHeader() {
    const { auth } = usePage().props;

    return (
        <section className="relative mb-16 h-[35vh] min-h-[250px] overflow-hidden sm:mb-20 sm:h-[40vh] sm:min-h-[300px]">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-600 to-black opacity-75" />
            <div className="animate-pulse-slow absolute inset-0 blur-3xl">
                <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-purple-100/50 dark:bg-purple-900/20" />
            </div>

            {/* Decorative Elements */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.5 }}
                className="absolute inset-0"
            >
                {[...Array(5)].map((_, i) => (
                    <SparklesIcon
                        key={i}
                        className="absolute h-4 w-4 text-white/30"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${2 + Math.random() * 2}s ease-in-out infinite`,
                        }}
                    />
                ))}
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 sm:p-6 lg:p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-auto max-w-7xl"
                >
                    <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="h-28 w-28 overflow-hidden rounded-full ring-4 ring-white/90"
                        >
                            <img
                                src={auth.user.profile_photo}
                                alt={`${auth.user.name}'s Profile`}
                                className="h-full w-full object-cover"
                            />
                        </motion.div>
                        <div>
                            <motion.span
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center rounded-full bg-purple-600 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm"
                            >
                                <FlameIcon className="mr-1.5 h-4 w-4" />
                                {auth.user.name}
                            </motion.span>
                            <h1 className="mt-2 text-3xl font-bold text-white">
                                Welcome Back!
                            </h1>
                            <p className="mt-1 text-lg text-gray-200">
                                Your K-pop journey continues here
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

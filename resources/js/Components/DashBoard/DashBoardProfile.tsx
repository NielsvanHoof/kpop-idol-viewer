import { User } from '@/types';
import { motion } from 'framer-motion';
import { ClockIcon, SparklesIcon } from 'lucide-react';

interface DashboardProfileHeaderProps {
    user: User;
}

export default function DashboardProfileHeader({
    user,
}: DashboardProfileHeaderProps) {
    return (
        <section className="relative h-[30vh] min-h-[200px] overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-purple-600 dark:bg-gray-800" />

            {/* Decorative Elements */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
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

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 sm:p-6 lg:p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-auto max-w-7xl"
                >
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative h-20 w-20 overflow-hidden rounded-full bg-white/10 ring-4 ring-white/20 sm:h-28 sm:w-28"
                            >
                                <img
                                    src={user.profile_photo}
                                    alt={`${user.name}'s Profile`}
                                    className="h-full w-full object-cover"
                                />
                            </motion.div>

                            <div className="max-w-xl">
                                <motion.span
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center rounded-full bg-white/20 px-3 py-0.5 text-sm font-medium text-white backdrop-blur-sm"
                                >
                                    <ClockIcon className="mr-1.5 h-4 w-4" />
                                    Dashboard
                                </motion.span>
                                <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                                    Welcome back, {user.name}!
                                </h1>
                                <p className="mt-1 text-base text-white/80 sm:text-lg">
                                    Keep track of your K-pop journey
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

import { User } from '@/types/models';
import { motion } from 'framer-motion';
import { ClockIcon, SparklesIcon } from 'lucide-react';
import { Variants } from 'motion/react';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

interface DashboardProfileHeaderProps {
    user: User;
}

export default function DashboardProfileHeader({
    user,
}: DashboardProfileHeaderProps) {
    return (
        <section className="relative h-[30vh] min-h-[200px] overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-purple-600 dark:bg-gray-800">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.1)_0%,_transparent_100%)]" />
            </div>

            {/* Content */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="absolute bottom-0 left-0 right-0 p-4 pb-8 sm:p-6 lg:p-8"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                            <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                className="relative h-20 w-20 overflow-hidden rounded-full bg-white/10 ring-4 ring-white/20 transition-all duration-300 sm:h-28 sm:w-28"
                            >
                                <img
                                    src={user.profile_photo}
                                    alt={`${user.name}'s Profile`}
                                    className="h-full w-full object-cover"
                                />
                            </motion.div>

                            <div className="max-w-xl">
                                <motion.div
                                    variants={itemVariants}
                                    className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
                                >
                                    <SparklesIcon className="h-4 w-4" />
                                    Dashboard
                                </motion.div>
                                <motion.h1
                                    variants={itemVariants}
                                    className="mt-2 text-2xl font-bold text-white sm:text-3xl"
                                >
                                    Welcome back, {user.name}!
                                </motion.h1>
                                <motion.p
                                    variants={itemVariants}
                                    className="mt-1 text-base text-white/80 sm:text-lg"
                                >
                                    Keep track of your K-pop journey
                                </motion.p>
                            </div>
                        </div>

                        <motion.div
                            variants={itemVariants}
                            className="flex items-center gap-2 rounded-xl bg-white/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
                        >
                            <ClockIcon className="h-4 w-4" />
                            Last active: {new Date().toLocaleDateString()}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

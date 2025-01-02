import { Group } from '@/types/models';
import { motion, Variants } from 'framer-motion';
import { CalendarIcon, SparklesIcon, UsersIcon } from 'lucide-react';

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
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export default function GroupProfileHeroSection({ group }: { group: Group }) {
    return (
        <section className="relative h-[70vh] overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 backdrop-blur-[2px]" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                >
                    <source src={group.background_video} type="video/mp4" />
                </video>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0">
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 backdrop-blur-sm sm:p-8">
                    <div className="mx-auto max-w-7xl">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                            className="flex flex-col items-start gap-6"
                        >
                            {/* Group Type Badge */}
                            <motion.div variants={itemVariants}>
                                <span className="inline-flex items-center gap-2 rounded-2xl bg-purple-600/80 px-4 py-2 text-sm font-medium text-white backdrop-blur-xl">
                                    <SparklesIcon className="h-5 w-5" />
                                    {group.type}
                                </span>
                            </motion.div>

                            {/* Group Name and Info */}
                            <div className="flex flex-col gap-6">
                                <motion.h1
                                    variants={itemVariants}
                                    className="bg-gradient-to-r from-white to-purple-100 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl"
                                >
                                    {group.name}
                                </motion.h1>

                                <motion.div
                                    variants={itemVariants}
                                    className="flex flex-wrap items-center gap-4 text-lg text-gray-300"
                                >
                                    <span className="flex items-center gap-2">
                                        <CalendarIcon className="h-5 w-5" />
                                        Debut{' '}
                                        {new Date(
                                            group.debute_date,
                                        ).getFullYear()}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <UsersIcon className="h-5 w-5" />
                                        {group.idols_count} Members
                                    </span>
                                </motion.div>
                            </div>

                            {/* Stats Section */}
                            <motion.div
                                variants={itemVariants}
                                className="mt-4 flex flex-wrap gap-4"
                            >
                                <div className="rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-xl">
                                    <div className="text-2xl font-bold text-white">
                                        {group.gallery_count}
                                    </div>
                                    <div className="text-sm text-gray-300">
                                        Photos
                                    </div>
                                </div>
                                <div className="rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-xl">
                                    <div className="text-2xl font-bold text-white">
                                        {group.events_count}
                                    </div>
                                    <div className="text-sm text-gray-300">
                                        Events
                                    </div>
                                </div>
                                <div className="rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-xl">
                                    <div className="text-2xl font-bold text-white">
                                        {group.awards_count}
                                    </div>
                                    <div className="text-sm text-gray-300">
                                        Awards
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

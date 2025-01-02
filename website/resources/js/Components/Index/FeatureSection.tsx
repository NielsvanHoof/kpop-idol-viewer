import { motion, Variants } from 'framer-motion';
import {
    AlbumIcon,
    BoltIcon,
    CalendarIcon,
    CameraIcon,
    HeartIcon,
    ShoppingBagIcon,
    SparklesIcon,
} from 'lucide-react';

const features = [
    {
        icon: <AlbumIcon className="h-6 w-6 sm:h-7 sm:w-7" />,
        title: 'Latest Music Updates',
        description:
            'Stay updated with the newest releases from your favorite artists.',
        color: 'bg-purple-500/10 dark:bg-purple-500/20',
        iconColor: 'text-purple-500 dark:text-purple-400',
    },
    {
        icon: <CameraIcon className="h-6 w-6 sm:h-7 sm:w-7" />,
        title: 'Exclusive Content',
        description:
            'Access behind-the-scenes footage and exclusive interviews.',
        color: 'bg-pink-500/10 dark:bg-pink-500/20',
        iconColor: 'text-pink-500 dark:text-pink-400',
    },
    {
        icon: <HeartIcon className="h-6 w-6 sm:h-7 sm:w-7" />,
        title: 'Fan Community',
        description:
            'Connect with fellow K-pop enthusiasts from around the world.',
        color: 'bg-rose-500/10 dark:bg-rose-500/20',
        iconColor: 'text-rose-500 dark:text-rose-400',
    },
    {
        icon: <CalendarIcon className="h-6 w-6 sm:h-7 sm:w-7" />,
        title: 'Event Updates',
        description: 'Never miss a concert, fan meeting, or special event.',
        color: 'bg-amber-500/10 dark:bg-amber-500/20',
        iconColor: 'text-amber-500 dark:text-amber-400',
    },
    {
        icon: <BoltIcon className="h-6 w-6 sm:h-7 sm:w-7" />,
        title: 'Real-time Updates',
        description: 'Get instant notifications about your favorite idols.',
        color: 'bg-blue-500/10 dark:bg-blue-500/20',
        iconColor: 'text-blue-500 dark:text-blue-400',
    },
    {
        icon: <ShoppingBagIcon className="h-6 w-6 sm:h-7 sm:w-7" />,
        title: 'Merchandise Shop',
        description: 'Shop official merchandise and limited edition items.',
        color: 'bg-emerald-500/10 dark:bg-emerald-500/20',
        iconColor: 'text-emerald-500 dark:text-emerald-400',
    },
];

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

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
    hover: {
        y: -4,
        transition: { duration: 0.2 },
    },
};

export default function FeatureSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white py-16 sm:py-24 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="text-center">
                    <motion.div className="mb-8 flex justify-center">
                        <span className="inline-flex items-center gap-2 rounded-2xl bg-purple-500/10 px-4 py-2 text-purple-600 backdrop-blur-sm dark:bg-purple-500/20 dark:text-purple-400">
                            <SparklesIcon className="h-5 w-5" />
                            <span className="text-sm font-medium">
                                Features & Benefits
                            </span>
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white"
                    >
                        Why Choose Us
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg dark:text-gray-300"
                    >
                        Experience the ultimate K-pop fan platform with our
                        comprehensive features
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover="hover"
                            className="group relative overflow-hidden rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-white/90 hover:shadow-xl sm:p-8 dark:bg-gray-800/80 dark:hover:bg-gray-800/90"
                        >
                            {/* Icon Container */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className={`mb-5 inline-flex rounded-xl ${feature.color} p-3 backdrop-blur-sm`}
                            >
                                <div className={`${feature.iconColor}`}>
                                    {feature.icon}
                                </div>
                            </motion.div>

                            <motion.h3
                                variants={itemVariants}
                                className="mb-3 text-lg font-semibold text-gray-900 sm:text-xl dark:text-white"
                            >
                                {feature.title}
                            </motion.h3>
                            <motion.p
                                variants={itemVariants}
                                className="text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-300"
                            >
                                {feature.description}
                            </motion.p>

                            {/* Hover Effects */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 transition-opacity duration-300 group-hover:opacity-10 dark:from-purple-500/5 dark:to-pink-500/5" />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}

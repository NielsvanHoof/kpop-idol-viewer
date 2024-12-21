import { motion } from 'framer-motion';
import {
    AlbumIcon,
    BoltIcon,
    CalendarIcon,
    CameraIcon,
    HeartIcon,
    ShoppingBagIcon,
} from 'lucide-react';

const features = [
    {
        icon: <AlbumIcon className="h-6 w-6 sm:h-7 sm:w-7" />,
        title: 'Latest Music Updates',
        description:
            'Stay updated with the newest releases from your favorite artists.',
    },
    {
        icon: <CameraIcon className="h-6 w-6 sm:h-7 sm:w-7" />,
        title: 'Exclusive Content',
        description:
            'Access behind-the-scenes footage and exclusive interviews.',
    },
    {
        icon: <HeartIcon className="h-6 w-6 sm:h-7 sm:w-7" />,
        title: 'Fan Community',
        description:
            'Connect with fellow K-pop enthusiasts from around the world.',
    },
    {
        icon: <CalendarIcon className="h-6 w-6 sm:h-7 sm:w-7" />,
        title: 'Event Updates',
        description: 'Never miss a concert, fan meeting, or special event.',
    },
    {
        icon: <BoltIcon className="h-6 w-6 sm:h-7 sm:w-7" />,
        title: 'Real-time Updates',
        description: 'Get instant notifications about your favorite idols.',
    },
    {
        icon: <ShoppingBagIcon className="h-6 w-6 sm:h-7 sm:w-7" />,
        title: 'Merchandise Shop',
        description: 'Shop official merchandise and limited edition items.',
    },
];

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

const cardVariants = {
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
        <section className="relative overflow-hidden bg-white py-16 sm:py-24 dark:bg-gray-900">
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
                        <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-purple-700 ring-1 ring-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:ring-purple-700">
                            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
                            <span className="text-sm font-medium">
                                Features & Benefits
                            </span>
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className="bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl lg:text-5xl dark:from-purple-400 dark:to-pink-400"
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
                    className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover="hover"
                            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200/70 transition-all duration-300 sm:p-8 dark:bg-gray-800/50 dark:ring-gray-700 dark:hover:ring-purple-700/30"
                        >
                            {/* Icon Container */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="mb-5 inline-flex rounded-xl bg-purple-100 p-3 ring-8 ring-purple-50 transition-colors duration-300 dark:bg-purple-900/30 dark:ring-purple-900/10"
                            >
                                <div className="text-purple-700 transition-colors duration-300 group-hover:text-purple-600 dark:text-purple-300 dark:group-hover:text-purple-200">
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
                            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 transition-opacity duration-300 group-hover:opacity-10 dark:from-purple-500/5 dark:to-pink-500/5" />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}

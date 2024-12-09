import {
    BoltIcon,
    CalendarIcon,
    HeartIcon,
    MusicalNoteIcon,
    ShoppingBagIcon,
    VideoCameraIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const features = [
    {
        icon: <MusicalNoteIcon className="h-6 w-6 sm:h-7 sm:w-7" />,
        title: 'Latest Music Updates',
        description:
            'Stay updated with the newest releases from your favorite artists.',
    },
    {
        icon: <VideoCameraIcon className="h-6 w-6 sm:h-7 sm:w-7" />,
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

export default function FeatureSection() {
    return (
        <section className="relative overflow-hidden bg-gray-50 py-16 sm:py-24 dark:bg-gray-800/50">
            {/* Background Gradient */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse-slow h-[500px] w-[800px] rounded-full bg-purple-500/10 blur-3xl filter dark:bg-purple-900/20" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl lg:text-5xl">
                        Why Choose Us
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg dark:text-gray-400">
                        Experience the ultimate K-pop fan platform with our
                        comprehensive features
                    </p>
                </motion.div>

                <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group relative rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8 dark:bg-gray-800 dark:ring-gray-700"
                        >
                            {/* Icon Container */}
                            <div className="mb-5 inline-flex rounded-xl bg-purple-100 p-3 ring-8 ring-purple-100/10 dark:bg-purple-900/30 dark:ring-purple-900/5">
                                <div className="text-purple-600 transition-colors duration-300 group-hover:text-purple-500 dark:text-purple-400 dark:group-hover:text-purple-300">
                                    {feature.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="mb-3 text-lg font-semibold text-gray-900 sm:text-xl dark:text-white">
                                {feature.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-400">
                                {feature.description}
                            </p>

                            {/* Hover Gradient */}
                            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

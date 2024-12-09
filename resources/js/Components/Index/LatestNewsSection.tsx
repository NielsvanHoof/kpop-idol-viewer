import { Button } from '@headlessui/react';
import { ArrowRightIcon, NewspaperIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const newsItems = [
    {
        id: 1,
        title: 'Latest K-pop Comebacks',
        description:
            'Breaking news and updates from your favorite K-pop artists and groups.',
        image: '/images/news-1.jpg',
        category: 'Music',
        date: '2024-03-21',
    },
    {
        id: 2,
        title: 'Concert Tour Announcements',
        description:
            'Exclusive details about upcoming world tours and fan meetings.',
        image: '/images/news-2.jpg',
        category: 'Events',
        date: '2024-03-20',
    },
    {
        id: 3,
        title: 'Behind the Scenes',
        description: 'Exclusive backstage content and artist interviews.',
        image: '/images/news-3.jpg',
        category: 'Features',
        date: '2024-03-19',
    },
];

export default function LatestNewsSection() {
    return (
        <section className="relative overflow-hidden bg-white py-16 sm:py-24 dark:bg-gray-800/95">
            {/* Background Decoration */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40">
                <div className="animate-pulse-slow h-[500px] w-[800px] rounded-full bg-purple-100 blur-3xl filter dark:bg-purple-900/20" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <span className="mb-4 inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                        <NewspaperIcon className="mr-1.5 h-4 w-4" />
                        Latest Updates
                    </span>
                    <h2 className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl lg:text-5xl">
                        Stay in the Loop
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg dark:text-gray-400">
                        Get the latest news and updates from the K-pop world
                    </p>
                </motion.div>

                {/* News Grid */}
                <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
                    {newsItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800 dark:ring-gray-700"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[16/9] overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                <div className="absolute right-4 top-4 rounded-full bg-purple-600 px-3 py-1 text-xs font-medium text-white shadow-lg backdrop-blur-sm">
                                    {item.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(item.date).toLocaleDateString(
                                        'en-US',
                                        {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        },
                                    )}
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                                    {item.title}
                                </h3>
                                <p className="mb-4 text-base text-gray-600 dark:text-gray-400">
                                    {item.description}
                                </p>
                                <Button className="inline-flex items-center font-medium text-purple-600 transition-colors hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                                    Read More
                                    <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

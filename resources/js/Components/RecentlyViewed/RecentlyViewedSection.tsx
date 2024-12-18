import { RecentlyViewedItem } from '@/types/models';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
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

export default function RecentlyViewedSection({
    recentlyViewed,
}: {
    recentlyViewed: RecentlyViewedItem[];
}) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
            {recentlyViewed.map((item, index) => (
                <motion.div
                    key={item.id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:ring-gray-300 dark:bg-gray-800 dark:ring-gray-700 dark:hover:ring-gray-600"
                >
                    <Link
                        href={
                            item.type === 'Idol'
                                ? route('idols.show', item.slug)
                                : route('groups.show', item.slug)
                        }
                        className="flex items-center gap-6"
                    >
                        <div className="relative h-24 w-24 overflow-hidden rounded-full">
                            <img
                                src={item.cover_photo.url}
                                alt={`Profile picture of ${item.name}`}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>

                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                {item.name}
                            </h3>

                            <div className="mt-2 flex flex-wrap gap-2">
                                <span
                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                        item.type === 'Idol'
                                            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
                                            : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                                    }`}
                                >
                                    {item.type}
                                </span>

                                {item.type === 'Idol' && (
                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                                        {item.group}
                                    </span>
                                )}
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    );
}

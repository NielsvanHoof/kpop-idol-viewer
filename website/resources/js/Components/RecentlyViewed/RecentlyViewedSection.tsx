import { RecentlyViewedItem } from '@/types/models';
import { Link } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import EmptyState from '../State/EmptyState';

interface RecentlyViewedSectionProps {
    recentlyViewed: RecentlyViewedItem[];
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
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

export default function RecentlyViewedSection({
    recentlyViewed,
}: RecentlyViewedSectionProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
        >
            {recentlyViewed.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
                >
                    <EmptyState
                        title="No recently viewed items"
                        message="Start exploring to see your viewing history!"
                        action={{
                            label: 'Explore Now',
                            onClick: () => route('idols.index'),
                        }}
                    />
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {recentlyViewed.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-200 hover:shadow-md dark:bg-gray-800 dark:ring-gray-700"
                        >
                            <Link
                                href={
                                    item.type === 'Idol'
                                        ? route(
                                              'idols.show',
                                              item.viewable.slug,
                                          )
                                        : route(
                                              'groups.show',
                                              item.viewable.slug,
                                          )
                                }
                            >
                                <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                                    <img
                                        src={item.cover_photo.url}
                                        alt={item.name}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-900/20 dark:text-purple-300 dark:ring-purple-800">
                                            {item.type === 'Idol'
                                                ? 'Idol'
                                                : 'Group'}
                                        </span>
                                        <time className="text-xs text-gray-500 dark:text-gray-400">
                                            {new Date(
                                                item.viewable.created_at,
                                            ).toLocaleDateString()}
                                        </time>
                                    </div>
                                    <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                                        {item.name}
                                    </h3>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

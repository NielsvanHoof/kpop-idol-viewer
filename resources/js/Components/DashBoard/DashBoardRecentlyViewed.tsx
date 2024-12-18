import { RecentlyViewedItem } from '@/types/models';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function DashBoardRecentlyViewedSection({
    recentlyViewed,
}: {
    recentlyViewed: RecentlyViewedItem[];
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
        >
            {recentlyViewed.map((item, index) => (
                <Link
                    key={item.id}
                    href={
                        item.type === 'Idol'
                            ? route('idols.show', item.slug)
                            : route('groups.show', item.slug)
                    }
                >
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex transform items-center gap-6 rounded-xl bg-white p-5 shadow-lg ring-1 ring-gray-200 transition duration-300 ease-in-out hover:scale-105 hover:ring-gray-300 dark:bg-gray-800 dark:ring-gray-700 dark:hover:ring-gray-600"
                    >
                        <img
                            src={item.cover_photo.url}
                            alt={`Profile picture of ${item.name}`}
                            className="h-20 w-20 rounded-full border-2 border-gray-300 object-cover dark:border-gray-700"
                        />
                        <div className="flex-1">
                            <h3 className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                                {item.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                {item.type === 'Idol' ? (
                                    <span className="inline-block rounded-full bg-indigo-600 px-2 py-1 text-xs font-medium text-white">
                                        Group: {item.group}
                                    </span>
                                ) : (
                                    <span className="inline-block rounded-full bg-gray-500 px-2 py-1 text-xs font-medium text-white">
                                        Group
                                    </span>
                                )}
                            </p>
                        </div>
                    </motion.div>
                </Link>
            ))}
        </motion.div>
    );
}

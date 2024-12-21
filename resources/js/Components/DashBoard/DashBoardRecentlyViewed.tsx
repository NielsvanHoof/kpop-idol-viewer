import { RecentlyViewedItem } from '@/types/models';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ClockIcon } from 'lucide-react';
interface DashboardRecentlyViewedProps {
    items: RecentlyViewedItem[];
}

export default function DashboardRecentlyViewed({
    items,
}: DashboardRecentlyViewedProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
        >
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <ClockIcon className="h-6 w-6 text-blue-500" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Recently Viewed
                    </h2>
                </div>
                <Link
                    href={route('recently-viewed')}
                    className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                >
                    View all
                </Link>
            </div>

            <div className="space-y-4">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative overflow-hidden rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-700/50"
                    >
                        <Link
                            href={
                                'group' in item
                                    ? route('idols.show', item.slug)
                                    : route('groups.show', item.slug)
                            }
                        >
                            <div className="flex items-center gap-4 p-4">
                                <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-white/20 dark:ring-black/20">
                                    <img
                                        src={item.cover_photo.url}
                                        alt={item.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900 dark:text-white">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-purple-600 dark:text-purple-400">
                                        {'group' in item ? 'Idol' : 'Group'}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

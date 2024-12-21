import { Idol } from '@/types/models';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { HeartIcon, UsersIcon } from 'lucide-react';

interface FavoriteIdolsProps {
    idols: Idol[];
}

export default function DashBoardFavoriteIdols({ idols }: FavoriteIdolsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
        >
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <HeartIcon className="h-6 w-6 text-pink-500" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Favorite Idols
                    </h2>
                </div>
                <Link
                    href={route('favorites')}
                    className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                >
                    View all
                </Link>
            </div>

            <div className="space-y-4">
                {idols.map((idol, index) => (
                    <motion.div
                        key={idol.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative overflow-hidden rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-700/50"
                    >
                        <Link href={route('idols.show', idol.slug)}>
                            <div className="flex items-center gap-4 p-4">
                                <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-white/20 dark:ring-black/20">
                                    <img
                                        src={idol.cover_photo.url}
                                        alt={idol.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900 dark:text-white">
                                        {idol.name}
                                    </h3>
                                    <p className="text-sm text-purple-600 dark:text-purple-400">
                                        {idol.group.name}
                                    </p>
                                    <div className="mt-1 flex items-center gap-3">
                                        <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                            <UsersIcon className="h-4 w-4" />
                                            {idol.followers.length}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

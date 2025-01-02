import { InteractableItem } from '@/types/models';
import { Link } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import { HeartIcon, UsersIcon } from 'lucide-react';

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

interface DashBoardFavoriteIdolsProps {
    items: InteractableItem[];
}

export default function DashBoardFavoriteIdols({
    items,
}: DashBoardFavoriteIdolsProps) {
    const getCoverPhotoUrl = (coverPhoto: InteractableItem['cover_photo']) => {
        return typeof coverPhoto === 'string' ? coverPhoto : coverPhoto.url;
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="overflow-hidden rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-gray-200/50 backdrop-blur-xl transition-all duration-300 hover:shadow-lg dark:bg-gray-800/80 dark:ring-gray-700/50 dark:hover:shadow-none"
        >
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-pink-100/80 p-2 dark:bg-pink-900/30">
                        <HeartIcon className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Favorite Idols
                    </h2>
                </div>
                <Link
                    href={route('favorites')}
                    className="rounded-lg bg-purple-100/80 px-3 py-1.5 text-sm font-medium text-purple-600 backdrop-blur-sm transition-all duration-300 hover:bg-purple-200/80 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-800/50"
                >
                    View all
                </Link>
            </div>

            <div className="space-y-4">
                {items.map((item) => (
                    <motion.div
                        key={`${item.type}-${item.id}`}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        className="group relative overflow-hidden rounded-xl bg-gray-50/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/80 hover:shadow-md dark:bg-gray-800/50 dark:hover:bg-gray-700/50 dark:hover:shadow-none"
                    >
                        <Link href={`/${item.type}s/${item.slug}`}>
                            <div className="flex items-center gap-4 p-4">
                                <div className="relative h-16 w-16 overflow-hidden rounded-xl ring-2 ring-white/50 transition-transform duration-300 group-hover:scale-105 dark:ring-black/20">
                                    <img
                                        src={getCoverPhotoUrl(item.cover_photo)}
                                        alt={item.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900 transition-colors duration-300 group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                                        {item.name}
                                    </h3>
                                    <div className="mt-2 flex items-center gap-3">
                                        <span className="flex items-center gap-1.5 rounded-lg bg-purple-100/80 px-2 py-0.5 text-sm text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                                            <UsersIcon className="h-3.5 w-3.5" />
                                            {item.followers_count}
                                        </span>
                                        <span className="flex items-center gap-1.5 rounded-lg bg-pink-100/80 px-2 py-0.5 text-sm text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                                            <HeartIcon className="h-3.5 w-3.5" />
                                            {item.likes_count}
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

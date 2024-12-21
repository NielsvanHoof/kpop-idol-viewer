import { Idol } from '@/types/models';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, HeartIcon, StarIcon, UsersIcon } from 'lucide-react';
import { useState } from 'react';

interface IdolCardProps {
    idol: Idol;
    isLiked?: boolean;
    isLoading?: boolean;
    showLikeButton?: boolean;
    onLike?: (idol: Idol) => void;
    onUnlike?: (idol: Idol) => void;
}

export default function IdolCard({
    idol,
    isLiked = false,
    isLoading = false,
    showLikeButton = false,
    onLike,
    onUnlike,
}: IdolCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const { auth } = usePage().props;

    return (
        <motion.div
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl hover:ring-purple-200 dark:bg-gray-800/90 dark:ring-gray-700 dark:hover:ring-purple-700"
        >
            {/* Image Section */}
            <div className="relative aspect-[3/4] overflow-hidden bg-purple-50 dark:bg-purple-900/10">
                {/* Loading Skeleton */}
                {!imageLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-purple-100/50 dark:bg-purple-900/30" />
                )}

                {/* Image */}
                <motion.img
                    src={idol.cover_photo.url}
                    alt={idol.name}
                    onLoad={() => setImageLoaded(true)}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{
                        opacity: imageLoaded ? 1 : 0,
                        scale: 1,
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Like Button */}
                {showLikeButton && auth.user && (
                    <motion.button
                        onClick={() =>
                            isLiked ? onUnlike?.(idol) : onLike?.(idol)
                        }
                        disabled={isLoading}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2.5 shadow-lg backdrop-blur-sm transition-all hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
                    >
                        <HeartIcon
                            className={`h-5 w-5 transition-colors ${
                                isLoading
                                    ? 'animate-pulse text-gray-400'
                                    : isLiked
                                      ? 'text-red-500'
                                      : 'text-gray-400 hover:text-red-500'
                            }`}
                        />
                    </motion.button>
                )}
            </div>

            {/* Info Section */}
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {idol.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-purple-600 dark:text-purple-400">
                    {idol.group?.name ?? 'Solo Artist'}
                </p>

                {/* Stats Section */}
                <div className="mt-4 flex items-center gap-4">
                    <span className="flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-sm text-purple-600 ring-1 ring-purple-100 dark:bg-purple-900/10 dark:text-purple-400 dark:ring-purple-900/30">
                        <UsersIcon className="h-4 w-4" />
                        {idol.followers_count}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-sm text-purple-600 ring-1 ring-purple-100 dark:bg-purple-900/10 dark:text-purple-400 dark:ring-purple-900/30">
                        <StarIcon className="h-4 w-4" />
                        {idol.likes_count}
                    </span>
                </div>

                {/* View Profile Button */}
                <Link
                    href={route('idols.show', idol.slug)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 py-2 text-sm font-medium text-white shadow-lg transition-all hover:bg-purple-700 hover:shadow-xl active:scale-95 dark:bg-purple-600 dark:hover:bg-purple-700"
                >
                    View Profile
                    <ArrowRightIcon className="h-4 w-4" />
                </Link>
            </div>
        </motion.div>
    );
}

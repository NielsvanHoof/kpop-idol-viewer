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
            className="group relative overflow-hidden rounded-2xl bg-white/80 shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-white/90 hover:shadow-xl dark:bg-gray-800/80 dark:hover:bg-gray-800/90"
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
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100" />

                {/* Like Button */}
                {showLikeButton && auth.user && (
                    <motion.button
                        onClick={() =>
                            isLiked ? onUnlike?.(idol) : onLike?.(idol)
                        }
                        disabled={isLoading}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute right-4 top-4 z-10 rounded-xl bg-white/90 p-2.5 shadow-lg backdrop-blur-xl transition-all hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
                    >
                        <HeartIcon
                            className={`h-5 w-5 transition-colors ${
                                isLoading
                                    ? 'animate-pulse text-gray-400'
                                    : isLiked
                                      ? 'text-pink-500'
                                      : 'text-gray-400 hover:text-pink-500'
                            }`}
                        />
                    </motion.button>
                )}
            </div>

            {/* Info Section */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {idol.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-purple-500 dark:text-purple-400">
                    {idol.group?.name ?? 'Solo Artist'}
                </p>

                {/* Stats Section */}
                <div className="mt-4 flex items-center gap-3">
                    <span className="flex items-center gap-1.5 rounded-xl bg-purple-500/10 px-3 py-1 text-sm text-purple-600 backdrop-blur-sm transition-colors hover:bg-purple-500/20 dark:bg-purple-500/20 dark:text-purple-400">
                        <UsersIcon className="h-4 w-4" />
                        {idol.followers_count}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-xl bg-pink-500/10 px-3 py-1 text-sm text-pink-600 backdrop-blur-sm transition-colors hover:bg-pink-500/20 dark:bg-pink-500/20 dark:text-pink-400">
                        <StarIcon className="h-4 w-4" />
                        {idol.likes_count}
                    </span>
                </div>

                {/* View Profile Button */}
                <Link
                    href={route('idols.show', idol.slug)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-500 py-2.5 text-sm font-medium text-white shadow-lg backdrop-blur-xl transition-all hover:bg-purple-600 hover:shadow-xl active:scale-95 dark:bg-purple-600 dark:hover:bg-purple-700"
                >
                    View Profile
                    <ArrowRightIcon className="h-4 w-4" />
                </Link>
            </div>
        </motion.div>
    );
}

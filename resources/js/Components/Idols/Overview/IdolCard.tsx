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
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-200 transition-all hover:shadow-xl hover:ring-gray-300 dark:bg-gray-800 dark:ring-gray-700 dark:hover:ring-gray-600"
        >
            {/* Image Section */}
            <div className="relative aspect-[3/4] overflow-hidden">
                {/* Loading Skeleton */}
                {!imageLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />
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
                    transition={{ duration: 0.3 }}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

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

            {/* Info Section - Always Visible */}
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {idol.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-purple-600 dark:text-purple-400">
                    {idol.group?.name ?? 'Solo Artist'}
                </p>

                {/* Stats Section */}
                <div className="mt-4 flex items-center gap-4">
                    <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <UsersIcon className="h-5 w-5 text-purple-500" />
                        {idol.followers_count}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <StarIcon className="h-5 w-5 text-yellow-500" />
                        {idol.likes_count}
                    </span>
                </div>

                {/* Mobile-friendly View Profile Button */}
                <Link
                    href={route('idols.show', idol.slug)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-purple-50 py-2 text-sm font-medium text-purple-600 ring-1 ring-purple-100 transition-all hover:bg-purple-100 active:scale-95 dark:bg-purple-900/10 dark:text-purple-400 dark:ring-purple-900/30 dark:hover:bg-purple-900/20"
                >
                    View Profile
                    <ArrowRightIcon className="h-4 w-4" />
                </Link>
            </div>
        </motion.div>
    );
}

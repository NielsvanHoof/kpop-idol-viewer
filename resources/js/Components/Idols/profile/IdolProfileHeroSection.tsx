import { Idol } from '@/types/models';
import { HeartIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function IdolProfileHeroSection({ idol }: { idol: Idol }) {
    const [isFollowing, setIsFollowing] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <section className="relative h-[45vh] min-h-[350px] sm:h-[50vh] sm:min-h-[400px] lg:h-[60vh]">
            {/* Background Image Container */}
            <div className="absolute inset-0 overflow-hidden">
                {!imageLoaded && (
                    <div className="h-full w-full animate-pulse bg-gray-200 dark:bg-gray-700" />
                )}
                <img
                    src={idol.cover_photo}
                    alt={idol.name}
                    className={`h-full w-full object-cover blur-sm transition-all duration-500 ${
                        imageLoaded
                            ? 'scale-100 opacity-100'
                            : 'scale-105 opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
            </div>

            {/* Content Container */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-auto max-w-7xl"
                >
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
                        {/* Profile Info */}
                        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-white/90 ring-offset-2 ring-offset-black/50 sm:h-32 sm:w-32 lg:h-40 lg:w-40"
                            >
                                <img
                                    src={idol.cover_photo}
                                    alt={idol.name}
                                    className="h-full w-full object-cover"
                                />
                            </motion.div>

                            <div>
                                <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                                    {idol.name}
                                </h1>
                                <p className="mt-1 text-base text-gray-300 sm:mt-2 sm:text-lg">
                                    {idol.stage_name} ·{' '}
                                    <Link
                                        href={route(
                                            'groups.show',
                                            idol.group.slug,
                                        )}
                                        className="text-purple-400 hover:underline"
                                    >
                                        {idol.group.name}
                                    </Link>
                                </p>
                                <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                                    {idol.position
                                        ?.split(',')
                                        .map((position) => (
                                            <span
                                                key={position}
                                                className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:px-3"
                                            >
                                                {position.trim()}
                                            </span>
                                        ))}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex w-full gap-2 sm:w-auto">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsFollowing(!isFollowing)}
                                className={`flex flex-1 items-center justify-center rounded-full px-4 py-2 text-sm font-medium shadow-lg transition-all duration-200 sm:flex-none sm:px-6 ${
                                    isFollowing
                                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                                        : 'bg-white text-purple-600 hover:bg-gray-100'
                                }`}
                            >
                                {isFollowing ? (
                                    <HeartIconSolid className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                ) : (
                                    <HeartIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                )}
                                <span className="text-xs sm:text-sm">
                                    {isFollowing ? 'Following' : 'Follow'}
                                </span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="rounded-full bg-white/10 p-2 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-white/20 active:bg-white/30"
                            >
                                <ShareIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

import { Idol } from '@/types/models';
import { SpotifyArtistInformationResponse } from '@/types/spotify';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import { HeartIcon, ShareIcon, StarIcon, UsersIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const statsItems = [
    {
        icon: HeartIcon,
        getValue: (info: SpotifyArtistInformationResponse) =>
            `${info?.followers?.total ? (info.followers.total / 1000000).toFixed(1) : '0'}M Fans`,
        delay: 0.6,
    },
    {
        icon: StarIcon,
        getValue: (info: SpotifyArtistInformationResponse) =>
            `${info?.popularity || 0} Popularity`,
        delay: 0.7,
    },
    {
        icon: UsersIcon,
        getValue: (_: SpotifyArtistInformationResponse, idol: Idol) =>
            `${idol.followers_count || 0} Followers`,
        delay: 0.8,
    },
];

export default function IdolProfileHeroSection({
    idol,
    artistInformation,
}: {
    idol: Idol;
    artistInformation: SpotifyArtistInformationResponse | null;
}) {
    const { auth } = usePage().props;
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isFollowing, setIsFollowing] = useState(
        auth.user
            ? idol.followers.some(
                  (follower) => follower.user_id === auth.user.id,
              )
            : false,
    );
    const [isLoading, setIsLoading] = useState(false);

    const debouncedFollow = useCallback(() => {
        return debounce((idolId: number) => {
            setIsLoading(true);
            axios
                .post('/follow', { type: 'idol', idol_id: idolId })
                .then(() => {
                    setIsFollowing(true);
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsLoading(false);
                });
        }, 500);
    }, []);

    const debouncedUnfollow = useCallback(() => {
        return debounce((idolId: number) => {
            setIsLoading(true);
            axios
                .post('/unfollow', { type: 'idol', idol_id: idolId })
                .then(() => {
                    setIsFollowing(false);
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsLoading(false);
                });
        }, 500);
    }, []);

    useEffect(() => {
        const followFn = debouncedFollow();
        const unfollowFn = debouncedUnfollow();

        return () => {
            followFn.cancel();
            unfollowFn.cancel();
        };
    }, [debouncedFollow, debouncedUnfollow]);

    const handleFollowClick = () => {
        if (isLoading) return;
        if (isFollowing) {
            debouncedUnfollow()(idol.id);
        } else {
            debouncedFollow()(idol.id);
        }
    };

    const getButtonText = () => {
        if (isLoading) return isFollowing ? 'Unfollowing...' : 'Following...';
        return isFollowing ? 'Unfollow' : 'Follow';
    };

    return (
        <section className="relative mb-16 h-[40vh] min-h-[300px] overflow-hidden sm:mb-20 sm:h-[45vh] sm:min-h-[350px] lg:h-[50vh]">
            {/* Background Image with Improved Loading */}
            <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                {!imageLoaded && (
                    <motion.div
                        className="h-full w-full animate-pulse bg-gradient-to-br from-purple-900 to-pink-900"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                )}
                <img
                    src={idol.background_image.url}
                    alt={idol.name}
                    className={`h-full w-full object-cover transition-all duration-700 ${
                        imageLoaded ? 'scale-100 blur-0' : 'scale-110 blur-lg'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent backdrop-blur-[2px]" />
            </motion.div>

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-4 pb-8 sm:p-6 sm:pb-10 lg:p-8 lg:pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-auto max-w-7xl"
                >
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
                        {/* Profile Info */}
                        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-white/90 ring-offset-2 ring-offset-black/50 transition-all duration-300 hover:ring-purple-400 sm:h-28 sm:w-28 lg:h-36 lg:w-36"
                            >
                                <img
                                    src={artistInformation?.images[0].url}
                                    alt={idol.name}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </motion.div>

                            <div className="max-w-xl">
                                <motion.span
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex rounded-full bg-purple-600/80 px-3 py-0.5 text-xs font-medium text-white backdrop-blur-sm sm:px-4 sm:py-1 sm:text-sm"
                                >
                                    {idol.group.name} Member
                                </motion.span>
                                <motion.h1
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="mt-1.5 text-xl font-bold text-white sm:mt-2 sm:text-2xl lg:text-3xl"
                                >
                                    {artistInformation?.name}
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="mt-1 text-sm text-gray-300 sm:text-base lg:text-lg"
                                >
                                    {idol.stage_name} · Debut{' '}
                                    {new Date(idol.debute_date).getFullYear()}
                                </motion.p>

                                {/* Position Tags */}
                                <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
                                    {idol.position
                                        ?.split(',')
                                        .map((position, index) => (
                                            <motion.span
                                                key={position}
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.8,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                transition={{
                                                    delay: 0.5 + index * 0.1,
                                                }}
                                                className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:px-3 sm:py-1"
                                            >
                                                {position.trim()}
                                            </motion.span>
                                        ))}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons with Enhanced Styling */}
                        <div className="flex w-full gap-2 sm:w-auto">
                            {auth.user && (
                                <motion.button
                                    whileHover={{ scale: isLoading ? 1 : 1.05 }}
                                    whileTap={{ scale: isLoading ? 1 : 0.95 }}
                                    onClick={handleFollowClick}
                                    disabled={isLoading}
                                    className={`group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full px-4 py-2 text-sm font-medium shadow-lg transition-all duration-300 sm:flex-none sm:px-6 sm:py-2.5 ${
                                        isFollowing
                                            ? 'bg-purple-600 text-white hover:bg-purple-700'
                                            : 'bg-white text-purple-600 hover:bg-gray-100'
                                    } ${isLoading ? 'cursor-not-allowed opacity-75' : ''}`}
                                >
                                    <HeartIcon
                                        className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 sm:h-5 sm:w-5 ${
                                            isFollowing
                                                ? 'text-white'
                                                : 'text-purple-600'
                                        }`}
                                    />
                                    <span className="text-xs sm:text-sm">
                                        {getButtonText()}
                                    </span>
                                </motion.button>
                            )}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group rounded-full bg-white/10 p-2 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/20 active:bg-white/30 sm:p-2.5"
                            >
                                <ShareIcon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 sm:h-5 sm:w-5" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Stats with Consistent Styling */}
                    <div className="mt-4 flex flex-wrap gap-4 sm:mt-6">
                        {statsItems.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: stat.delay }}
                                className="flex items-center gap-2 text-sm text-white/90 transition-colors duration-300 hover:text-white sm:text-base"
                            >
                                <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span>
                                    {stat.getValue(artistInformation!, idol)}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

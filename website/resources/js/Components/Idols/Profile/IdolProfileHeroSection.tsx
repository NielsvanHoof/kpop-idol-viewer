import { Idol } from '@/types/models';
import { SpotifyArtistInformationResponse } from '@/types/spotify';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import {
    CheckIcon,
    FacebookIcon,
    HeartIcon,
    LinkIcon,
    ShareIcon,
    StarIcon,
    TwitterIcon,
    UsersIcon,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const statsItems = [
    {
        icon: HeartIcon,
        getValue: (info: SpotifyArtistInformationResponse) =>
            `${info?.followers?.total ? (info.followers.total / 1000000).toFixed(1) : '0'}M Fans`,
        color: 'text-red-400',
    },
    {
        icon: StarIcon,
        getValue: (info: SpotifyArtistInformationResponse) =>
            `${info?.popularity || 0} Popularity`,
        color: 'text-amber-400',
    },
    {
        icon: UsersIcon,
        getValue: (_: SpotifyArtistInformationResponse, idol: Idol) =>
            `${idol.followers_count || 0} Followers`,
        color: 'text-purple-400',
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
    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
    const [showCopiedToast, setShowCopiedToast] = useState(false);

    const debouncedFollow = useCallback(() => {
        return debounce((idolId: number) => {
            setIsLoading(true);
            axios
                .post(route('follow'), { type: 'idol', id: idolId })
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
                .post(route('unfollow'), { type: 'idol', id: idolId })
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

    const handleShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: `${artistInformation?.name || idol.name} - K-pop Idol Profile`,
                    text: `Check out ${artistInformation?.name || idol.name}'s amazing profile on K-pop Idol Viewer! 🎵✨`,
                    url: window.location.href,
                })
                .catch((error) => {
                    console.error('Error sharing:', error);
                    setIsShareDialogOpen(true);
                });
        } else {
            setIsShareDialogOpen(true);
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setShowCopiedToast(true);
            setTimeout(() => setShowCopiedToast(false), 2000);
        });
    };

    const shareButtons = [
        {
            name: 'Copy Link',
            icon: LinkIcon,
            onClick: handleCopyLink,
            className: 'bg-gray-500 hover:bg-gray-600',
        },
        {
            name: 'Share on X',
            icon: TwitterIcon,
            onClick: () => {
                const text = `Check out ${artistInformation?.name || idol.name}'s amazing profile on K-pop Idol Viewer! 🎵✨`;
                const url = window.location.href;
                window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        text,
                    )}&url=${encodeURIComponent(url)}`,
                    '_blank',
                );
            },
            className: 'bg-black hover:bg-gray-900',
        },
        {
            name: 'Share on Facebook',
            icon: FacebookIcon,
            onClick: () => {
                window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        window.location.href,
                    )}`,
                    '_blank',
                );
            },
            className: 'bg-blue-600 hover:bg-blue-700',
        },
    ];

    return (
        <section className="relative mb-16 h-[40vh] min-h-[300px] overflow-hidden sm:mb-20 sm:h-[45vh] sm:min-h-[350px] lg:h-[50vh]">
            {/* Share Dialog */}
            <Dialog
                open={isShareDialogOpen}
                onClose={() => setIsShareDialogOpen(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
                        <DialogTitle className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                            Share {artistInformation?.name || idol.name}'s
                            Profile
                        </DialogTitle>
                        <div className="mt-4">
                            <div className="grid grid-cols-3 gap-3">
                                {shareButtons.map((button) => (
                                    <button
                                        key={button.name}
                                        onClick={() => {
                                            button.onClick();
                                            if (button.name !== 'Copy Link') {
                                                setIsShareDialogOpen(false);
                                            }
                                        }}
                                        className={`flex flex-col items-center gap-2 rounded-xl p-4 text-white transition-all hover:scale-105 ${button.className}`}
                                    >
                                        <button.icon className="h-6 w-6" />
                                        <span className="text-xs font-medium">
                                            {button.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Copied Toast */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                                opacity: showCopiedToast ? 1 : 0,
                                y: showCopiedToast ? 0 : 10,
                            }}
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 transform"
                        >
                            <div className="flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white">
                                <CheckIcon className="h-4 w-4 text-green-500" />
                                Copied to clipboard!
                            </div>
                        </motion.div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Background Image with Improved Loading */}
            <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
            >
                {!imageLoaded && (
                    <motion.div
                        className="h-full w-full animate-pulse bg-gradient-to-br from-gray-900 to-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                )}
                <img
                    src={
                        idol.background_image.url ||
                        'https://placehold.co/600x400'
                    }
                    alt={idol.name}
                    className={`h-full w-full object-cover transition-all duration-1000 ${
                        imageLoaded ? 'scale-100 blur-0' : 'scale-110 blur-lg'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent backdrop-blur-[1px]" />
            </motion.div>

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-6 pb-10 sm:p-8 sm:pb-12 lg:p-10 lg:pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mx-auto max-w-7xl"
                >
                    <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
                        {/* Profile Info */}
                        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative h-24 w-24 overflow-hidden rounded-2xl bg-white/10 p-1 backdrop-blur-xl transition-all duration-300 sm:h-32 sm:w-32 lg:h-40 lg:w-40"
                            >
                                <img
                                    src={artistInformation?.images[0].url}
                                    alt={idol.name}
                                    className="h-full w-full rounded-xl object-cover"
                                />
                            </motion.div>

                            <div className="max-w-xl space-y-3">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="inline-flex rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-white backdrop-blur-xl transition-colors hover:bg-white/20"
                                >
                                    {idol.group.name} Member
                                </motion.div>
                                <motion.h1
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
                                >
                                    {artistInformation?.name}
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="text-base text-white/80 sm:text-lg"
                                >
                                    {idol.stage_name} · Debut{' '}
                                    {new Date(idol.debute_date).getFullYear()}
                                </motion.p>

                                {/* Position Tags */}
                                <div className="flex flex-wrap gap-2">
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
                                                    delay: 0.7 + index * 0.1,
                                                }}
                                                className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white/90 backdrop-blur-xl transition-colors hover:bg-white/20"
                                            >
                                                {position.trim()}
                                            </motion.span>
                                        ))}
                                </div>
                                {artistInformation?.genres &&
                                    artistInformation.genres.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 }}
                                            className="mt-4 flex flex-wrap gap-2"
                                        >
                                            {artistInformation.genres.map(
                                                (genre, index) => (
                                                    <motion.span
                                                        key={genre}
                                                        initial={{
                                                            opacity: 0,
                                                            scale: 0.8,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            scale: 1,
                                                        }}
                                                        transition={{
                                                            delay:
                                                                0.9 +
                                                                index * 0.1,
                                                        }}
                                                        className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white/90 backdrop-blur-xl transition-colors hover:bg-white/20"
                                                    >
                                                        {genre}
                                                    </motion.span>
                                                ),
                                            )}
                                        </motion.div>
                                    )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex w-full gap-3 sm:w-auto">
                            {auth.user && (
                                <motion.button
                                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                                    onClick={handleFollowClick}
                                    disabled={isLoading}
                                    className={`group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl px-5 py-2.5 text-sm font-medium shadow-lg backdrop-blur-xl transition-all sm:flex-none sm:px-6 sm:py-3 ${
                                        isFollowing
                                            ? 'bg-purple-500/20 text-white hover:bg-purple-500/30'
                                            : 'bg-white/90 text-gray-900 hover:bg-white'
                                    } ${isLoading ? 'cursor-not-allowed opacity-75' : ''}`}
                                >
                                    <HeartIcon
                                        className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${
                                            isFollowing
                                                ? 'text-white'
                                                : 'text-purple-500'
                                        }`}
                                    />
                                    <span>{getButtonText()}</span>
                                </motion.button>
                            )}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleShare}
                                className="group rounded-xl bg-white/10 p-2.5 text-white shadow-lg backdrop-blur-xl transition-all hover:bg-white/20 sm:p-3"
                            >
                                <ShareIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-6 flex flex-wrap gap-6 sm:mt-8">
                        {statsItems.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                className="flex items-center gap-2"
                            >
                                <div className="rounded-full bg-white/10 p-2 backdrop-blur-xl">
                                    <stat.icon
                                        className={`h-4 w-4 ${stat.color}`}
                                    />
                                </div>
                                <span className="text-sm font-medium text-white/90 sm:text-base">
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

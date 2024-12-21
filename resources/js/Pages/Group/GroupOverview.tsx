import SEO from '@/Components/Common/SEO';
import EmptyState from '@/Components/State/EmptyState';
import { GROUP_FILTERS } from '@/Consts/GROUP_FILTERS';
import MainLayout from '@/Layouts/MainLayout';
import { Group, PaginatedResponse } from '@/types/models';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRightIcon,
    HeartIcon,
    MusicIcon,
    StarIcon,
    UsersIcon,
} from 'lucide-react';
import { useState } from 'react';

type Genre = (typeof GROUP_FILTERS)[number];

interface GroupOverviewProps {
    groups: PaginatedResponse<Group[]>;
}

export default function GroupOverview({ groups }: GroupOverviewProps) {
    const [selectedGenre, setSelectedGenre] = useState<Genre>('All');
    const [likedGroups, setLikedGroups] = useState<number[]>([]);

    const handleLike = (e: React.MouseEvent, groupId: number) => {
        e.preventDefault();
        e.stopPropagation();
        setLikedGroups((prev) =>
            prev.includes(groupId)
                ? prev.filter((id) => id !== groupId)
                : [...prev, groupId],
        );
    };

    return (
        <MainLayout>
            <SEO
                title="K-pop Groups | KPOP Project"
                description="Discover and explore popular K-pop groups and their music."
            />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-purple-600 px-4 py-24 text-white sm:px-6">
                {/* Background Decoration */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="animate-pulse-slow absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 blur-3xl">
                        <div className="animate-pulse-slow h-72 w-72 rounded-full bg-purple-500/20" />
                    </div>
                </div>

                <div className="relative mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                            <span className="h-2 w-2 rounded-full bg-purple-400" />
                            Browse Groups
                        </span>

                        <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                            Discover K-pop Groups
                        </h1>
                        <p className="mt-4 text-lg text-purple-100">
                            Explore the vibrant world of K-pop groups and their
                            amazing performances
                        </p>
                    </motion.div>

                    {/* Genre Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-12 flex flex-wrap justify-center gap-2"
                    >
                        {GROUP_FILTERS.map((genre, index) => (
                            <motion.button
                                key={genre}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow:
                                        '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedGenre(genre)}
                                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                                    selectedGenre === genre
                                        ? 'bg-white text-purple-600 shadow-lg'
                                        : 'bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20'
                                }`}
                            >
                                {genre}
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Groups Grid */}
            <section className="relative bg-white px-4 py-16 sm:px-6 sm:py-24 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl">
                    {groups.data.length === 0 ? (
                        <EmptyState
                            icon={
                                <UsersIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
                            }
                            title="No groups found"
                            message="Try selecting a different genre"
                        />
                    ) : (
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
                                layout
                            >
                                {groups.data.map((group) => (
                                    <motion.div
                                        key={group.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        whileHover={{ y: -5 }}
                                        className="group relative overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl hover:ring-purple-200 dark:bg-gray-800/90 dark:ring-gray-700 dark:hover:ring-purple-700"
                                    >
                                        <div className="relative aspect-video overflow-hidden">
                                            <img
                                                src={group.cover_photo.url}
                                                alt={group.name}
                                                className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-110"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                            {/* Like Button */}
                                            <button
                                                onClick={(e) =>
                                                    handleLike(e, group.id)
                                                }
                                                className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
                                            >
                                                <HeartIcon
                                                    className={`h-5 w-5 transition-colors ${
                                                        likedGroups.includes(
                                                            group.id,
                                                        )
                                                            ? 'text-red-500'
                                                            : 'text-gray-400 hover:text-red-500'
                                                    }`}
                                                />
                                            </button>
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                        {group.name}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                        K-pop Group
                                                    </p>
                                                </div>
                                                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                                                    {new Date(
                                                        group.debute_date,
                                                    ).getFullYear()}
                                                </span>
                                            </div>

                                            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                                <span className="flex items-center">
                                                    <UsersIcon className="mr-1 h-4 w-4" />
                                                    {group.idols_count} Members
                                                </span>
                                                <span className="flex items-center">
                                                    <MusicIcon className="mr-1 h-4 w-4" />
                                                    4 Albums
                                                </span>
                                            </div>

                                            <div className="mt-6 flex items-center justify-between">
                                                <div className="flex space-x-3">
                                                    <motion.span
                                                        whileHover={{
                                                            scale: 1.1,
                                                        }}
                                                        className="flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                                                    >
                                                        <HeartIcon className="mr-1 h-4 w-4 text-red-500" />
                                                        5
                                                    </motion.span>
                                                    <motion.span
                                                        whileHover={{
                                                            scale: 1.1,
                                                        }}
                                                        className="flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                                                    >
                                                        <StarIcon className="mr-1 h-4 w-4 text-yellow-500" />
                                                        4
                                                    </motion.span>
                                                </div>

                                                <Link
                                                    href={route(
                                                        'groups.show',
                                                        group.slug,
                                                    )}
                                                    className="inline-flex items-center rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-purple-700 hover:shadow-lg dark:bg-purple-700 dark:hover:bg-purple-600"
                                                >
                                                    View Group
                                                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}

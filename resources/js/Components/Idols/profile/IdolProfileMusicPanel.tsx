import EmptyState from '@/Components/State/EmptyState';
import { SpotifyAlbumsResponse } from '@/types/spotify';
import { TabPanel } from '@headlessui/react';
import { motion } from 'framer-motion';
import {
    CalendarIcon,
    HeartIcon,
    ListMusic,
    Music,
    PlayCircle,
    SparklesIcon,
    StarIcon,
} from 'lucide-react';
import { useState } from 'react';
import IdolProfileMusicFilter from './IdolProfileMusicFilters';

export default function IdolProfileMusicPanel({
    songs,
}: {
    songs: SpotifyAlbumsResponse | null;
}) {
    const [selectedType, setSelectedType] = useState<
        'all' | 'album' | 'single'
    >('all');

    const openSpotifyAlbum = (url: string) => {
        window.open(url, '_blank');
    };

    const filteredAlbums =
        songs?.items.filter((album) =>
            selectedType === 'all' ? true : album.album_type === selectedType,
        ) ?? [];

    const totalAlbums = songs?.items.filter(
        (a) => a.album_type === 'album',
    ).length;
    const totalSingles = songs?.items.filter(
        (a) => a.album_type === 'single',
    ).length;

    return (
        <TabPanel>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                {/* Main Content - Discography */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-8"
                >
                    <div className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Music className="h-5 w-5 text-purple-500" />
                                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                                    Discography
                                </h2>
                            </div>
                            <IdolProfileMusicFilter
                                selectedType={selectedType}
                                setSelectedType={setSelectedType}
                                totalAlbums={songs?.items.length ?? 0}
                            />
                        </div>

                        {/* Stats Grid */}
                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="rounded-lg bg-purple-50 p-3 text-center ring-1 ring-purple-100 sm:p-4 dark:bg-purple-900/10 dark:ring-purple-900/30"
                            >
                                <ListMusic className="mx-auto h-5 w-5 text-purple-600 sm:h-6 sm:w-6 dark:text-purple-400" />
                                <div className="mt-1.5 text-sm font-medium text-purple-600 sm:mt-2 dark:text-purple-400">
                                    {totalAlbums || 0} Albums
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="rounded-lg bg-purple-50 p-3 text-center ring-1 ring-purple-100 sm:p-4 dark:bg-purple-900/10 dark:ring-purple-900/30"
                            >
                                <StarIcon className="mx-auto h-5 w-5 text-purple-600 sm:h-6 sm:w-6 dark:text-purple-400" />
                                <div className="mt-1.5 text-sm font-medium text-purple-600 sm:mt-2 dark:text-purple-400">
                                    {totalSingles || 0} Singles
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="rounded-lg bg-purple-50 p-3 text-center ring-1 ring-purple-100 sm:p-4 dark:bg-purple-900/10 dark:ring-purple-900/30"
                            >
                                <HeartIcon className="mx-auto h-5 w-5 text-purple-600 sm:h-6 sm:w-6 dark:text-purple-400" />
                                <div className="mt-1.5 text-sm font-medium text-purple-600 sm:mt-2 dark:text-purple-400">
                                    {songs?.total || 0} Total
                                </div>
                            </motion.div>
                        </div>

                        {/* Album List */}
                        <div className="mt-6 space-y-4">
                            {songs && songs.items.length > 0 ? (
                                filteredAlbums.length > 0 ? (
                                    filteredAlbums.map((album, index) => (
                                        <motion.div
                                            key={album.id}
                                            transition={{ delay: index * 0.1 }}
                                            className="group relative flex gap-4 rounded-lg bg-gray-50 p-4 ring-1 ring-gray-200 transition-all hover:-translate-y-1 hover:shadow-md dark:bg-gray-800/50 dark:ring-gray-700"
                                        >
                                            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                                                <img
                                                    src={album.images[0]?.url}
                                                    alt={album.name}
                                                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                                                />
                                                <button
                                                    onClick={() =>
                                                        openSpotifyAlbum(
                                                            album.external_urls
                                                                .spotify,
                                                        )
                                                    }
                                                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                                >
                                                    <PlayCircle className="h-8 w-8 text-white" />
                                                </button>
                                            </div>

                                            <div className="flex flex-1 flex-col">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                                            {album.name}
                                                        </h3>
                                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                            {album.artists
                                                                .map(
                                                                    (artist) =>
                                                                        artist.name,
                                                                )
                                                                .join(', ')}
                                                        </p>
                                                    </div>
                                                    <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                                                        {album.album_type}
                                                    </span>
                                                </div>

                                                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <CalendarIcon className="h-4 w-4" />
                                                        {new Date(
                                                            album.release_date,
                                                        ).toLocaleDateString()}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <ListMusic className="h-4 w-4" />
                                                        {album.total_tracks}{' '}
                                                        tracks
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <EmptyState
                                        title={`No ${
                                            selectedType === 'all'
                                                ? 'releases'
                                                : selectedType + 's'
                                        } found`}
                                        message="Try adjusting your filters"
                                        icon={
                                            <Music className="mx-auto h-12 w-12 text-gray-400" />
                                        }
                                    />
                                )
                            ) : (
                                <EmptyState
                                    title="No music available"
                                    message="Check back later for new releases"
                                    icon={
                                        <Music className="mx-auto h-12 w-12 text-gray-400" />
                                    }
                                />
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Sidebar - Music Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-4"
                >
                    <div className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800">
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                            <SparklesIcon className="h-5 w-5 text-purple-500" />
                            Music Statistics
                        </h3>
                        <dl className="mt-4 space-y-4 sm:mt-6">
                            <div className="flex justify-between">
                                <dt className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <ListMusic className="h-4 w-4" />
                                    Total Releases
                                </dt>
                                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                    {songs?.items.length || 0}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <StarIcon className="h-4 w-4" />
                                    Latest Release
                                </dt>
                                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                    {songs?.items[0]?.release_date
                                        ? new Date(
                                              songs.items[0].release_date,
                                          ).toLocaleDateString()
                                        : 'N/A'}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <HeartIcon className="h-4 w-4" />
                                    Total Tracks
                                </dt>
                                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                    {songs?.items.reduce(
                                        (acc, curr) => acc + curr.total_tracks,
                                        0,
                                    ) || 0}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </motion.div>
            </div>
        </TabPanel>
    );
}

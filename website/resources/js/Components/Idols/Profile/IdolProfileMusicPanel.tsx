import EmptyState from '@/Components/State/EmptyState';
import {
    SpotifyAlbumsResponse,
    SpotifyTopTracksResponse,
} from '@/types/spotify';
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

const musicStats = [
    {
        icon: ListMusic,
        label: 'Albums',
        getValue: (songs: SpotifyAlbumsResponse) =>
            `${songs.items.filter((a) => a.album_type === 'album').length} Albums`,
        color: 'bg-amber-500/90',
        iconColor: 'text-amber-100',
    },
    {
        icon: StarIcon,
        label: 'Singles',
        getValue: (songs: SpotifyAlbumsResponse) =>
            `${songs.items.filter((a) => a.album_type === 'single').length} Singles`,
        color: 'bg-purple-500/90',
        iconColor: 'text-purple-100',
    },
    {
        icon: HeartIcon,
        label: 'Total Releases',
        getValue: (songs: SpotifyAlbumsResponse) => `${songs.total} Total`,
        color: 'bg-pink-500/90',
        iconColor: 'text-pink-100',
    },
];

export default function IdolProfileMusicPanel({
    songs,
    topTracks,
}: {
    songs: SpotifyAlbumsResponse | null;
    topTracks: SpotifyTopTracksResponse | null;
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

    return (
        <TabPanel>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-8">
                {/* Main Content - Discography */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-8"
                >
                    <div className="overflow-hidden rounded-xl bg-white/80 p-4 shadow-lg backdrop-blur-xl transition-all hover:bg-white/90 sm:rounded-2xl sm:p-6 dark:bg-gray-800/80 dark:hover:bg-gray-800/90">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <motion.div
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3"
                            >
                                <div className="rounded-full bg-amber-500 p-2 sm:p-2.5">
                                    <Music className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-900 sm:text-2xl sm:text-xl dark:text-white">
                                    Discography
                                </h2>
                            </motion.div>
                            <IdolProfileMusicFilter
                                selectedType={selectedType}
                                setSelectedType={setSelectedType}
                                totalAlbums={songs?.items.length ?? 0}
                            />
                        </div>

                        {/* Music Grid */}
                        <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                            {songs ? (
                                filteredAlbums.length > 0 ? (
                                    filteredAlbums.map((album, index) => (
                                        <motion.div
                                            key={album.id}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            onClick={() =>
                                                openSpotifyAlbum(
                                                    album.external_urls.spotify,
                                                )
                                            }
                                            className="group relative overflow-hidden rounded-lg bg-white/50 p-3 shadow-lg backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/60 hover:shadow-xl sm:rounded-xl sm:p-4 dark:bg-gray-800/50 dark:hover:bg-gray-800/60"
                                        >
                                            <div className="relative z-10 flex gap-3 sm:gap-4">
                                                <div className="xs:h-24 xs:w-24 relative aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-lg shadow-md sm:h-32 sm:w-32 sm:rounded-xl">
                                                    <img
                                                        src={
                                                            album.images[0].url
                                                        }
                                                        alt={album.name}
                                                        className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100">
                                                        <PlayCircle className="h-6 w-6 text-white sm:h-8 sm:w-8" />
                                                    </div>
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                                        <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-base dark:text-white">
                                                            {album.name}
                                                        </h3>
                                                        <span className="inline-flex whitespace-nowrap rounded-lg bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-600 backdrop-blur-sm transition-colors hover:bg-amber-500/20 sm:rounded-xl sm:px-3 dark:text-amber-400">
                                                            {album.album_type}
                                                        </span>
                                                    </div>

                                                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-600 sm:mt-2 sm:gap-3 dark:text-gray-400">
                                                        <span className="flex items-center gap-1">
                                                            <CalendarIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                                            {new Date(
                                                                album.release_date,
                                                            ).toLocaleDateString()}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <ListMusic className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                                            {album.total_tracks}{' '}
                                                            tracks
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <EmptyState
                                        title={`No ${selectedType === 'all' ? 'releases' : selectedType + 's'} found`}
                                        message="Try adjusting your filters"
                                        icon={
                                            <Music className="mx-auto h-10 w-10 text-amber-400 sm:h-12 sm:w-12" />
                                        }
                                    />
                                )
                            ) : (
                                <EmptyState
                                    title="No music available"
                                    message="Check back later for updates"
                                    icon={
                                        <Music className="mx-auto h-10 w-10 text-amber-400 sm:h-12 sm:w-12" />
                                    }
                                />
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Sidebar - Music Stats */}
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-4"
                >
                    <div className="overflow-hidden rounded-xl bg-white/80 p-4 shadow-lg backdrop-blur-xl transition-all hover:bg-white/90 sm:rounded-2xl sm:p-6 dark:bg-gray-800/80 dark:hover:bg-gray-800/90">
                        <div className="flex items-center gap-3">
                            <div className="rounded-full bg-amber-500 p-2 sm:p-2.5">
                                <SparklesIcon className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                            </div>
                            <h3 className="text-base font-semibold text-gray-900 sm:text-lg dark:text-white">
                                Music Stats
                            </h3>
                        </div>

                        <div className="xs:grid-cols-2 mt-4 grid grid-cols-1 gap-3 sm:mt-6 lg:grid-cols-1">
                            {songs &&
                                musicStats.map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`group relative overflow-hidden rounded-lg sm:rounded-xl ${stat.color} p-3 shadow-lg backdrop-blur-md transition-all hover:shadow-xl sm:p-4`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-full bg-white/10 p-1.5 backdrop-blur-xl sm:p-2">
                                                <stat.icon
                                                    className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.iconColor}`}
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-white sm:text-base">
                                                    {stat.label}
                                                </h3>
                                                <p className="mt-0.5 text-xs text-white/90 sm:mt-1 sm:text-sm">
                                                    {stat.getValue(songs)}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </TabPanel>
    );
}

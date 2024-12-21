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

const musicStats = [
    {
        icon: ListMusic,
        label: 'Albums',
        getValue: (songs: SpotifyAlbumsResponse) =>
            `${songs.items.filter((a) => a.album_type === 'album').length} Albums`,
        color: 'bg-purple-600',
    },
    {
        icon: StarIcon,
        label: 'Singles',
        getValue: (songs: SpotifyAlbumsResponse) =>
            `${songs.items.filter((a) => a.album_type === 'single').length} Singles`,
        color: 'bg-blue-600',
    },
    {
        icon: HeartIcon,
        label: 'Total Releases',
        getValue: (songs: SpotifyAlbumsResponse) => `${songs.total} Total`,
        color: 'bg-pink-600',
    },
];

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

    return (
        <TabPanel>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                {/* Main Content - Discography */}
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-8"
                >
                    <div className="overflow-hidden rounded-xl bg-white/80 p-4 shadow-lg ring-1 ring-purple-200/50 backdrop-blur-md transition-all hover:shadow-xl sm:p-6 dark:bg-gray-800/80 dark:ring-purple-800/50">
                        <div className="flex items-center justify-between">
                            <motion.div
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2"
                            >
                                <Music className="h-5 w-5 text-purple-500" />
                                <h2 className="text-xl font-bold text-purple-600 sm:text-2xl dark:text-purple-400">
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
                        <div className="mt-6 space-y-4">
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
                                            className="group relative overflow-hidden rounded-lg bg-white p-4 shadow-md ring-1 ring-purple-100 transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800 dark:ring-purple-900/30"
                                        >
                                            <div className="relative z-10 flex gap-4">
                                                <div className="relative aspect-square h-24 w-24 shrink-0 overflow-hidden rounded-lg sm:h-32 sm:w-32">
                                                    <img
                                                        src={
                                                            album.images[0].url
                                                        }
                                                        alt={album.name}
                                                        className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                                                        <PlayCircle className="h-8 w-8 text-white" />
                                                    </div>
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                                            {album.name}
                                                        </h3>
                                                        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-600 backdrop-blur-sm transition-colors hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400">
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
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <EmptyState
                                        title={`No ${selectedType === 'all' ? 'releases' : selectedType + 's'} found`}
                                        message="Try adjusting your filters"
                                        icon={
                                            <Music className="mx-auto h-12 w-12 text-purple-400" />
                                        }
                                    />
                                )
                            ) : (
                                <EmptyState
                                    title="No music available"
                                    message="Check back later for updates"
                                    icon={
                                        <Music className="mx-auto h-12 w-12 text-purple-400" />
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
                    <div className="overflow-hidden rounded-xl bg-white/80 p-4 shadow-lg ring-1 ring-purple-200/50 backdrop-blur-md transition-all hover:shadow-xl sm:p-6 dark:bg-gray-800/80 dark:ring-purple-800/50">
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-purple-600 dark:text-purple-400">
                            <SparklesIcon className="h-5 w-5 text-purple-500" />
                            Music Stats
                        </h3>

                        <div className="mt-6 grid grid-cols-1 gap-4">
                            {songs &&
                                musicStats.map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group relative overflow-hidden rounded-lg bg-white p-4 shadow-md ring-1 ring-purple-100 transition-all hover:shadow-lg dark:bg-gray-800 dark:ring-purple-900/30"
                                    >
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-2">
                                                <stat.icon className="h-5 w-5 text-white" />
                                                <h3 className="font-medium text-white">
                                                    {stat.label}
                                                </h3>
                                            </div>
                                            <p className="mt-2 text-sm text-white">
                                                {stat.getValue(songs)}
                                            </p>
                                        </div>
                                        <div
                                            className={`absolute inset-0 ${stat.color} opacity-90 transition-opacity duration-300 group-hover:opacity-100`}
                                        />
                                    </motion.div>
                                ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </TabPanel>
    );
}

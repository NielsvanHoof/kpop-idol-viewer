import EmptyState from '@/Components/State/EmptyState';
import {
    SpotifyAlbumsResponse,
    SpotifyArtistInformationResponse,
} from '@/types/spotify';
import { TabPanel } from '@headlessui/react';
import { motion, Variants } from 'framer-motion';
import {
    GlobeIcon,
    HeadphonesIcon,
    PlayCircleIcon,
    TrendingUpIcon,
} from 'lucide-react';

interface GroupProfileDiscoveryPanelProps {
    songs: SpotifyAlbumsResponse | null;
    artistInformation: SpotifyArtistInformationResponse | null;
}

const itemVariants: Variants = {
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export default function GroupProfileDiscoveryPanel({
    songs,
    artistInformation,
}: GroupProfileDiscoveryPanelProps) {
    const streamingStats = [
        {
            platform: 'Spotify',
            icon: HeadphonesIcon,
            value: artistInformation?.followers?.total
                ? `${(artistInformation.followers.total / 1000000).toFixed(1)}M`
                : 'N/A',
            label: 'Monthly Listeners',
            color: 'text-green-600',
            bg: 'bg-green-50/80',
            ring: 'ring-green-200/50',
            darkColor: 'dark:text-green-400',
            darkBg: 'dark:bg-green-900/10',
            darkRing: 'dark:ring-green-900/30',
        },
    ];

    const albums =
        songs?.items?.filter((item) => item.album_type === 'album') || [];

    return (
        <TabPanel>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                {/* Main Content */}
                <div className="space-y-6 lg:col-span-8">
                    {/* Albums Section */}
                    <motion.div
                        variants={itemVariants}
                        className="overflow-hidden rounded-2xl bg-white/80 p-4 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl transition-all duration-300 hover:bg-white/90 sm:p-6 dark:bg-gray-800/80 dark:ring-gray-700/50 dark:hover:bg-gray-800/90"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <PlayCircleIcon className="h-5 w-5 text-purple-500" />
                                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                                    Albums
                                </h2>
                            </div>
                            <span className="rounded-xl bg-purple-100/80 px-3 py-1 text-xs font-medium text-purple-600 backdrop-blur-sm dark:bg-purple-900/30 dark:text-purple-400">
                                {albums.length} Albums
                            </span>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {albums.map((album) => (
                                <motion.div
                                    key={album.id}
                                    variants={itemVariants}
                                    className="group flex gap-4 overflow-hidden rounded-xl bg-gray-50/80 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-gray-100/80 dark:bg-gray-900/50 dark:hover:bg-gray-900/80"
                                >
                                    <img
                                        src={album.images[0]?.url}
                                        alt={album.name}
                                        className="h-24 w-24 rounded-xl object-cover shadow-sm ring-1 ring-gray-200/50 transition-transform duration-300 group-hover:scale-105 dark:ring-gray-700/50"
                                    />
                                    <div>
                                        <h3 className="font-medium text-gray-900 transition-colors duration-300 group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                                            {album.name}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                            {new Date(
                                                album.release_date,
                                            ).getFullYear()}
                                        </p>
                                        <a
                                            href={album.external_urls.spotify}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 inline-flex items-center gap-1 rounded-lg bg-purple-600/90 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-purple-700 dark:bg-purple-700/90 dark:hover:bg-purple-600"
                                        >
                                            Listen on Spotify
                                            <TrendingUpIcon className="h-4 w-4" />
                                        </a>
                                    </div>
                                </motion.div>
                            ))}

                            {albums.length === 0 && (
                                <EmptyState
                                    title="No albums yet"
                                    message="Check back later for updates"
                                    icon={
                                        <PlayCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    }
                                />
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Sidebar Content */}
                <div className="space-y-6 lg:col-span-4">
                    {/* Streaming Stats */}
                    <motion.div
                        variants={itemVariants}
                        className="overflow-hidden rounded-2xl bg-white/80 p-4 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl transition-all duration-300 hover:bg-white/90 sm:p-6 dark:bg-gray-800/80 dark:ring-gray-700/50 dark:hover:bg-gray-800/90"
                    >
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                            <GlobeIcon className="h-5 w-5 text-purple-500" />
                            Streaming Stats
                        </h3>
                        <div className="mt-4 space-y-4">
                            {streamingStats.map((stat) => (
                                <div
                                    key={stat.platform}
                                    className={`group overflow-hidden rounded-xl ${stat.bg} ${stat.darkBg} p-4 ring-1 ${stat.ring} ${stat.darkRing} backdrop-blur-sm transition-all duration-300 hover:bg-opacity-100 dark:hover:bg-opacity-20`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <stat.icon
                                                className={`h-5 w-5 ${stat.color} ${stat.darkColor} transition-transform duration-300 group-hover:scale-110`}
                                            />
                                            <span
                                                className={`font-medium ${stat.color} ${stat.darkColor}`}
                                            >
                                                {stat.platform}
                                            </span>
                                        </div>
                                        <span
                                            className={`text-lg font-bold ${stat.color} ${stat.darkColor}`}
                                        >
                                            {stat.value}
                                        </span>
                                    </div>
                                    <p
                                        className={`mt-1 text-sm ${stat.color} ${stat.darkColor}`}
                                    >
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Spotify Attribution */}
                        <div className="mt-6 flex items-center justify-end space-x-2 text-xs text-gray-500 dark:text-gray-400">
                            <span>Powered by</span>
                            <a
                                href="https://spotify.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-1 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                            >
                                <svg
                                    className="h-4 w-4 transition-transform duration-300 hover:scale-110"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                </svg>
                                <span className="font-medium">Spotify</span>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </TabPanel>
    );
}

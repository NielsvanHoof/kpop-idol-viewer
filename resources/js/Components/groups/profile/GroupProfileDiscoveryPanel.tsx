import EmptyState from '@/Components/State/EmptyState';
import { Group } from '@/types/models';
import {
    SpotifyAlbumsResponse,
    SpotifyArtistInformationResponse,
} from '@/types/spotify';
import { TabPanel } from '@headlessui/react';
import { motion } from 'framer-motion';
import {
    GlobeIcon,
    HeadphonesIcon,
    PlayCircleIcon,
    TrendingUpIcon,
} from 'lucide-react';

interface GroupProfileDiscoveryPanelProps {
    group: Group;
    songs: SpotifyAlbumsResponse | null;
    artistInformation: SpotifyArtistInformationResponse | null;
}

export default function GroupProfileDiscoveryPanel({
    group,
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
            color: 'text-green-600 dark:text-green-400',
            bg: 'bg-green-50 dark:bg-green-900/10',
            ring: 'ring-green-100 dark:ring-green-900/30',
        },
    ];

    const albums =
        songs?.items?.filter((item) => item.album_type === 'album') || [];
    const singles =
        songs?.items?.filter((item) => item.album_type === 'single') || [];

    return (
        <TabPanel>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                {/* Main Content */}
                <div className="space-y-6 lg:col-span-8">
                    {/* Albums Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <PlayCircleIcon className="h-5 w-5 text-purple-500" />
                                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                                    Albums
                                </h2>
                            </div>
                            <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                                {albums.length} Albums
                            </span>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {albums.map((album) => (
                                <div
                                    key={album.id}
                                    className="flex gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-900"
                                >
                                    <img
                                        src={album.images[0]?.url}
                                        alt={album.name}
                                        className="h-24 w-24 rounded-md object-cover"
                                    />
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white">
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
                                            className="mt-2 inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                                        >
                                            Listen on Spotify
                                            <TrendingUpIcon className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800"
                    >
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                            <GlobeIcon className="h-5 w-5 text-purple-500" />
                            Streaming Stats
                        </h3>
                        <div className="mt-4 space-y-4">
                            {streamingStats.map((stat) => (
                                <div
                                    key={stat.platform}
                                    className={`rounded-lg ${stat.bg} p-4 ring-1 ${stat.ring}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <stat.icon
                                                className={`h-5 w-5 ${stat.color}`}
                                            />
                                            <span
                                                className={`font-medium ${stat.color}`}
                                            >
                                                {stat.platform}
                                            </span>
                                        </div>
                                        <span
                                            className={`text-lg font-bold ${stat.color}`}
                                        >
                                            {stat.value}
                                        </span>
                                    </div>
                                    <p className={`mt-1 text-sm ${stat.color}`}>
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
                                    className="h-4 w-4"
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

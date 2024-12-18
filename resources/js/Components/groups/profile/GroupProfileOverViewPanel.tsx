import EmptyState from '@/Components/State/EmptyState';
import { Group } from '@/types/models';
import { SpotifyAlbumsResponse } from '@/types/spotify';
import { TabPanel } from '@headlessui/react';
import { motion } from 'framer-motion';
import {
    GlobeIcon,
    HeartIcon,
    MusicIcon,
    SparklesIcon,
    StarIcon,
    TrendingUpIcon,
    TrophyIcon,
    UsersIcon,
} from 'lucide-react';
import { remark } from 'remark';

interface GroupProfileOverViewPanelProps {
    group: Group;
    songs: SpotifyAlbumsResponse | null;
}

export default function GroupProfileOverViewPanel({
    group,
    songs,
}: GroupProfileOverViewPanelProps) {
    const bio = remark().processSync(group.bio).toString();
    const hasSpotifyIntegration = !!group.spotify_id;

    const albumCount = hasSpotifyIntegration
        ? songs?.items?.filter((item) => item.album_type === 'album').length ||
          0
        : 0;

    const stats = [
        {
            icon: <UsersIcon />,
            label: 'Members',
            value: `${group.idols_count} Members`,
            color: 'text-blue-600 dark:text-blue-400',
            bg: 'bg-blue-50 dark:bg-blue-900/10',
            ring: 'ring-blue-100 dark:ring-blue-900/30',
        },
        {
            icon: <HeartIcon />,
            label: 'Fans',
            value: `${(group.followers.length / 1000000).toFixed(1)}M Fans`,
            color: 'text-pink-600 dark:text-pink-400',
            bg: 'bg-pink-50 dark:bg-pink-900/10',
            ring: 'ring-pink-100 dark:ring-pink-900/30',
        },
        {
            icon: <StarIcon />,
            label: 'Rating',
            value: `1.0 / 5.0`,
            color: 'text-yellow-600 dark:text-yellow-400',
            bg: 'bg-yellow-50 dark:bg-yellow-900/10',
            ring: 'ring-yellow-100 dark:ring-yellow-900/30',
        },
        {
            icon: <MusicIcon />,
            label: 'Albums',
            value: hasSpotifyIntegration ? `${albumCount} Albums` : 'No Data',
            color: 'text-purple-600 dark:text-purple-400',
            bg: 'bg-purple-50 dark:bg-purple-900/10',
            ring: 'ring-purple-100 dark:ring-purple-900/30',
        },
    ];

    const quickFacts = [
        {
            label: 'Debut Date',
            value: new Date(group.debute_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
        },
        { label: 'Agency', value: group.agency || 'N/A' },
        { label: 'Fandom Name', value: group.fandom_name || 'N/A' },
        { label: 'Group Type', value: group.type || 'N/A' },
        {
            label: 'Active Since',
            value: `${new Date(group.debute_date).getFullYear()} (${
                new Date().getFullYear() -
                new Date(group.debute_date).getFullYear()
            } years)`,
        },
        { label: 'Country', value: 'South Korea' },
    ];

    const latestRelease = songs?.items[0];

    const renderLatestReleaseSection = () => {
        if (!hasSpotifyIntegration) {
            return (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 lg:mt-8 dark:bg-gray-800 dark:ring-gray-800"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <MusicIcon className="h-5 w-5 text-purple-500" />
                            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                                Latest Release
                            </h2>
                        </div>
                    </div>

                    <EmptyState
                        title="No Spotify Integration"
                        message="Music information is not available as Spotify integration is not set up."
                        icon={
                            <MusicIcon className="mx-auto h-12 w-12 text-gray-400" />
                        }
                    />
                </motion.div>
            );
        }

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 lg:mt-8 dark:bg-gray-800 dark:ring-gray-800"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <MusicIcon className="h-5 w-5 text-purple-500" />
                        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                            Latest Release
                        </h2>
                    </div>
                    <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                        {albumCount} Total Albums
                    </span>
                </div>

                {latestRelease ? (
                    <div className="mt-4 flex gap-4 rounded-lg bg-purple-50 p-4 dark:bg-purple-900/10">
                        <img
                            src={latestRelease.images[0]?.url}
                            alt={latestRelease.name}
                            className="h-24 w-24 rounded-md object-cover"
                        />
                        <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                                {latestRelease.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Released{' '}
                                {new Date(
                                    latestRelease.release_date,
                                ).toLocaleDateString()}
                            </p>
                            <a
                                href={latestRelease.external_urls.spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                            >
                                Listen on Spotify
                                <TrendingUpIcon className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="mt-4 rounded-lg bg-purple-50 p-4 dark:bg-purple-900/10">
                        <p className="text-center text-sm text-purple-600 dark:text-purple-400">
                            No releases available
                        </p>
                    </div>
                )}
            </motion.div>
        );
    };

    return (
        <TabPanel>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                {/* Main Content */}
                <div className="lg:col-span-8">
                    {/* About Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800"
                    >
                        <div className="flex items-center gap-2">
                            <SparklesIcon className="h-5 w-5 text-purple-500" />
                            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                                About {group.name}
                            </h2>
                        </div>
                        <div
                            className="prose mt-4 max-w-none text-gray-600 dark:prose-invert sm:mt-6 dark:text-gray-400"
                            dangerouslySetInnerHTML={{
                                __html: bio,
                            }}
                        />

                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`rounded-lg ${stat.bg} p-3 text-center ring-1 ${stat.ring} sm:p-4`}
                                >
                                    {stat.icon}
                                    <div
                                        className={`mt-1.5 text-sm font-medium ${stat.color} sm:mt-2`}
                                    >
                                        {stat.value}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Latest Release Section */}
                    {renderLatestReleaseSection()}
                </div>

                {/* Rest of the component remains the same */}
                <div className="space-y-6 lg:col-span-4 lg:space-y-8">
                    {/* Quick Facts */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800"
                    >
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                            <TrophyIcon className="h-5 w-5 text-purple-500" />
                            Quick Facts
                        </h3>
                        <dl className="mt-4 space-y-4 sm:mt-6">
                            {quickFacts.map((fact, index) => (
                                <motion.div
                                    key={fact.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex justify-between border-b border-gray-100 pb-2 last:border-0 last:pb-0 dark:border-gray-700"
                                >
                                    <dt className="text-sm text-gray-600 dark:text-gray-400">
                                        {fact.label}
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                        {fact.value}
                                    </dd>
                                </motion.div>
                            ))}
                        </dl>
                    </motion.div>

                    {/* Social Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800"
                    >
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                            <GlobeIcon className="h-5 w-5 text-purple-500" />
                            Social Stats
                        </h3>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-900">
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {group.followers.length.toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Followers
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </TabPanel>
    );
}

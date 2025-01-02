import EmptyState from '@/Components/State/EmptyState';
import { Group } from '@/types/models';
import { SpotifyAlbumsResponse } from '@/types/spotify';
import { TabPanel } from '@headlessui/react';
import { motion, Variants } from 'framer-motion';
import {
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

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

const convertGroupTypeToTitle = (type: string) => {
    return type === 'girl_group' ? 'Girl Group' : 'Boy Group';
};

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
            icon: <UsersIcon className="h-6 w-6" />,
            label: 'Members',
            value: `${group.idols_count} Members`,
            color: 'text-blue-600',
            bg: 'bg-blue-50/80',
            ring: 'ring-blue-200/50',
            darkBg: 'dark:bg-blue-900/10',
            darkRing: 'dark:ring-blue-900/30',
        },
        {
            icon: <HeartIcon className="h-6 w-6" />,
            label: 'Fans',
            value: `${(group.followers.length / 1000000).toFixed(1)}M Fans`,
            color: 'text-pink-600',
            bg: 'bg-pink-50/80',
            ring: 'ring-pink-200/50',
            darkBg: 'dark:bg-pink-900/10',
            darkRing: 'dark:ring-pink-900/30',
        },
        {
            icon: <StarIcon className="h-6 w-6" />,
            label: 'Rating',
            value: `1.0 / 5.0`,
            color: 'text-yellow-600',
            bg: 'bg-yellow-50/80',
            ring: 'ring-yellow-200/50',
            darkBg: 'dark:bg-yellow-900/10',
            darkRing: 'dark:ring-yellow-900/30',
        },
        {
            icon: <MusicIcon className="h-6 w-6" />,
            label: 'Albums',
            value: hasSpotifyIntegration ? `${albumCount} Albums` : 'No Data',
            color: 'text-purple-600',
            bg: 'bg-purple-50/80',
            ring: 'ring-purple-200/50',
            darkBg: 'dark:bg-purple-900/10',
            darkRing: 'dark:ring-purple-900/30',
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
        {
            label: 'Group Type',
            value: convertGroupTypeToTitle(group.type) || 'N/A',
        },
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
                    className="mt-6 overflow-hidden rounded-2xl bg-white/80 p-4 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl transition-all duration-300 hover:bg-white/90 sm:p-6 lg:mt-8 dark:bg-gray-800/80 dark:ring-gray-700/50 dark:hover:bg-gray-800/90"
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
                className="mt-6 overflow-hidden rounded-2xl bg-white/80 p-4 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl transition-all duration-300 hover:bg-white/90 sm:p-6 lg:mt-8 dark:bg-gray-800/80 dark:ring-gray-700/50 dark:hover:bg-gray-800/90"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <MusicIcon className="h-5 w-5 text-purple-500" />
                        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                            Latest Release
                        </h2>
                    </div>
                    <span className="rounded-xl bg-purple-100/80 px-3 py-1 text-xs font-medium text-purple-600 backdrop-blur-sm dark:bg-purple-900/30 dark:text-purple-400">
                        {albumCount} Total Albums
                    </span>
                </div>

                {latestRelease ? (
                    <div className="mt-4 flex gap-4 overflow-hidden rounded-xl bg-purple-50/80 p-4 backdrop-blur-sm dark:bg-purple-900/10">
                        <img
                            src={latestRelease.images[0]?.url}
                            alt={latestRelease.name}
                            className="h-24 w-24 rounded-xl object-cover shadow-sm ring-1 ring-purple-200/50 dark:ring-purple-900/30"
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
                                className="mt-2 inline-flex items-center gap-1 rounded-lg bg-purple-600/90 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-purple-700 dark:bg-purple-700/90 dark:hover:bg-purple-600"
                            >
                                Listen on Spotify
                                <TrendingUpIcon className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="mt-4 rounded-xl bg-purple-50/80 p-4 backdrop-blur-sm dark:bg-purple-900/10">
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
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8"
            >
                {/* Main Content */}
                <div className="lg:col-span-8">
                    {/* About Section */}
                    <motion.div
                        variants={itemVariants}
                        className="overflow-hidden rounded-2xl bg-white/80 p-4 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl transition-all duration-300 hover:bg-white/90 sm:p-6 dark:bg-gray-800/80 dark:ring-gray-700/50 dark:hover:bg-gray-800/90"
                    >
                        <div className="flex items-center gap-2">
                            <SparklesIcon className="h-5 w-5 text-purple-500" />
                            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                                About {group.name}
                            </h2>
                        </div>
                        <div
                            className="prose mt-4 max-w-none text-gray-600 dark:prose-invert sm:mt-6 dark:text-gray-400"
                            dangerouslySetInnerHTML={{ __html: bio }}
                        />

                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                            {stats.map((stat) => (
                                <motion.div
                                    key={stat.label}
                                    variants={itemVariants}
                                    className={`group overflow-hidden rounded-2xl ${stat.bg} ${stat.darkBg} p-4 text-center ring-1 ${stat.ring} ${stat.darkRing} backdrop-blur-sm transition-all duration-300 hover:bg-opacity-100 dark:hover:bg-opacity-20`}
                                >
                                    <div
                                        className={`${stat.color} transition-transform duration-300 group-hover:scale-110`}
                                    >
                                        {stat.icon}
                                    </div>
                                    <div
                                        className={`mt-2 text-sm font-medium ${stat.color}`}
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

                {/* Quick Facts */}
                <div className="space-y-6 lg:col-span-4 lg:space-y-8">
                    <motion.div
                        variants={itemVariants}
                        className="overflow-hidden rounded-2xl bg-white/80 p-4 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl transition-all duration-300 hover:bg-white/90 sm:p-6 dark:bg-gray-800/80 dark:ring-gray-700/50 dark:hover:bg-gray-800/90"
                    >
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                            <TrophyIcon className="h-5 w-5 text-purple-500" />
                            Quick Facts
                        </h3>
                        <dl className="mt-4 space-y-4 sm:mt-6">
                            {quickFacts.map((fact) => (
                                <motion.div
                                    key={fact.label}
                                    variants={itemVariants}
                                    className="group flex justify-between border-b border-gray-100 pb-2 last:border-0 last:pb-0 dark:border-gray-700"
                                >
                                    <dt className="text-sm text-gray-600 transition-colors group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
                                        {fact.label}
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                        {fact.value}
                                    </dd>
                                </motion.div>
                            ))}
                        </dl>
                    </motion.div>
                </div>
            </motion.div>
        </TabPanel>
    );
}

import { Idol } from '@/types/models';
import {
    SpotifyAlbumsResponse,
    SpotifyArtistInformationResponse,
} from '@/types/spotify';
import { TabPanel } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    BookOpenIcon,
    CalendarIcon,
    HeartIcon,
    ListMusic,
    SparklesIcon,
    StarIcon,
    UserIcon,
} from 'lucide-react';
import { remark } from 'remark';

const statCards = [
    {
        icon: HeartIcon,
        label: 'Followers',
        value: (artistInfo: SpotifyArtistInformationResponse) =>
            `${artistInfo?.followers.total.toLocaleString()} Follower${artistInfo?.followers.total === 1 ? '' : 's'}`,
        color: 'bg-red-600',
    },
    {
        icon: StarIcon,
        label: 'Popularity',
        value: (artistInfo: SpotifyArtistInformationResponse) =>
            `${artistInfo?.popularity} Popularity`,
        color: 'bg-amber-600',
    },
    {
        icon: ListMusic,
        label: 'Songs',
        value: (
            artistInformation: SpotifyArtistInformationResponse,
            songs: SpotifyAlbumsResponse,
        ) => `${songs?.total ?? 0} Songs`,
        color: 'bg-purple-600',
    },
    {
        icon: CalendarIcon,
        label: 'Birth Year',
        value: (
            artistInformation: SpotifyArtistInformationResponse,
            songs: SpotifyAlbumsResponse,
            idol: Idol,
        ) => new Date(idol.birth_date).getFullYear(),
        color: 'bg-emerald-600',
    },
];

export default function IdolProfileOverViewPanel({
    idol,
    songs,
    artistInformation,
}: {
    idol: Idol;
    songs: SpotifyAlbumsResponse | null;
    artistInformation: SpotifyArtistInformationResponse | null;
}) {
    const bio = remark().processSync(idol.bio).toString();

    return (
        <TabPanel>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                {/* Main Content - Biography */}
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-8"
                >
                    <div className="overflow-hidden rounded-xl bg-white/80 p-4 shadow-lg ring-1 ring-purple-200/50 backdrop-blur-md transition-all hover:shadow-xl sm:p-6 dark:bg-gray-800/80 dark:ring-purple-800/50">
                        <motion.div
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2"
                        >
                            <BookOpenIcon className="h-5 w-5 text-purple-500" />
                            <h2 className="text-xl font-bold text-purple-600 sm:text-2xl dark:text-purple-400">
                                Biography
                            </h2>
                        </motion.div>

                        <motion.div
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="prose mt-4 max-w-none text-gray-600 dark:prose-invert sm:mt-6 dark:text-gray-400"
                            dangerouslySetInnerHTML={{
                                __html: bio,
                            }}
                        />

                        {/* Stats Grid */}
                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                            {statCards.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative overflow-hidden rounded-lg bg-white p-3 text-center shadow-md ring-1 ring-purple-100 transition-all hover:shadow-lg sm:p-4 dark:bg-gray-800 dark:ring-purple-900/30"
                                >
                                    <div className="relative z-10">
                                        <stat.icon className="mx-auto h-5 w-5 text-white sm:h-6 sm:w-6" />
                                        <div className="mt-1.5 text-sm font-medium text-white sm:mt-2">
                                            {stat.value(
                                                artistInformation!,
                                                songs!,
                                                idol,
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className={`absolute inset-0 ${stat.color} opacity-90 transition-opacity duration-300 group-hover:opacity-100`}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Sidebar - Quick Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-4"
                >
                    <div className="overflow-hidden rounded-xl bg-white/80 p-4 shadow-lg ring-1 ring-purple-200/50 backdrop-blur-md transition-all hover:shadow-xl sm:p-6 dark:bg-gray-800/80 dark:ring-purple-800/50">
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-purple-600 dark:text-purple-400">
                            <SparklesIcon className="h-5 w-5 text-purple-500" />
                            Quick Stats
                        </h3>
                        <dl className="mt-4 space-y-4 sm:mt-6">
                            <div className="flex justify-between">
                                <dt className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <CalendarIcon className="h-4 w-4" />
                                    Birth Date
                                </dt>
                                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                    {new Date(
                                        idol.birth_date,
                                    ).toLocaleDateString()}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <StarIcon className="h-4 w-4" />
                                    Debut Date
                                </dt>
                                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                    {new Date(
                                        idol.debute_date,
                                    ).toLocaleDateString()}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <UserIcon className="h-4 w-4" />
                                    Position
                                </dt>
                                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                    {idol.position}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <SparklesIcon className="h-4 w-4" />
                                    Group
                                </dt>
                                <dd className="text-sm font-medium text-purple-600 dark:text-purple-400">
                                    <Link
                                        href={route('groups.show', {
                                            group: idol.group,
                                        })}
                                    >
                                        {idol.group.name}
                                    </Link>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </motion.div>
            </div>
        </TabPanel>
    );
}

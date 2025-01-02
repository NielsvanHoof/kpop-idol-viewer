import CommentSection from '@/Components/Common/CommentSection';
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
        color: 'bg-red-500/90',
        iconColor: 'text-white',
    },
    {
        icon: StarIcon,
        label: 'Popularity',
        value: (artistInfo: SpotifyArtistInformationResponse) =>
            `${artistInfo?.popularity} Popularity`,
        color: 'bg-amber-500/90',
        iconColor: 'text-white',
    },
    {
        icon: ListMusic,
        label: 'Songs',
        value: (
            artistInformation: SpotifyArtistInformationResponse,
            songs: SpotifyAlbumsResponse,
        ) => `${songs?.total ?? 0} Songs`,
        color: 'bg-purple-500/90',
        iconColor: 'text-white',
    },
    {
        icon: CalendarIcon,
        label: 'Birth Year',
        value: (
            artistInformation: SpotifyArtistInformationResponse,
            songs: SpotifyAlbumsResponse,
            idol: Idol,
        ) => new Date(idol.birth_date).getFullYear(),
        color: 'bg-emerald-500/90',
        iconColor: 'text-white',
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
                    <div className="overflow-hidden rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all hover:bg-white/90 dark:bg-gray-800/80 dark:hover:bg-gray-800/90">
                        <motion.div
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3"
                        >
                            <div className="rounded-full bg-purple-500 p-2.5">
                                <BookOpenIcon className="h-5 w-5 text-white" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                                Biography
                            </h2>
                        </motion.div>

                        <motion.div
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="prose mt-6 max-w-none text-gray-600 dark:prose-invert dark:text-gray-300"
                            dangerouslySetInnerHTML={{
                                __html: bio,
                            }}
                        />

                        {/* Stats Grid */}
                        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {statCards.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`group relative overflow-hidden rounded-2xl ${stat.color} p-4 shadow-lg backdrop-blur-md transition-all hover:shadow-xl`}
                                >
                                    <div className="relative z-10 text-center">
                                        <stat.icon
                                            className={`mx-auto h-6 w-6 ${stat.iconColor}`}
                                        />
                                        <div className="mt-2 text-sm font-medium text-white">
                                            {stat.value(
                                                artistInformation!,
                                                songs!,
                                                idol,
                                            )}
                                        </div>
                                    </div>
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
                    <div className="overflow-hidden rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all hover:bg-white/90 dark:bg-gray-800/80 dark:hover:bg-gray-800/90">
                        <h3 className="flex items-center gap-3">
                            <div className="rounded-full bg-purple-500 p-2.5">
                                <SparklesIcon className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                Quick Stats
                            </span>
                        </h3>
                        <dl className="mt-6 space-y-3">
                            {[
                                {
                                    icon: CalendarIcon,
                                    label: 'Birth Date',
                                    value: new Date(
                                        idol.birth_date,
                                    ).toLocaleDateString(),
                                },
                                {
                                    icon: StarIcon,
                                    label: 'Debut Date',
                                    value: new Date(
                                        idol.debute_date,
                                    ).toLocaleDateString(),
                                },
                                {
                                    icon: UserIcon,
                                    label: 'Position',
                                    value: idol.position,
                                },
                                {
                                    icon: SparklesIcon,
                                    label: 'Group',
                                    value: (
                                        <Link
                                            href={route('groups.show', {
                                                group: idol.group,
                                            })}
                                            className="text-purple-500 transition-colors hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300"
                                        >
                                            {idol.group.name}
                                        </Link>
                                    ),
                                },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-center justify-between rounded-xl bg-gray-50/50 px-4 py-3 backdrop-blur-sm transition-colors hover:bg-gray-50/80 dark:bg-gray-900/50 dark:hover:bg-gray-900/80"
                                >
                                    <dt className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="rounded-full bg-purple-500/10 p-1.5 dark:bg-purple-500/20">
                                            <item.icon className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                                        </div>
                                        {item.label}
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                        {item.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </motion.div>
            </div>
            <div className="mt-8">
                <CommentSection
                    type="idol"
                    id={idol.id}
                    comments={idol.comments}
                />
            </div>
        </TabPanel>
    );
}

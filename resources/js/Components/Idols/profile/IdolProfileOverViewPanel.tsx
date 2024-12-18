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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-8"
                >
                    <div className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800">
                        <div className="flex items-center gap-2">
                            <BookOpenIcon className="h-5 w-5 text-purple-500" />
                            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                                Biography
                            </h2>
                        </div>

                        <div
                            className="prose mt-4 max-w-none text-gray-600 dark:prose-invert sm:mt-6 dark:text-gray-400"
                            dangerouslySetInnerHTML={{
                                __html: bio,
                            }}
                        />

                        {/* Stats Grid */}
                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="rounded-lg bg-purple-50 p-3 text-center ring-1 ring-purple-100 sm:p-4 dark:bg-purple-900/10 dark:ring-purple-900/30"
                            >
                                <HeartIcon className="mx-auto h-5 w-5 text-purple-600 sm:h-6 sm:w-6 dark:text-purple-400" />
                                <div className="mt-1.5 text-sm font-medium text-purple-600 sm:mt-2 dark:text-purple-400">
                                    {artistInformation?.followers.total.toLocaleString()}{' '}
                                    Follower
                                    {artistInformation?.followers.total === 1
                                        ? ''
                                        : 's'}
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
                                    {artistInformation?.popularity} Popularity
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="rounded-lg bg-purple-50 p-3 text-center ring-1 ring-purple-100 sm:p-4 dark:bg-purple-900/10 dark:ring-purple-900/30"
                            >
                                <ListMusic className="mx-auto h-5 w-5 text-purple-600 sm:h-6 sm:w-6 dark:text-purple-400" />
                                <div className="mt-1.5 text-sm font-medium text-purple-600 sm:mt-2 dark:text-purple-400">
                                    {songs?.total ?? 0} Songs
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className="rounded-lg bg-purple-50 p-3 text-center ring-1 ring-purple-100 sm:p-4 dark:bg-purple-900/10 dark:ring-purple-900/30"
                            >
                                <CalendarIcon className="mx-auto h-5 w-5 text-purple-600 sm:h-6 sm:w-6 dark:text-purple-400" />
                                <div className="mt-1.5 text-sm font-medium text-purple-600 sm:mt-2 dark:text-purple-400">
                                    {new Date(idol.birth_date).getFullYear()}
                                </div>
                            </motion.div>
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
                    <div className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800">
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
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

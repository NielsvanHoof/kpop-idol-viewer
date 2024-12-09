import { Group } from '@/types/models';
import { TabPanel } from '@headlessui/react';
import {
    BuildingOfficeIcon,
    GlobeAltIcon,
    HeartIcon,
    MusicalNoteIcon,
    StarIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { remark } from 'remark';

export default function GroupProfileOverViewPanel({ group }: { group: Group }) {
    const bio = remark().processSync(group.bio).toString();

    return (
        <TabPanel>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                {/* Main Content */}
                <div className="lg:col-span-8">
                    {/* About Section */}
                    <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800"
                    >
                        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                            About
                        </h2>
                        <div
                            className="prose mt-4 max-w-none text-gray-600 dark:prose-invert sm:mt-6 dark:text-gray-400"
                            dangerouslySetInnerHTML={{
                                __html: bio,
                            }}
                        />

                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                            <div className="rounded-lg bg-purple-50 p-3 text-center ring-1 ring-purple-100 sm:p-4 dark:bg-purple-900/10 dark:ring-purple-900/30">
                                <UsersIcon className="mx-auto h-5 w-5 text-purple-600 sm:h-6 sm:w-6 dark:text-purple-400" />
                                <div className="mt-1.5 text-sm font-medium text-purple-600 sm:mt-2 dark:text-purple-400">
                                    {group.idols_count} Members
                                </div>
                            </div>
                            <div className="rounded-lg bg-purple-50 p-3 text-center ring-1 ring-purple-100 sm:p-4 dark:bg-purple-900/10 dark:ring-purple-900/30">
                                <BuildingOfficeIcon className="mx-auto h-5 w-5 text-purple-600 sm:h-6 sm:w-6 dark:text-purple-400" />
                                <div className="mt-1.5 text-sm font-medium text-purple-600 sm:mt-2 dark:text-purple-400">
                                    JYP Entertainment
                                </div>
                            </div>
                            <div className="rounded-lg bg-purple-50 p-3 text-center ring-1 ring-purple-100 sm:p-4 dark:bg-purple-900/10 dark:ring-purple-900/30">
                                <GlobeAltIcon className="mx-auto h-5 w-5 text-purple-600 sm:h-6 sm:w-6 dark:text-purple-400" />
                                <div className="mt-1.5 text-sm font-medium text-purple-600 sm:mt-2 dark:text-purple-400">
                                    TWICE
                                </div>
                            </div>
                            <div className="rounded-lg bg-purple-50 p-3 text-center ring-1 ring-purple-100 sm:p-4 dark:bg-purple-900/10 dark:ring-purple-900/30">
                                <HeartIcon className="mx-auto h-5 w-5 text-purple-600 sm:h-6 sm:w-6 dark:text-purple-400" />
                                <div className="mt-1.5 text-sm font-medium text-purple-600 sm:mt-2 dark:text-purple-400">
                                    100M Fans
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Latest Release */}
                    <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 lg:mt-8 dark:bg-gray-800 dark:ring-gray-800"
                    >
                        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                            Latest Release
                        </h2>
                        <div className="mt-4 flex flex-col gap-4 sm:mt-6 sm:flex-row sm:gap-6">
                            <div className="aspect-square w-full overflow-hidden rounded-lg sm:w-32">
                                <img
                                    src={group.cover_photo}
                                    alt={group.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-white">
                                    {group.name}
                                </h3>
                                <p className="mt-1 text-sm text-gray-600 sm:text-base dark:text-gray-400">
                                    2024
                                </p>
                                <div className="mt-4 flex flex-wrap items-center gap-4">
                                    <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                        <MusicalNoteIcon className="h-4 w-4" />4
                                        Tracks
                                    </span>
                                    <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                        <StarIcon className="h-4 w-4" />4 Rating
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Sidebar Content */}
                <div className="space-y-6 lg:col-span-4 lg:space-y-8">
                    {/* Quick Facts */}
                    <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800"
                    >
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Quick Facts
                        </h3>
                        <dl className="mt-4 space-y-4 sm:mt-6">
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-600 dark:text-gray-400">
                                    Debut Date
                                </dt>
                                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                    {new Date(
                                        group.debute_date,
                                    ).toLocaleDateString()}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-600 dark:text-gray-400">
                                    Genre
                                </dt>
                                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                    K-Pop
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-600 dark:text-gray-400">
                                    Albums
                                </dt>
                                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                    4
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-600 dark:text-gray-400">
                                    Awards
                                </dt>
                                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                    5
                                </dd>
                            </div>
                        </dl>
                    </motion.div>
                </div>
            </div>
        </TabPanel>
    );
}

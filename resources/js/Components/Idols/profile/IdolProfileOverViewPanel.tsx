import { Idol } from '@/types/models';
import { TabPanel } from '@headlessui/react';
import {
    CalendarIcon,
    HeartIcon,
    MicrophoneIcon,
    StarIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { remark } from 'remark';

export default function IdolProfileOverViewPanel({ idol }: { idol: Idol }) {
    const bio = remark().processSync(idol.bio).toString();

    return (
        <TabPanel>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                {/* Main Content - Biography */}
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-8"
                >
                    <div className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800">
                        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                            Biography
                        </h2>
                        <div
                            className="prose mt-4 max-w-none text-gray-600 dark:prose-invert sm:mt-6 dark:text-gray-400"
                            dangerouslySetInnerHTML={{
                                __html: bio,
                            }}
                        />

                        {/* Stats Grid */}
                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                            <div className="rounded-lg bg-purple-50 p-3 text-center ring-1 ring-purple-100 sm:p-4 dark:bg-purple-900/10 dark:ring-purple-900/30">
                                <HeartIcon className="mx-auto h-5 w-5 text-purple-600 sm:h-6 sm:w-6 dark:text-purple-400" />
                                <div className="mt-1.5 text-sm font-medium text-purple-600 sm:mt-2 dark:text-purple-400">
                                    {idol.followers} Fans
                                </div>
                            </div>
                            <div className="rounded-lg bg-purple-50 p-3 text-center ring-1 ring-purple-100 sm:p-4 dark:bg-purple-900/10 dark:ring-purple-900/30">
                                <StarIcon className="mx-auto h-5 w-5 text-purple-600 sm:h-6 sm:w-6 dark:text-purple-400" />
                                <div className="mt-1.5 text-sm font-medium text-purple-600 sm:mt-2 dark:text-purple-400">
                                    5 Rating
                                </div>
                            </div>
                            <div className="rounded-lg bg-purple-50 p-3 text-center ring-1 ring-purple-100 sm:p-4 dark:bg-purple-900/10 dark:ring-purple-900/30">
                                <MicrophoneIcon className="mx-auto h-5 w-5 text-purple-600 sm:h-6 sm:w-6 dark:text-purple-400" />
                                <div className="mt-1.5 text-sm font-medium text-purple-600 sm:mt-2 dark:text-purple-400">
                                    10 Songs
                                </div>
                            </div>
                            <div className="rounded-lg bg-purple-50 p-3 text-center ring-1 ring-purple-100 sm:p-4 dark:bg-purple-900/10 dark:ring-purple-900/30">
                                <CalendarIcon className="mx-auto h-5 w-5 text-purple-600 sm:h-6 sm:w-6 dark:text-purple-400" />
                                <div className="mt-1.5 text-sm font-medium text-purple-600 sm:mt-2 dark:text-purple-400">
                                    {new Date(idol.birth_date).getFullYear()}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Sidebar - Quick Stats */}
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-4"
                >
                    <div className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Quick Stats
                        </h3>
                        <dl className="mt-4 space-y-4 sm:mt-6">
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-600 dark:text-gray-400">
                                    Birth Date
                                </dt>
                                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                    {new Date(
                                        idol.birth_date,
                                    ).toLocaleDateString()}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-600 dark:text-gray-400">
                                    Debut Date
                                </dt>
                                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                    {new Date(
                                        idol.debute_date,
                                    ).toLocaleDateString()}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-600 dark:text-gray-400">
                                    Position
                                </dt>
                                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                    {idol.position}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-600 dark:text-gray-400">
                                    Group
                                </dt>
                                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                    {idol.group.name}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </motion.div>
            </div>
        </TabPanel>
    );
}

import { Idol } from '@/types/models';
import { TabPanel } from '@headlessui/react';
import {
    CalendarDaysIcon,
    GlobeAltIcon,
    IdentificationIcon,
    SparklesIcon,
    TrophyIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const achievements = ['Best Newcomer', 'Best Dancer', 'Best Vocalist'];

export default function IdolProfileBioPanel({ idol }: { idol: Idol }) {
    return (
        <TabPanel>
            <div className="space-y-6 sm:space-y-8">
                {/* Detailed Biography */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800"
                >
                    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                        Detailed Biography
                    </h2>
                    <div
                        className="prose mt-4 max-w-none text-gray-600 dark:prose-invert sm:mt-6 dark:text-gray-400"
                        dangerouslySetInnerHTML={{
                            __html: idol.bio,
                        }}
                    />
                </motion.div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Personal Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800"
                    >
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                            <IdentificationIcon className="h-5 w-5 text-purple-500" />
                            Personal Information
                        </h3>
                        <dl className="mt-4 space-y-4 sm:mt-6">
                            <div className="flex items-center justify-between gap-4">
                                <dt className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <UserCircleIcon className="h-4 w-4" />
                                    Birth Name
                                </dt>
                                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                    {idol.name}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <dt className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <SparklesIcon className="h-4 w-4" />
                                    Stage Name
                                </dt>
                                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                    {idol.stage_name}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <dt className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <GlobeAltIcon className="h-4 w-4" />
                                    Nationality
                                </dt>
                                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                    Korean
                                </dd>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <dt className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <CalendarDaysIcon className="h-4 w-4" />
                                    Birth Date
                                </dt>
                                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                    {new Date(
                                        idol.birth_date,
                                    ).toLocaleDateString()}
                                </dd>
                            </div>
                        </dl>
                    </motion.div>

                    {/* Career Milestones */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800"
                    >
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                            <TrophyIcon className="h-5 w-5 text-purple-500" />
                            Career Milestones
                        </h3>
                        <ul className="mt-4 space-y-4 sm:mt-6">
                            <li className="flex items-start gap-3 rounded-lg bg-purple-50 p-3 ring-1 ring-purple-100 dark:bg-purple-900/10 dark:ring-purple-900/30">
                                <SparklesIcon className="h-5 w-5 shrink-0 text-purple-600 dark:text-purple-400" />
                                <span className="text-sm text-purple-600 dark:text-purple-400">
                                    Debuted with {idol.group.name} on{' '}
                                    {new Date(
                                        idol.debute_date,
                                    ).toLocaleDateString()}
                                </span>
                            </li>
                            {achievements.map((achievement, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3 rounded-lg bg-purple-50 p-3 ring-1 ring-purple-100 dark:bg-purple-900/10 dark:ring-purple-900/30"
                                >
                                    <TrophyIcon className="h-5 w-5 shrink-0 text-purple-600 dark:text-purple-400" />
                                    <span className="text-sm text-purple-600 dark:text-purple-400">
                                        {achievement}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </TabPanel>
    );
}

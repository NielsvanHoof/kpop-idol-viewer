import { Idol } from '@/types/models';
import { TabPanel } from '@headlessui/react';
import { motion } from 'framer-motion';
import {
    BookOpenIcon,
    CalendarIcon,
    GlobeIcon,
    SparklesIcon,
    TrophyIcon,
    User,
    UserCircleIcon,
} from 'lucide-react';

const achievements = ['Best Newcomer', 'Best Dancer', 'Best Vocalist'];

export default function IdolProfileBioPanel({ idol }: { idol: Idol }) {
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
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <BookOpenIcon className="h-5 w-5 text-purple-500" />
                                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                                    Detailed Biography
                                </h2>
                            </div>
                            <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                                {idol.name}
                            </span>
                        </div>

                        <div
                            className="prose mt-4 max-w-none text-gray-600 dark:prose-invert sm:mt-6 dark:text-gray-400"
                            dangerouslySetInnerHTML={{
                                __html: idol.bio,
                            }}
                        />

                        {/* Personal Information Grid */}
                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="rounded-lg bg-purple-50 p-4 ring-1 ring-purple-100 dark:bg-purple-900/10 dark:ring-purple-900/30"
                            >
                                <div className="flex items-center gap-2">
                                    <UserCircleIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                    <h3 className="font-medium text-purple-600 dark:text-purple-400">
                                        Birth Name
                                    </h3>
                                </div>
                                <p className="mt-2 text-sm text-purple-600 dark:text-purple-400">
                                    {idol.name}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="rounded-lg bg-purple-50 p-4 ring-1 ring-purple-100 dark:bg-purple-900/10 dark:ring-purple-900/30"
                            >
                                <div className="flex items-center gap-2">
                                    <SparklesIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                    <h3 className="font-medium text-purple-600 dark:text-purple-400">
                                        Stage Name
                                    </h3>
                                </div>
                                <p className="mt-2 text-sm text-purple-600 dark:text-purple-400">
                                    {idol.stage_name}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Sidebar - Quick Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-4"
                >
                    <div className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800">
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                            <User className="h-5 w-5 text-purple-500" />
                            Personal Information
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
                                    <GlobeIcon className="h-4 w-4" />
                                    Nationality
                                </dt>
                                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                    Korean
                                </dd>
                            </div>
                        </dl>

                        {/* Career Milestones */}
                        <div className="mt-6">
                            <h4 className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                                <TrophyIcon className="h-4 w-4 text-purple-500" />
                                Career Milestones
                            </h4>
                            <ul className="mt-4 space-y-3">
                                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <SparklesIcon className="h-4 w-4 shrink-0 text-purple-500" />
                                    <span>
                                        Debuted with {idol.group.name} on{' '}
                                        {new Date(
                                            idol.debute_date,
                                        ).toLocaleDateString()}
                                    </span>
                                </li>
                                {achievements.map((achievement, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                                    >
                                        <TrophyIcon className="h-4 w-4 shrink-0 text-purple-500" />
                                        <span>{achievement}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </TabPanel>
    );
}

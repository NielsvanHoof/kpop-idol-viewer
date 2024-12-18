import EmptyState from '@/Components/State/EmptyState';
import { Group } from '@/types/models';
import { TabPanel } from '@headlessui/react';
import { motion } from 'framer-motion';
import {
    ChartBarIcon,
    MedalIcon,
    SparklesIcon,
    StarIcon,
    TrophyIcon,
} from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3 },
    },
};

export default function GroupProfileAwardsPanel({ group }: { group: Group }) {
    const awardsByYear = group.awards.reduce(
        (acc, award) => {
            const year = new Date(award.from).getFullYear();
            acc[year] = (acc[year] || 0) + 1;
            return acc;
        },
        {} as Record<number, number>,
    );

    const awardTypes = [
        {
            name: 'Daesang',
            count: group.awards.filter((a) => a.type === 'daesang').length,
            icon: TrophyIcon,
            color: 'text-yellow-600 dark:text-yellow-400',
            bg: 'bg-yellow-50 dark:bg-yellow-900/10',
            ring: 'ring-yellow-100 dark:ring-yellow-900/30',
        },
        {
            name: 'Bonsang',
            count: group.awards.filter((a) => a.type === 'bonsang').length,
            icon: MedalIcon,
            color: 'text-purple-600 dark:text-purple-400',
            bg: 'bg-purple-50 dark:bg-purple-900/10',
            ring: 'ring-purple-100 dark:ring-purple-900/30',
        },
        {
            name: 'Rookie',
            count: group.awards.filter((a) => a.type === 'rookie').length,
            icon: SparklesIcon,
            color: 'text-blue-600 dark:text-blue-400',
            bg: 'bg-blue-50 dark:bg-blue-900/10',
            ring: 'ring-blue-100 dark:ring-blue-900/30',
        },
        {
            name: 'Popularity',
            count: group.awards.filter((a) => a.type === 'popularity').length,
            icon: StarIcon,
            color: 'text-pink-600 dark:text-pink-400',
            bg: 'bg-pink-50 dark:bg-pink-900/10',
            ring: 'ring-pink-100 dark:ring-pink-900/30',
        },
    ];

    return (
        <TabPanel>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                {/* Main Content - Awards List */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="lg:col-span-8"
                >
                    <div className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <TrophyIcon className="h-5 w-5 text-yellow-500" />
                                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                                    Awards & Achievements
                                </h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                                    {group.awards_count} Awards
                                </span>
                                <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                                    {Object.keys(awardsByYear).length} Years
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            {group.awards.map((award) => (
                                <motion.div
                                    key={award.id}
                                    variants={itemVariants}
                                    className={`group relative flex gap-4 rounded-lg ${
                                        award.type === 'daesang'
                                            ? 'bg-yellow-50 ring-yellow-100 dark:bg-yellow-900/10 dark:ring-yellow-900/30'
                                            : award.type === 'bonsang'
                                              ? 'bg-purple-50 ring-purple-100 dark:bg-purple-900/10 dark:ring-purple-900/30'
                                              : award.type === 'rookie'
                                                ? 'bg-blue-50 ring-blue-100 dark:bg-blue-900/10 dark:ring-blue-900/30'
                                                : 'bg-pink-50 ring-pink-100 dark:bg-pink-900/10 dark:ring-pink-900/30'
                                    } p-4 ring-1 transition-all hover:-translate-y-1 hover:shadow-md`}
                                >
                                    <div className="flex flex-col items-center rounded-lg bg-white px-3 py-1.5 text-center shadow-sm dark:bg-gray-800">
                                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                            {new Date(
                                                award.from,
                                            ).toLocaleDateString(undefined, {
                                                month: 'short',
                                            })}
                                        </span>
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                                            {new Date(award.from).getFullYear()}
                                        </span>
                                    </div>

                                    <div className="flex flex-1 flex-col">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                    {award.title}
                                                </h3>
                                            </div>
                                            <span
                                                className={`rounded-full bg-white px-2.5 py-1 text-xs font-medium shadow-sm dark:bg-gray-800 ${
                                                    award.type === 'daesang'
                                                        ? 'text-yellow-600 dark:text-yellow-400'
                                                        : award.type ===
                                                            'bonsang'
                                                          ? 'text-purple-600 dark:text-purple-400'
                                                          : award.type ===
                                                              'rookie'
                                                            ? 'text-blue-600 dark:text-blue-400'
                                                            : 'text-pink-600 dark:text-pink-400'
                                                }`}
                                            >
                                                {award.type}
                                            </span>
                                        </div>
                                        {award.description && (
                                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                                {award.description}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}

                            {group.awards_count === 0 && (
                                <EmptyState
                                    title="No awards yet"
                                    message="Check back later for updates"
                                    icon={
                                        <TrophyIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    }
                                />
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Sidebar Content */}
                <div className="space-y-6 lg:col-span-4">
                    {/* Award Types */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800"
                    >
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                            <TrophyIcon className="h-5 w-5 text-yellow-500" />
                            Award Types
                        </h3>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            {awardTypes.map((type) => (
                                <div
                                    key={type.name}
                                    className={`rounded-lg ${type.bg} p-3 text-center ring-1 ${type.ring}`}
                                >
                                    <type.icon
                                        className={`mx-auto h-5 w-5 ${type.color}`}
                                    />
                                    <p
                                        className={`mt-1 text-sm font-medium ${type.color}`}
                                    >
                                        {type.name}
                                    </p>
                                    <p
                                        className={`text-lg font-bold ${type.color}`}
                                    >
                                        {type.count}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Awards Timeline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800"
                    >
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                            <ChartBarIcon className="h-5 w-5 text-purple-500" />
                            Awards Timeline
                        </h3>
                        <div className="mt-4 space-y-2">
                            {Object.entries(awardsByYear)
                                .sort(([a], [b]) => Number(b) - Number(a))
                                .map(([year, count]) => (
                                    <div
                                        key={year}
                                        className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-900"
                                    >
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            {year}
                                        </span>
                                        <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                                            {count} Awards
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </TabPanel>
    );
}

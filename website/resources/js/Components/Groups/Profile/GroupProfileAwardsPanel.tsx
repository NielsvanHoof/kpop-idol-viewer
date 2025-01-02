import EmptyState from '@/Components/State/EmptyState';
import { Group } from '@/types/models';
import { TabPanel } from '@headlessui/react';
import { motion, Variants } from 'framer-motion';
import {
    ChartBarIcon,
    MedalIcon,
    SparklesIcon,
    StarIcon,
    TrophyIcon,
} from 'lucide-react';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
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
            color: 'text-yellow-600',
            bg: 'bg-yellow-50/80',
            ring: 'ring-yellow-200/50',
            darkColor: 'dark:text-yellow-400',
            darkBg: 'dark:bg-yellow-900/10',
            darkRing: 'dark:ring-yellow-900/30',
        },
        {
            name: 'Bonsang',
            count: group.awards.filter((a) => a.type === 'bonsang').length,
            icon: MedalIcon,
            color: 'text-purple-600',
            bg: 'bg-purple-50/80',
            ring: 'ring-purple-200/50',
            darkColor: 'dark:text-purple-400',
            darkBg: 'dark:bg-purple-900/10',
            darkRing: 'dark:ring-purple-900/30',
        },
        {
            name: 'Rookie',
            count: group.awards.filter((a) => a.type === 'rookie').length,
            icon: SparklesIcon,
            color: 'text-blue-600',
            bg: 'bg-blue-50/80',
            ring: 'ring-blue-200/50',
            darkColor: 'dark:text-blue-400',
            darkBg: 'dark:bg-blue-900/10',
            darkRing: 'dark:ring-blue-900/30',
        },
        {
            name: 'Popularity',
            count: group.awards.filter((a) => a.type === 'popularity').length,
            icon: StarIcon,
            color: 'text-pink-600',
            bg: 'bg-pink-50/80',
            ring: 'ring-pink-200/50',
            darkColor: 'dark:text-pink-400',
            darkBg: 'dark:bg-pink-900/10',
            darkRing: 'dark:ring-pink-900/30',
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
                    <div className="overflow-hidden rounded-2xl bg-white/80 p-4 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl transition-all duration-300 hover:bg-white/90 sm:p-6 dark:bg-gray-800/80 dark:ring-gray-700/50 dark:hover:bg-gray-800/90">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <TrophyIcon className="h-5 w-5 text-yellow-500" />
                                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                                    Awards & Achievements
                                </h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="rounded-xl bg-yellow-100/80 px-3 py-1 text-xs font-medium text-yellow-600 backdrop-blur-sm dark:bg-yellow-900/30 dark:text-yellow-400">
                                    {group.awards_count} Awards
                                </span>
                                <span className="rounded-xl bg-purple-100/80 px-3 py-1 text-xs font-medium text-purple-600 backdrop-blur-sm dark:bg-purple-900/30 dark:text-purple-400">
                                    {Object.keys(awardsByYear).length} Years
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            {group.awards.map((award) => (
                                <motion.div
                                    key={award.id}
                                    variants={itemVariants}
                                    className={`group relative flex gap-4 rounded-xl p-4 ring-1 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                                        award.type === 'daesang'
                                            ? 'bg-yellow-50/80 ring-yellow-200/50 dark:bg-yellow-900/10 dark:ring-yellow-900/30'
                                            : award.type === 'bonsang'
                                              ? 'bg-purple-50/80 ring-purple-200/50 dark:bg-purple-900/10 dark:ring-purple-900/30'
                                              : award.type === 'rookie'
                                                ? 'bg-blue-50/80 ring-blue-200/50 dark:bg-blue-900/10 dark:ring-blue-900/30'
                                                : 'bg-pink-50/80 ring-pink-200/50 dark:bg-pink-900/10 dark:ring-pink-900/30'
                                    }`}
                                >
                                    <div className="flex flex-col items-center overflow-hidden rounded-xl bg-white/90 px-3 py-1.5 text-center shadow-sm backdrop-blur-sm dark:bg-gray-800/90">
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
                                                <h3 className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-yellow-600 dark:text-white dark:group-hover:text-yellow-400">
                                                    {award.title}
                                                </h3>
                                            </div>
                                            <span
                                                className={`rounded-xl bg-white/90 px-3 py-1 text-xs font-medium shadow-sm backdrop-blur-sm dark:bg-gray-800/90 ${
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
                        variants={itemVariants}
                        className="overflow-hidden rounded-2xl bg-white/80 p-4 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl transition-all duration-300 hover:bg-white/90 sm:p-6 dark:bg-gray-800/80 dark:ring-gray-700/50 dark:hover:bg-gray-800/90"
                    >
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                            <TrophyIcon className="h-5 w-5 text-yellow-500" />
                            Award Types
                        </h3>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            {awardTypes.map((type) => (
                                <div
                                    key={type.name}
                                    className={`group overflow-hidden rounded-xl ${type.bg} ${type.darkBg} p-3 text-center ring-1 ${type.ring} ${type.darkRing} backdrop-blur-sm transition-all duration-300 hover:shadow-lg`}
                                >
                                    <type.icon
                                        className={`mx-auto h-5 w-5 ${type.color} ${type.darkColor}`}
                                    />
                                    <p
                                        className={`mt-1 text-sm font-medium ${type.color} ${type.darkColor}`}
                                    >
                                        {type.name}
                                    </p>
                                    <p
                                        className={`text-lg font-bold ${type.color} ${type.darkColor}`}
                                    >
                                        {type.count}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Awards Timeline */}
                    <motion.div
                        variants={itemVariants}
                        className="overflow-hidden rounded-2xl bg-white/80 p-4 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl transition-all duration-300 hover:bg-white/90 sm:p-6 dark:bg-gray-800/80 dark:ring-gray-700/50 dark:hover:bg-gray-800/90"
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
                                        className="group flex items-center justify-between rounded-xl bg-gray-50/80 px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:bg-gray-100/80 dark:bg-gray-900/50 dark:hover:bg-gray-900/80"
                                    >
                                        <span className="text-sm text-gray-600 transition-colors group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
                                            {year}
                                        </span>
                                        <span className="rounded-xl bg-purple-100/80 px-3 py-1 text-xs font-medium text-purple-600 backdrop-blur-sm dark:bg-purple-900/30 dark:text-purple-400">
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

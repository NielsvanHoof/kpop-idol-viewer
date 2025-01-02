import { Group } from '@/types/models';
import { TabPanel } from '@headlessui/react';
import { motion, Variants } from 'framer-motion';
import { UsersIcon } from 'lucide-react';
import GroupProfileMembersCard from './Members/GroupProfileMembersCard';
import GroupProfileMembersDistributtonCard from './Members/GroupProfileMembersDistributtonCard';
import GroupProfileMembersStatistics from './Members/GroupProfileMembersStatistics';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export default function GroupProfileMembersPanel({ group }: { group: Group }) {
    const positions = group.idols
        ?.flatMap((idol) => idol.position?.split(',').map((p) => p.trim()))
        .filter((p): p is string => !!p)
        .reduce(
            (acc, pos) => {
                acc[pos] = (acc[pos] || 0) + 1;
                return acc;
            },
            {} as Record<string, number>,
        );

    return (
        <TabPanel>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-8">
                {/* Main Content - Current Members */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="lg:col-span-8"
                >
                    <div className="overflow-hidden rounded-2xl bg-white/80 p-3 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl transition-all duration-300 hover:bg-white/90 sm:p-6 dark:bg-gray-800/80 dark:ring-gray-700/50 dark:hover:bg-gray-800/90">
                        {/* Header Section */}
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-2">
                                <UsersIcon className="h-5 w-5 text-purple-500" />
                                <h2 className="text-lg font-bold text-gray-900 sm:text-2xl dark:text-white">
                                    Current Members
                                </h2>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-xl bg-purple-100/80 px-3 py-1 text-xs font-medium text-purple-600 backdrop-blur-sm dark:bg-purple-900/30 dark:text-purple-400">
                                    {group.idols_count || 0} Members
                                </span>
                                <span className="rounded-xl bg-green-100/80 px-3 py-1 text-xs font-medium text-green-600 backdrop-blur-sm dark:bg-green-900/30 dark:text-green-400">
                                    Active
                                </span>
                            </div>
                        </div>

                        {/* Members Grid */}
                        <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
                            {group.idols?.map((idol) => (
                                <GroupProfileMembersCard
                                    key={idol.id}
                                    idol={idol}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Statistics Sidebar - Now in a scrollable container on mobile */}
                <div className="flex gap-4 overflow-x-auto pb-4 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0">
                    <GroupProfileMembersStatistics group={group} />
                    <GroupProfileMembersDistributtonCard
                        positions={positions}
                    />
                </div>
            </div>
        </TabPanel>
    );
}

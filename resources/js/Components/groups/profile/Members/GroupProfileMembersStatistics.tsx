import { Group } from '@/types/models';
import { SparklesIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface GroupProfileMembersStatisticsProps {
    group: Group;
}

export default function GroupProfileMembersStatistics({
    group,
}: GroupProfileMembersStatisticsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="min-w-[280px] rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:min-w-[320px] sm:p-6 lg:min-w-full dark:bg-gray-800 dark:ring-gray-800"
        >
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <SparklesIcon className="h-5 w-5 text-purple-500" />
                Member Statistics
            </h3>
            <dl className="mt-4 space-y-4 sm:mt-6">
                <div className="flex justify-between border-b border-gray-100 pb-2 dark:border-gray-700">
                    <dt className="text-sm text-gray-600 dark:text-gray-400">
                        Total Members
                    </dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                        {group.idols?.length || 0}
                    </dd>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2 dark:border-gray-700">
                    <dt className="text-sm text-gray-600 dark:text-gray-400">
                        Average Age
                    </dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                        {(
                            group.idols?.reduce((acc, idol) => {
                                const age =
                                    new Date().getFullYear() -
                                    new Date(idol.birth_date).getFullYear();
                                return acc + age;
                            }, 0) / (group.idols?.length || 1)
                        ).toFixed(1)}{' '}
                        years
                    </dd>
                </div>
                <div className="flex justify-between">
                    <dt className="text-sm text-gray-600 dark:text-gray-400">
                        Years Active
                    </dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date().getFullYear() -
                            new Date(group.debute_date).getFullYear()}{' '}
                        years
                    </dd>
                </div>
            </dl>
        </motion.div>
    );
}

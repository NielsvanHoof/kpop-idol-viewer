import { Group } from '@/types/models';
import { motion, Variants } from 'framer-motion';
import { SparklesIcon } from 'lucide-react';

interface GroupProfileMembersStatisticsProps {
    group: Group;
}

const itemVariants: Variants = {
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export default function GroupProfileMembersStatistics({
    group,
}: GroupProfileMembersStatisticsProps) {
    return (
        <motion.div
            variants={itemVariants}
            className="min-w-[280px] overflow-hidden rounded-2xl bg-white/80 p-4 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl transition-all duration-300 hover:bg-white/90 sm:min-w-[320px] sm:p-6 lg:min-w-full dark:bg-gray-800/80 dark:ring-gray-700/50 dark:hover:bg-gray-800/90"
        >
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <SparklesIcon className="h-5 w-5 text-purple-500" />
                Member Statistics
            </h3>
            <dl className="mt-4 space-y-4 sm:mt-6">
                <div className="group flex justify-between border-b border-gray-100 pb-2 transition-colors duration-300 dark:border-gray-700">
                    <dt className="text-sm text-gray-600 transition-colors group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
                        Total Members
                    </dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                        {group.idols?.length || 0}
                    </dd>
                </div>
                <div className="group flex justify-between border-b border-gray-100 pb-2 transition-colors duration-300 dark:border-gray-700">
                    <dt className="text-sm text-gray-600 transition-colors group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
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
                <div className="group flex justify-between transition-colors duration-300">
                    <dt className="text-sm text-gray-600 transition-colors group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
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

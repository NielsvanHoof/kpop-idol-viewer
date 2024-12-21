import { motion } from 'framer-motion';
import { TrophyIcon } from 'lucide-react';

interface PositionDistributionCardProps {
    positions: Record<string, number>;
}

export default function GroupProfileMembersDistributtonCard({
    positions,
}: PositionDistributionCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="min-w-[280px] rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:min-w-[320px] sm:p-6 lg:min-w-full dark:bg-gray-800 dark:ring-gray-800"
        >
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <TrophyIcon className="h-5 w-5 text-purple-500" />
                Position Distribution
            </h3>
            <div className="mt-4 space-y-2">
                {Object.entries(positions || {}).map(([position, count]) => (
                    <div
                        key={position}
                        className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-900"
                    >
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {position}
                        </span>
                        <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                            {count}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

import { motion, Variants } from 'framer-motion';
import { TrophyIcon } from 'lucide-react';

interface PositionDistributionCardProps {
    positions: Record<string, number>;
}

const itemVariants: Variants = {
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export default function GroupProfileMembersDistributtonCard({
    positions,
}: PositionDistributionCardProps) {
    return (
        <motion.div
            variants={itemVariants}
            className="min-w-[280px] overflow-hidden rounded-2xl bg-white/80 p-4 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl transition-all duration-300 hover:bg-white/90 sm:min-w-[320px] sm:p-6 lg:min-w-full dark:bg-gray-800/80 dark:ring-gray-700/50 dark:hover:bg-gray-800/90"
        >
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <TrophyIcon className="h-5 w-5 text-purple-500" />
                Position Distribution
            </h3>
            <div className="mt-4 space-y-2">
                {Object.entries(positions || {}).map(([position, count]) => (
                    <div
                        key={position}
                        className="group flex items-center justify-between rounded-xl bg-gray-50/80 px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:bg-gray-100/80 dark:bg-gray-900/50 dark:hover:bg-gray-900/80"
                    >
                        <span className="text-sm text-gray-600 transition-colors group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
                            {position}
                        </span>
                        <span className="rounded-xl bg-purple-100/80 px-3 py-1 text-xs font-medium text-purple-600 backdrop-blur-sm dark:bg-purple-900/30 dark:text-purple-400">
                            {count}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

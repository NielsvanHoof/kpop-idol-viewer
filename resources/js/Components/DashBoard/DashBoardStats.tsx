import { motion } from 'motion/react';

export default function DashBoardStats({ stats }: { stats: any }) {
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="group overflow-hidden rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 transition-all duration-300 dark:bg-gray-800 dark:ring-gray-700"
                >
                    <div className="transition-transform duration-300 group-hover:scale-110">
                        {stat.icon}
                    </div>
                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                    </p>
                </motion.div>
            ))}
        </div>
    );
}

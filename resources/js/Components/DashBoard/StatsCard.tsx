import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StatsCardProps {
    icon: ReactNode;
    label: string;
    value: number | string;
}

export default function StatsCard({ icon, label, value }: StatsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all duration-300 dark:bg-gray-800 dark:ring-gray-700"
        >
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                    {icon}
                </div>
                <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {typeof value === 'number' ? value.toLocaleString() : value}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {label}
                    </p>
                </div>
            </div>
        </motion.div>
    );
} 
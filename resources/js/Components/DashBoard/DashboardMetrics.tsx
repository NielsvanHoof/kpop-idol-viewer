import { motion } from 'framer-motion';
import { HeartIcon, StarIcon, UsersIcon, ViewIcon } from 'lucide-react';

interface DashboardMetricsProps {
    stats: {
        totalLikes: number;
        totalFollowing: number;
        joinDate: string;
        activityScore: number;
        lastActive: string;
        totalViews: number;
    };
}

export default function DashboardMetrics({ stats }: DashboardMetricsProps) {
    const metrics = [
        {
            name: 'Total Likes',
            value: stats.totalLikes,
            icon: HeartIcon,
            color: 'text-pink-600',
            bg: 'bg-pink-50',
            ring: 'ring-pink-100',
            darkColor: 'dark:text-pink-400',
            darkBg: 'dark:bg-pink-900/10',
            darkRing: 'dark:ring-pink-900/30',
        },
        {
            name: 'Following',
            value: stats.totalFollowing,
            icon: UsersIcon,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            ring: 'ring-purple-100',
            darkColor: 'dark:text-purple-400',
            darkBg: 'dark:bg-purple-900/10',
            darkRing: 'dark:ring-purple-900/30',
        },
        {
            name: 'Profile Views',
            value: stats.totalViews,
            icon: ViewIcon,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            ring: 'ring-blue-100',
            darkColor: 'dark:text-blue-400',
            darkBg: 'dark:bg-blue-900/10',
            darkRing: 'dark:ring-blue-900/30',
        },
        {
            name: 'Activity Score',
            value: stats.activityScore,
            icon: StarIcon,
            color: 'text-yellow-600',
            bg: 'bg-yellow-50',
            ring: 'ring-yellow-100',
            darkColor: 'dark:text-yellow-400',
            darkBg: 'dark:bg-yellow-900/10',
            darkRing: 'dark:ring-yellow-900/30',
        },
    ];

    return (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => (
                <motion.div
                    key={metric.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`rounded-xl ${metric.bg} ${metric.darkBg} p-6 ring-1 ${metric.ring} ${metric.darkRing}`}
                >
                    <div className="flex items-center">
                        <metric.icon
                            className={`h-5 w-5 ${metric.color} ${metric.darkColor}`}
                        />
                        <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                            {metric.name}
                        </span>
                    </div>
                    <p
                        className={`mt-2 text-3xl font-bold ${metric.color} ${metric.darkColor}`}
                    >
                        {metric.value}
                    </p>
                </motion.div>
            ))}
        </div>
    );
}

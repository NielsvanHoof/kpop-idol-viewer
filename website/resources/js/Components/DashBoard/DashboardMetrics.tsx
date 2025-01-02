import { CalendarIcon, HeartIcon, StarIcon, UsersIcon } from 'lucide-react';

interface DashboardMetricsProps {
    stats: {
        totalLikes: number;
        totalFollowing: number;
        joinDate: string;
        activityScore: number;
    };
}

export default function DashboardMetrics({ stats }: DashboardMetricsProps) {
    const metrics = [
        {
            name: 'Total Likes',
            value: stats.totalLikes,
            icon: HeartIcon,
            color: 'text-pink-600 dark:text-pink-400',
            bgColor: 'bg-pink-100/80 dark:bg-pink-900/30',
        },
        {
            name: 'Following',
            value: stats.totalFollowing,
            icon: UsersIcon,
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-100/80 dark:bg-blue-900/30',
        },
        {
            name: 'Activity Score',
            value: stats.activityScore,
            icon: StarIcon,
            color: 'text-yellow-600 dark:text-yellow-400',
            bgColor: 'bg-yellow-100/80 dark:bg-yellow-900/30',
        },
        {
            name: 'Member Since',
            value: new Date(stats.joinDate).toLocaleDateString(),
            icon: CalendarIcon,
            color: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-100/80 dark:bg-purple-900/30',
        },
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
                <div
                    key={metric.name}
                    className="overflow-hidden rounded-lg bg-white p-6 shadow dark:bg-gray-800"
                >
                    <div className="flex items-center">
                        <div className={`rounded-lg ${metric.bgColor} p-3`}>
                            <metric.icon
                                className={`h-6 w-6 ${metric.color}`}
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {metric.name}
                        </p>
                        <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                            {metric.value}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

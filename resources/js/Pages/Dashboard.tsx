import DashBoardActivityTimeline from '@/Components/DashBoard/DashBoardActivityTimeline';
import DashBoardFavoriteIdols from '@/Components/DashBoard/DashBoardFavoriteIdols';
import DashboardMetrics from '@/Components/DashBoard/DashboardMetrics';
import DashboardProfileHeader from '@/Components/DashBoard/DashBoardProfile';
import DashboardRecentlyViewed from '@/Components/DashBoard/DashBoardRecentlyViewed';
import DashboardLayout from '@/Layouts/DashboardLayout';
import MainLayout from '@/Layouts/MainLayout';
import { Article, Idol, RecentlyViewedItem } from '@/types/models';
import { Head, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface DashboardProps {
    liked: Idol[];
    stats: {
        totalLikes: number;
        totalFollowing: number;
        joinDate: string;
        activityScore: number;
        lastActive: string;
        totalViews: number;
    };
    recentlyViewed: RecentlyViewedItem[];
    timelineEvents: Article[];
}

export default function Dashboard({
    liked,
    stats,
    recentlyViewed,
    timelineEvents,
}: DashboardProps) {
    const { auth } = usePage().props;

    return (
        <MainLayout>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-white dark:bg-gray-900">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <DashboardProfileHeader user={auth.user} />

                    <DashboardLayout>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <DashboardMetrics stats={stats} />
                        </motion.div>

                        <div className="mt-8 grid gap-8 lg:grid-cols-12">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="space-y-8 lg:col-span-8"
                            >
                                <DashBoardActivityTimeline
                                    articles={timelineEvents}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-8 lg:col-span-4"
                            >
                                <DashBoardFavoriteIdols idols={liked} />
                                <DashboardRecentlyViewed
                                    items={recentlyViewed}
                                />
                            </motion.div>
                        </div>
                    </DashboardLayout>
                </motion.div>
            </div>
        </MainLayout>
    );
}

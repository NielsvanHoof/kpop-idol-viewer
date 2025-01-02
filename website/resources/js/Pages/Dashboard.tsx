import DashBoardActivityTimeline from '@/Components/DashBoard/DashBoardActivityTimeline';
import DashBoardFavoriteIdols from '@/Components/DashBoard/DashBoardFavoriteIdols';
import DashboardMetrics from '@/Components/DashBoard/DashboardMetrics';
import DashboardProfileHeader from '@/Components/DashBoard/DashBoardProfile';
import DashboardRecentlyViewed from '@/Components/DashBoard/DashBoardRecentlyViewed';
import DashboardLayout from '@/Layouts/DashboardLayout';
import MainLayout from '@/Layouts/MainLayout';
import { DashboardData } from '@/types/models';
import { Head, usePage } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export default function Dashboard({
    liked,
    stats,
    recentlyViewed,
    timeLineEvents,
}: DashboardData) {
    const { auth } = usePage().props;

    return (
        <MainLayout>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-white dark:bg-gray-900">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants}>
                        <DashboardProfileHeader user={auth.user} />
                    </motion.div>

                    <DashboardLayout>
                        <motion.div variants={itemVariants}>
                            <DashboardMetrics stats={stats} />
                        </motion.div>

                        <div className="mt-8 grid gap-8 lg:grid-cols-12">
                            <motion.div
                                variants={itemVariants}
                                className="space-y-8 lg:col-span-8"
                            >
                                <DashBoardActivityTimeline
                                    articles={timeLineEvents}
                                />
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="space-y-8 lg:col-span-4"
                            >
                                <DashBoardFavoriteIdols items={liked} />
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

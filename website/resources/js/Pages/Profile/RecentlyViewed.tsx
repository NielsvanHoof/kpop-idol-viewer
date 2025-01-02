import RecentlyViewedSection from '@/Components/RecentlyViewed/RecentlyViewedSection';
import MainLayout from '@/Layouts/MainLayout';
import { RecentlyViewedItem } from '@/types/models';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import { ArrowLeftIcon, ClockIcon, EyeIcon, UserIcon } from 'lucide-react';

interface RecentlyViewedProps {
    recentlyViewed: RecentlyViewedItem[];
    meta: {
        totalViews: number;
        uniqueItems: number;
        lastViewed: string;
    };
}

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

export default function RecentlyViewed({
    recentlyViewed,
    meta,
}: RecentlyViewedProps) {
    const { auth } = usePage().props;

    const stats = [
        {
            label: 'Total Views',
            value: meta.totalViews.toLocaleString(),
            icon: EyeIcon,
            color: 'text-blue-600',
            bg: 'bg-white/80',
            ring: 'ring-blue-200/50',
            darkColor: 'dark:text-blue-400',
            darkBg: 'dark:bg-gray-800/80',
            darkRing: 'dark:ring-blue-900/20',
            iconBg: 'bg-blue-100/80',
            darkIconBg: 'dark:bg-blue-900/30',
        },
        {
            label: 'Unique Items',
            value: meta.uniqueItems.toLocaleString(),
            icon: UserIcon,
            color: 'text-purple-600',
            bg: 'bg-white/80',
            ring: 'ring-purple-200/50',
            darkColor: 'dark:text-purple-400',
            darkBg: 'dark:bg-gray-800/80',
            darkRing: 'dark:ring-purple-900/20',
            iconBg: 'bg-purple-100/80',
            darkIconBg: 'dark:bg-purple-900/30',
        },
        {
            label: 'Last Viewed',
            value: new Date(meta.lastViewed).toLocaleDateString(),
            icon: ClockIcon,
            color: 'text-pink-600',
            bg: 'bg-white/80',
            ring: 'ring-pink-200/50',
            darkColor: 'dark:text-pink-400',
            darkBg: 'dark:bg-gray-800/80',
            darkRing: 'dark:ring-pink-900/20',
            iconBg: 'bg-pink-100/80',
            darkIconBg: 'dark:bg-pink-900/30',
        },
    ];

    return (
        <MainLayout>
            <Head title="Recently Viewed | KPOP Project" />

            {/* Profile Header */}
            <section className="relative mb-16 h-[35vh] min-h-[250px] overflow-hidden bg-gradient-to-br from-purple-600/5 via-purple-600/10 to-pink-600/5 sm:mb-20 sm:h-[40vh] sm:min-h-[300px] dark:from-purple-900/20 dark:via-purple-900/25 dark:to-pink-900/20">
                <div className="absolute inset-0 backdrop-blur-3xl" />

                <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 sm:p-6 lg:p-8">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mx-auto max-w-7xl"
                    >
                        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end">
                            <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                className="relative h-28 w-28 overflow-hidden rounded-2xl ring-4 ring-white/90 transition-transform duration-300 dark:ring-gray-800"
                            >
                                <img
                                    src={auth.user.profile_photo}
                                    alt={`${auth.user.name}'s Profile`}
                                    className="h-full w-full object-cover"
                                />
                            </motion.div>
                            <div>
                                <motion.div
                                    variants={itemVariants}
                                    className="inline-flex items-center gap-2 rounded-xl bg-purple-100/80 px-3 py-1.5 backdrop-blur-sm dark:bg-purple-900/30"
                                >
                                    <ClockIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                    <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                                        Activity History
                                    </span>
                                </motion.div>
                                <motion.h1
                                    variants={itemVariants}
                                    className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
                                >
                                    Recently Viewed
                                </motion.h1>
                                <motion.p
                                    variants={itemVariants}
                                    className="mt-1 text-lg text-gray-600 dark:text-gray-400"
                                >
                                    Keep track of your K-pop journey
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-8 dark:from-gray-900 dark:to-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            href={route('dashboard')}
                            className="inline-flex items-center gap-2 rounded-lg bg-white/80 px-3 py-1.5 text-sm font-medium text-purple-600 backdrop-blur-sm transition-all duration-300 hover:bg-purple-50/80 dark:bg-gray-800/80 dark:text-purple-400 dark:hover:bg-purple-900/30"
                        >
                            <ArrowLeftIcon className="h-4 w-4" />
                            Back to Dashboard
                        </Link>
                    </div>

                    {/* Stats Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
                    >
                        {stats.map((stat) => (
                            <motion.div
                                key={stat.label}
                                variants={itemVariants}
                                whileHover={{ y: -4 }}
                                className={`group overflow-hidden rounded-2xl ${stat.bg} ${stat.darkBg} p-6 shadow-sm ring-1 ${stat.ring} ${stat.darkRing} backdrop-blur-xl transition-all duration-300 hover:shadow-lg dark:shadow-none`}
                            >
                                <div
                                    className={`rounded-xl ${stat.iconBg} ${stat.darkIconBg} w-fit p-2`}
                                >
                                    <stat.icon
                                        className={`h-5 w-5 ${stat.color} ${stat.darkColor}`}
                                    />
                                </div>
                                <p
                                    className={`mt-4 text-3xl font-bold tracking-tight ${stat.color} ${stat.darkColor}`}
                                >
                                    {stat.value}
                                </p>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mt-8"
                    >
                        <RecentlyViewedSection
                            recentlyViewed={recentlyViewed}
                        />
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
}

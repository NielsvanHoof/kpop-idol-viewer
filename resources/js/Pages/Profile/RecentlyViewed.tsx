import RecentlyViewedSection from '@/Components/RecentlyViewed/RecentlyViewedSection';
import MainLayout from '@/Layouts/MainLayout';
import { RecentlyViewedItem } from '@/types/models';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ClockIcon, EyeIcon, UserIcon } from 'lucide-react';

interface RecentlyViewedProps {
    recentlyViewed: RecentlyViewedItem[];
    meta: {
        totalViews: number;
        uniqueItems: number;
        lastViewed: string;
    };
}

export default function RecentlyViewed({
    recentlyViewed,
    meta,
}: RecentlyViewedProps) {
    const { auth } = usePage().props;

    return (
        <MainLayout>
            <Head title="Recently Viewed | KPOP Project" />

            {/* Profile Header */}
            <section className="relative mb-16 h-[35vh] min-h-[250px] overflow-hidden sm:mb-20 sm:h-[40vh] sm:min-h-[300px]">
                <div className="absolute inset-0 bg-purple-600/10 dark:bg-purple-900/20" />

                <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 sm:p-6 lg:p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mx-auto max-w-7xl"
                    >
                        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="h-28 w-28 overflow-hidden rounded-full ring-4 ring-white/90 dark:ring-gray-800"
                            >
                                <img
                                    src={auth.user.profile_photo}
                                    alt={`${auth.user.name}'s Profile`}
                                    className="h-full w-full object-cover"
                                />
                            </motion.div>
                            <div>
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="inline-flex items-center rounded-full bg-purple-600 px-4 py-1 text-sm font-medium text-white"
                                >
                                    <ClockIcon className="mr-1.5 h-4 w-4" />
                                    Activity History
                                </motion.span>
                                <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                    Recently Viewed
                                </h1>
                                <p className="mt-1 text-lg text-gray-600 dark:text-gray-400">
                                    Keep track of your K-pop journey
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="min-h-screen bg-white py-8 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            href={route('dashboard')}
                            className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 transition-colors hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                        >
                            <ArrowLeftIcon className="h-4 w-4" />
                            Back to Dashboard
                        </Link>
                    </div>

                    {/* Stats Grid */}
                    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {[
                            {
                                icon: (
                                    <EyeIcon className="h-6 w-6 text-blue-500" />
                                ),
                                label: 'Total Views',
                                value: meta.totalViews,
                                bgColor: 'bg-blue-50 dark:bg-blue-900/10',
                                ringColor:
                                    'ring-blue-200 dark:ring-blue-900/30',
                            },
                            {
                                icon: (
                                    <UserIcon className="h-6 w-6 text-green-500" />
                                ),
                                label: 'Unique Items',
                                value: meta.uniqueItems,
                                bgColor: 'bg-green-50 dark:bg-green-900/10',
                                ringColor:
                                    'ring-green-200 dark:ring-green-900/30',
                            },
                            {
                                icon: (
                                    <ClockIcon className="h-6 w-6 text-purple-500" />
                                ),
                                label: 'Last Viewed',
                                value: new Date(
                                    meta.lastViewed,
                                ).toLocaleDateString(),
                                bgColor: 'bg-purple-50 dark:bg-purple-900/10',
                                ringColor:
                                    'ring-purple-200 dark:ring-purple-900/30',
                            },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className={`overflow-hidden rounded-xl ${stat.bgColor} p-4 shadow-sm ring-1 ${stat.ringColor}`}
                            >
                                {stat.icon}
                                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                                    {stat.value}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8">
                        <RecentlyViewedSection
                            recentlyViewed={recentlyViewed}
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

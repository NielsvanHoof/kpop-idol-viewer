import IdolCard from '@/Components/Idols/Overview/IdolCard';
import AuthLayout from '@/Layouts/AuthLayout';
import { Idol } from '@/types/models';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeftIcon,
    CalendarIcon,
    HeartIcon,
    UsersIcon,
} from 'lucide-react';

interface FavoritesProps {
    favorites: Idol[];
    meta: {
        totalLikes: number;
        totalFollowing: number;
        lastUpdated: string;
    };
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export default function Favorites({ favorites, meta }: FavoritesProps) {
    const stats = [
        {
            label: 'Total Likes',
            value: meta.totalLikes,
            icon: <HeartIcon className="h-6 w-6 text-red-500" />,
        },
        {
            label: 'Following',
            value: meta.totalFollowing,
            icon: <UsersIcon className="h-6 w-6 text-blue-500" />,
        },
        {
            label: 'Last Updated',
            value: new Date(meta.lastUpdated).toLocaleDateString(),
            icon: <CalendarIcon className="h-6 w-6 text-green-500" />,
        },
    ];

    return (
        <AuthLayout>
            <Head title="Favorite Idols | KPOP Project" />

            <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
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

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3"
                    >
                        <HeartIcon className="h-8 w-8 text-red-500" />
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Favorite Idols
                        </h1>
                    </motion.div>

                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Your collection of favorite K-pop idols
                    </p>

                    {/* Stats Grid */}
                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="overflow-hidden rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
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

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    >
                        {favorites.map((idol, index) => (
                            <motion.div
                                key={idol.id}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                            >
                                <IdolCard
                                    idol={idol}
                                    showLikeButton={true}
                                    isLiked={true}
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    {favorites.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-12 text-center"
                        >
                            <div className="rounded-lg bg-white p-6 shadow-lg ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                                <HeartIcon className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                                    No favorites yet
                                </h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    Start exploring idols and add them to your
                                    favorites!
                                </p>
                                <Link
                                    href={route('idols.index')}
                                    className="mt-4 inline-flex items-center rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
                                >
                                    Explore Idols
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </AuthLayout>
    );
}

import IdolCard from '@/Components/Idols/Overview/IdolCard';
import MainLayout from '@/Layouts/MainLayout';
import { Idol } from '@/types/models';
import { Head, Link } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
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

export default function Favorites({ favorites, meta }: FavoritesProps) {
    const stats = [
        {
            label: 'Total Likes',
            value: meta.totalLikes.toLocaleString(),
            icon: HeartIcon,
            color: 'text-pink-600',
            bg: 'bg-white/80',
            ring: 'ring-pink-200/50',
            darkColor: 'dark:text-pink-400',
            darkBg: 'dark:bg-gray-800/80',
            darkRing: 'dark:ring-pink-900/20',
            iconBg: 'bg-pink-100/80',
            darkIconBg: 'dark:bg-pink-900/30',
        },
        {
            label: 'Following',
            value: meta.totalFollowing.toLocaleString(),
            icon: UsersIcon,
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
            label: 'Last Updated',
            value: new Date(meta.lastUpdated).toLocaleDateString(),
            icon: CalendarIcon,
            color: 'text-blue-600',
            bg: 'bg-white/80',
            ring: 'ring-blue-200/50',
            darkColor: 'dark:text-blue-400',
            darkBg: 'dark:bg-gray-800/80',
            darkRing: 'dark:ring-blue-900/20',
            iconBg: 'bg-blue-100/80',
            darkIconBg: 'dark:bg-blue-900/30',
        },
    ];

    return (
        <MainLayout>
            <Head title="Favorite Idols | KPOP Project" />

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

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="mb-8"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center gap-3"
                        >
                            <div className="rounded-xl bg-pink-100/80 p-2 dark:bg-pink-900/30">
                                <HeartIcon className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Favorite Idols
                            </h1>
                        </motion.div>

                        <motion.p
                            variants={itemVariants}
                            className="mt-2 text-gray-600 dark:text-gray-400"
                        >
                            Your collection of favorite K-pop idols
                        </motion.p>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
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
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    >
                        {favorites.map((idol) => (
                            <motion.div
                                key={idol.id}
                                variants={itemVariants}
                                whileHover={{ y: -4 }}
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
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-12"
                        >
                            <div className="overflow-hidden rounded-2xl bg-white/80 p-8 shadow-sm ring-1 ring-gray-200/50 backdrop-blur-xl transition-all duration-300 hover:shadow-lg dark:bg-gray-800/80 dark:ring-gray-700/50 dark:hover:shadow-none">
                                <div className="mx-auto flex max-w-sm flex-col items-center text-center">
                                    <div className="rounded-xl bg-pink-100/80 p-3 dark:bg-pink-900/30">
                                        <HeartIcon className="h-8 w-8 text-pink-600 dark:text-pink-400" />
                                    </div>
                                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                                        No favorites yet
                                    </h3>
                                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                                        Start exploring idols and add them to
                                        your favorites!
                                    </p>
                                    <Link
                                        href={route('idols.index')}
                                        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
                                    >
                                        Explore Idols
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}

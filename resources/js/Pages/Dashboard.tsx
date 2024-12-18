import DashBoardFavoriteIdolCard from '@/Components/DashBoard/DashBoardFavoriteIdols';
import DashBoardProfileHeader from '@/Components/DashBoard/DashBoardProfileHeader';
import DashBoardRecentlyViewedSection from '@/Components/DashBoard/DashBoardRecentlyViewed';
import DashBoardStats from '@/Components/DashBoard/DashBoardStats';
import DashBoardTopGenres from '@/Components/DashBoard/DashBoardTopGenres';
import PersonalizedFeed from '@/Components/DashBoard/PersonalizedFeed';
import TimelineFeature from '@/Components/Timeline/TimelineFeature';
import {
    mockFollowedIdols,
    mockRecommendedTracks,
    mockTrendingArticles,
    mockUpcomingEvents,
} from '@/Data/mockDashboardData';
import { mockTimelineEvents } from '@/Data/mockTimelineData';
import AuthLayout from '@/Layouts/AuthLayout';
import { Article, Event, Idol, RecentlyViewedItem } from '@/types/models';
import { SpotifyAlbum } from '@/types/spotify';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    CalendarIcon,
    HeartIcon,
    TrendingUpIcon,
    UsersIcon,
} from 'lucide-react';

interface DashboardProps {
    liked: Idol[];
    recentlyViewed: RecentlyViewedItem[];
    stats: {
        totalLikes: number;
        totalFollowing: number;
        joinDate: string;
        activityScore: number;
        lastActive: string;
        totalViews: number;
        topGenres: string[];
    };
    recommendedTracks: SpotifyAlbum[];
    upcomingEvents: Event[];
    trendingArticles: Article[];
    followedIdols: Idol[];
}

export default function Dashboard({
    liked,
    recentlyViewed,
    stats,
    recommendedTracks,
    upcomingEvents,
    trendingArticles,
    followedIdols,
}: DashboardProps) {
    const { auth } = usePage().props;

    const statsConfig = [
        {
            icon: <HeartIcon className="h-8 w-8 text-red-500" />,
            label: 'Likes',
            value: stats.totalLikes,
            color: 'text-red-500',
        },
        {
            icon: <UsersIcon className="h-8 w-8 text-purple-500" />,
            label: 'Following',
            value: stats.totalFollowing,
            color: 'text-purple-500',
        },
        {
            icon: <TrendingUpIcon className="h-8 w-8 text-blue-500" />,
            label: 'Activity Score',
            value: stats.activityScore,
            color: 'text-blue-500',
        },
        {
            icon: <CalendarIcon className="h-8 w-8 text-green-500" />,
            label: 'Member Since',
            value: new Date(stats.joinDate).getFullYear(),
            color: 'text-green-500',
        },
    ];

    return (
        <AuthLayout>
            <Head title="My Profile | KPOP Project" />

            {/* Profile Header */}
            <DashBoardProfileHeader />

            {/* Main Content */}
            <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Stats Section */}
                    <DashBoardStats stats={statsConfig} />

                    {/* Top Genres Section */}
                    <DashBoardTopGenres topGenres={stats.topGenres} />

                    <div className="mt-8">
                        <PersonalizedFeed
                            recommendedTracks={mockRecommendedTracks}
                            upcomingEvents={mockUpcomingEvents}
                            trendingArticles={mockTrendingArticles}
                            followedIdols={mockFollowedIdols}
                        />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-12"
                    >
                        <TimelineFeature events={mockTimelineEvents} />
                    </motion.div>

                    {/* Favorites Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-12"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Favorite Idols
                            </h2>
                            <Link
                                href={route('favorites')}
                                className="text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400"
                            >
                                View all
                            </Link>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {liked.map((idol, index) => (
                                <DashBoardFavoriteIdolCard
                                    key={idol.id}
                                    idol={idol}
                                    index={index}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Recently Viewed Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-12"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Recently Viewed
                            </h2>
                            <Link
                                href={route('recently-viewed')}
                                className="text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400"
                            >
                                View all
                            </Link>
                        </div>

                        <DashBoardRecentlyViewedSection
                            recentlyViewed={recentlyViewed}
                        />
                    </motion.div>
                </div>
            </div>
        </AuthLayout>
    );
}

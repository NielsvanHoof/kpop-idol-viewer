import DashBoardProfileHeader from '@/Components/DashBoard/DashBoardProfileHeader';
import StatsCard from '@/Components/DashBoard/StatsCard';
import TimelineEvent from '@/Components/Timeline/TimelineEvent';
import { mockUpcomingEvents } from '@/Data/mockDashboardData';
import { mockTimelineEvents } from '@/Data/mockTimelineData';
import AuthLayout from '@/Layouts/AuthLayout';
import { Article, Event, Idol, RecentlyViewedItem } from '@/types/models';
import { SpotifyAlbum } from '@/types/spotify';
import { Head, Link } from '@inertiajs/react';
import { HeartIcon, TrendingUpIcon, UsersIcon } from 'lucide-react';

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
    };
    recommendedTracks: SpotifyAlbum[];
    upcomingEvents: Event[];
    trendingArticles: Article[];
    followedIdols: Idol[];
    timelineEvents: any[];
}
export default function Dashboard({
    liked,
    recentlyViewed,
    stats,
    recommendedTracks,
    upcomingEvents,
    trendingArticles,
    followedIdols,
    timelineEvents,
}: DashboardProps) {
    return (
        <AuthLayout>
            <Head title="Dashboard" />
            <DashBoardProfileHeader />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Stats Overview */}
                    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <StatsCard
                            icon={
                                <HeartIcon className="h-6 w-6 text-red-500" />
                            }
                            label="Likes"
                            value={stats.totalLikes}
                        />
                        <StatsCard
                            icon={
                                <UsersIcon className="h-6 w-6 text-purple-500" />
                            }
                            label="Following"
                            value={stats.totalFollowing}
                        />
                        <StatsCard
                            icon={
                                <TrendingUpIcon className="h-6 w-6 text-blue-500" />
                            }
                            label="Activity"
                            value={stats.activityScore}
                        />
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid gap-8 lg:grid-cols-7">
                        {/* Timeline Column */}
                        <div className="lg:col-span-4">
                            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Activity Timeline
                                    </h2>
                                </div>
                                <div className="relative">
                                    <div className="absolute left-4 h-full w-px bg-gray-200 dark:bg-gray-700" />
                                    <div className="space-y-6">
                                        {mockTimelineEvents
                                            .slice(0, 5)
                                            .map((event, index) => (
                                                <TimelineEvent
                                                    key={index}
                                                    event={event}
                                                    index={index}
                                                />
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Content */}
                        <div className="space-y-6 lg:col-span-3">
                            {/* Favorite Idols Preview */}
                            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Favorite Idols
                                    </h2>
                                    <Link
                                        href={route('favorites')}
                                        className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400"
                                    >
                                        View all
                                    </Link>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {liked.slice(0, 4).map((idol) => (
                                        <Link
                                            key={idol.id}
                                            href={route(
                                                'idols.show',
                                                idol.slug,
                                            )}
                                            className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                                        >
                                            <img
                                                src={idol.cover_photo.url}
                                                alt={idol.name}
                                                className="h-12 w-12 rounded-full object-cover"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {idol.name}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {idol.group.name}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Upcoming Events */}
                            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Upcoming Events
                                    </h2>
                                </div>
                                <div className="space-y-4">
                                    {mockUpcomingEvents
                                        .slice(0, 3)
                                        .map((event) => (
                                            <div
                                                key={event.id}
                                                className="flex items-center gap-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50"
                                            >
                                                <div className="min-w-0 flex-1">
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {event.title}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {new Date(
                                                            event.date,
                                                        ).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

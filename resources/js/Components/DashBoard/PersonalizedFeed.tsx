import { Article, Event, Idol } from '@/types/models';
import { SpotifyAlbum } from '@/types/spotify';
import { motion } from 'framer-motion';
import { TrendingUpIcon } from 'lucide-react';
import RecommendedMusic from './FeedSections/RecommendedMusic';
import TrendingNews from './FeedSections/TrendingNews';
import UpcomingEvents from './FeedSections/UpcomingEvents';

interface PersonalizedFeedProps {
    recommendedTracks: SpotifyAlbum[];
    upcomingEvents: Event[];
    trendingArticles: Article[];
    followedIdols: Idol[];
}

export default function PersonalizedFeed({
    recommendedTracks,
    upcomingEvents,
    trendingArticles,
    followedIdols,
}: PersonalizedFeedProps) {
    return (
        <div className="space-y-8   ">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
            >
                <TrendingUpIcon className="h-6 w-6 text-purple-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    For You
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Music Recommendations */}
                <RecommendedMusic tracks={recommendedTracks} />

                {/* Upcoming Events */}
                <UpcomingEvents
                    events={upcomingEvents}
                    followedIdols={followedIdols}
                />
            </div>

            {/* Trending News */}
            <TrendingNews
                articles={trendingArticles}
                followedIdols={followedIdols}
            />
        </div>
    );
}

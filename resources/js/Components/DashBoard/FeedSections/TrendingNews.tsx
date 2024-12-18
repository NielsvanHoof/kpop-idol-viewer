import { Article, Idol } from '@/types/models';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { CalendarIcon, NewspaperIcon, TrendingUpIcon } from 'lucide-react';

export default function TrendingNews({
    articles,
    followedIdols,
}: {
    articles: Article[];
    followedIdols: Idol[];
}) {
    // Filter articles related to followed idols and sort by relevance/date
    const relevantArticles = articles
        .filter((article) =>
            article.related_idols?.some((idol) =>
                followedIdols.some((followed) => followed.id === idol.id)
            )
        )
        .slice(0, 4);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <NewspaperIcon className="h-5 w-5 text-purple-500" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                        Trending News
                    </h3>
                </div>
                <Link
                    href={route('articles.index')}
                    className="text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                >
                    View all
                </Link>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {relevantArticles.map((article, index) => (
                    <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link
                            href={route('articles.show', article.slug)}
                            className="group block rounded-lg bg-gray-50 p-4 ring-1 ring-gray-200 transition-all hover:-translate-y-1 hover:shadow-md dark:bg-gray-800/50 dark:ring-gray-700"
                        >
                            <div className="aspect-video overflow-hidden rounded-lg">
                                <img
                                    src={article.cover_image}
                                    alt={article.title}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            <h4 className="mt-3 font-medium text-gray-900 dark:text-white">
                                {article.title}
                            </h4>
                            <div className="mt-2 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                    <CalendarIcon className="h-4 w-4" />
                                    {new Date(article.published_at).toLocaleDateString()}
                                </span>
                                {article.trending && (
                                    <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                                        <TrendingUpIcon className="h-4 w-4" />
                                        Trending
                                    </span>
                                )}
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
} 
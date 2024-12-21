import { Article } from '@/types/models';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { CalendarIcon, NewspaperIcon } from 'lucide-react';
import { remark } from 'remark';

interface ActivityTimelineProps {
    articles: Article[];
}

export default function DashBoardActivityTimeline({
    articles,
}: ActivityTimelineProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
        >
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <NewspaperIcon className="h-6 w-6 text-purple-500" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Recent Activity
                    </h2>
                </div>
            </div>

            <div className="relative">
                <div className="absolute left-4 top-0 h-full w-px bg-gray-200 dark:bg-gray-700" />
                <div className="space-y-6">
                    {articles.map((article, index) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-10"
                        >
                            <div className="absolute left-0 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                                <CalendarIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <Link href={route('articles.show', article.slug)}>
                                <div className="rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-700/50">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(
                                            article.created_at,
                                        ).toLocaleDateString()}
                                    </p>
                                    <h3 className="mt-1 font-medium text-gray-900 dark:text-white">
                                        {article.title}
                                    </h3>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: remark()
                                                .processSync(
                                                    article.description,
                                                )
                                                .toString(),
                                        }}
                                    />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

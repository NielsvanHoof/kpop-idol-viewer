import { Article } from '@/types/models';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { CalendarIcon, NewspaperIcon } from 'lucide-react';
import { Variants } from 'motion/react';
import { remark } from 'remark';

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
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5 },
    },
};

interface ActivityTimelineProps {
    articles: Article[];
}

export default function DashBoardActivityTimeline({
    articles,
}: ActivityTimelineProps) {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="overflow-hidden rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-gray-200/50 backdrop-blur-xl transition-all duration-300 hover:shadow-lg dark:bg-gray-800/80 dark:ring-gray-700/50 dark:hover:shadow-none"
        >
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-purple-100/80 p-2 dark:bg-purple-900/30">
                        <NewspaperIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Recent Activity
                    </h2>
                </div>
            </div>

            <div className="relative">
                <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-purple-200 via-purple-200/50 to-transparent dark:from-purple-700 dark:via-purple-700/50" />
                <div className="space-y-6">
                    {articles.map((article) => (
                        <motion.div
                            key={article.id}
                            variants={itemVariants}
                            className="relative pl-10"
                        >
                            <div className="absolute left-0 top-3 flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100/80 ring-4 ring-white/50 dark:bg-purple-900/30 dark:ring-gray-800/50">
                                <CalendarIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <Link href={route('articles.show', article.slug)}>
                                <div className="group rounded-xl bg-gray-50/80 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/80 hover:shadow-md dark:bg-gray-800/50 dark:hover:bg-gray-700/50 dark:hover:shadow-none">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(
                                            article.created_at,
                                        ).toLocaleDateString()}
                                    </p>
                                    <h3 className="mt-1 font-medium text-gray-900 transition-colors duration-300 group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                                        {article.title}
                                    </h3>
                                    <div
                                        className="mt-2 text-sm text-gray-600 dark:text-gray-300"
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

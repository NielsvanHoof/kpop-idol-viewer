import EmptyState from '@/Components/State/EmptyState';
import { NEWS_FILTERS } from '@/Consts/NEWS_FILTERS';
import MainLayout from '@/Layouts/MainLayout';
import { Article, PaginatedResponse } from '@/types/models';
import { Input } from '@headlessui/react';
import { Head } from '@inertiajs/react';
import { debounce } from 'lodash';
import { CalendarIcon, NewspaperIcon, TrendingUpIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { remark } from 'remark';

interface NewsOverviewProps {
    articles: PaginatedResponse<Article[]>;
}

export default function NewsOverview({ articles }: NewsOverviewProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = debounce((value: string) => {
        setSearchQuery(value);
        // Implement search logic
    }, 300);

    return (
        <MainLayout>
            <Head title="K-pop News & Updates | Latest K-pop News" />

            <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Hero Section with Search */}
                <section className="relative bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-24 text-white sm:px-6">
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute inset-0 bg-black/30" />
                        <div className="animate-pulse-slow absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
                    </div>

                    <div className="relative mx-auto max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                                <TrendingUpIcon className="h-4 w-4" />
                                Breaking News
                            </span>

                            <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
                                K-pop News & Updates
                            </h1>

                            <div className="mx-auto mt-8 max-w-xl">
                                <Input
                                    type="text"
                                    placeholder="Search news articles..."
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
                                    className="w-full rounded-full border-0 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:ring-2 focus:ring-white/50"
                                />
                            </div>

                            {/* Category Filters */}
                            <div className="mt-8 flex flex-wrap justify-center gap-2">
                                {NEWS_FILTERS.map((category) => (
                                    <motion.button
                                        key={category}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() =>
                                            setSelectedCategory(
                                                category.toLowerCase(),
                                            )
                                        }
                                        className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                                            selectedCategory ===
                                            category.toLowerCase()
                                                ? 'bg-white text-purple-600'
                                                : 'bg-white/10 hover:bg-white/20'
                                        }`}
                                    >
                                        {category}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* News Grid */}
                <section className="px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        {articles.data.length > 0 ? (
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {articles.data.map((article, index) => (
                                    <motion.article
                                        key={article.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
                                    >
                                        <div className="aspect-video overflow-hidden">
                                            <img
                                                src={article.cover_image}
                                                alt={article.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>

                                        <div className="p-6">
                                            <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                                                {article.type}
                                            </span>

                                            <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                                                {article.title}
                                            </h2>

                                            <p
                                                className="prose mt-3 dark:prose-invert"
                                                dangerouslySetInnerHTML={{
                                                    __html: remark
                                                        .processSync(
                                                            article.description.slice(
                                                                0,
                                                                100,
                                                            ),
                                                        )
                                                        .toString(),
                                                }}
                                            />

                                            <div className="mt-6 flex items-center justify-between">
                                                <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                    <CalendarIcon className="mr-1.5 h-4 w-4" />
                                                    {new Date(
                                                        article.created_at,
                                                    ).toLocaleDateString()}
                                                </span>

                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600 transition-colors hover:bg-purple-100 dark:bg-purple-900/10 dark:text-purple-400 dark:hover:bg-purple-900/20"
                                                >
                                                    Read More
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                icon={
                                    <NewspaperIcon className="mx-auto h-12 w-12 text-gray-400" />
                                }
                                title="No articles found"
                                message="Try adjusting your filters or search terms"
                                action={{
                                    label: 'Clear Filters',
                                    onClick: () => setSelectedCategory('all'),
                                }}
                            />
                        )}
                    </div>
                </section>
            </main>
        </MainLayout>
    );
}

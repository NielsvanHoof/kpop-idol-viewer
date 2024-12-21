import EmptyState from '@/Components/State/EmptyState';
import { NEWS_FILTERS } from '@/Consts/NEWS_FILTERS';
import MainLayout from '@/Layouts/MainLayout';
import { Article, PaginatedResponse } from '@/types/models';
import { Input } from '@headlessui/react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import { ArrowRightIcon, CalendarIcon, NewspaperIcon } from 'lucide-react';
import { useState } from 'react';

interface NewsOverviewProps {
    articles: PaginatedResponse<Article[]>;
}

export default function NewsOverview({ articles }: NewsOverviewProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = debounce((value: string) => {
        setSearchQuery(value);
    }, 300);

    return (
        <MainLayout>
            <Head title="K-pop News & Updates | Latest K-pop News" />

            <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
                {/* Hero Section with Search */}
                <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 px-4 py-24 text-white sm:px-6">
                    {/* Background Decoration */}
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                        <div className="animate-pulse-slow absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
                        <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 blur-3xl">
                            <div className="animate-pulse-slow h-72 w-72 rounded-full bg-pink-500/20" />
                        </div>
                    </div>

                    <div className="relative mx-auto max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                                Breaking News
                            </span>

                            <h1 className="mt-6 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl">
                                K-pop News & Updates
                            </h1>

                            <div className="mx-auto mt-8 max-w-xl">
                                <Input
                                    value={searchQuery}
                                    type="text"
                                    placeholder="Search news articles..."
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
                                    className="w-full rounded-full border-0 bg-white/10 px-6 py-3 text-white placeholder:text-white/60 focus:ring-2 focus:ring-white/50"
                                />
                            </div>

                            {/* Category Filters */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mt-8 flex flex-wrap justify-center gap-2"
                            >
                                {NEWS_FILTERS.map((category, index) => (
                                    <motion.button
                                        key={category}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow:
                                                '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() =>
                                            setSelectedCategory(
                                                category.toLowerCase(),
                                            )
                                        }
                                        className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                                            selectedCategory ===
                                            category.toLowerCase()
                                                ? 'bg-white text-purple-600 shadow-lg'
                                                : 'bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20'
                                        }`}
                                    >
                                        {category}
                                    </motion.button>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* News Grid */}
                <section className="px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        {articles.data.length > 0 ? (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: {
                                        opacity: 1,
                                        transition: { staggerChildren: 0.1 },
                                    },
                                    hidden: { opacity: 0 },
                                }}
                                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                            >
                                {articles.data.map((article) => (
                                    <motion.article
                                        key={article.id}
                                        variants={{
                                            visible: { opacity: 1, y: 0 },
                                            hidden: { opacity: 0, y: 20 },
                                        }}
                                        whileHover={{ y: -5 }}
                                        className="group relative overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl hover:ring-purple-200 dark:bg-gray-800/90 dark:ring-gray-700 dark:hover:ring-purple-700"
                                    >
                                        <div className="relative aspect-video overflow-hidden bg-purple-50 dark:bg-purple-900/10">
                                            {/* <img
                                                src={article.cover_image}
                                                alt={article.title}
                                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                            /> */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        </div>

                                        <div className="p-6">
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-600 ring-1 ring-purple-100 dark:bg-purple-900/10 dark:text-purple-400 dark:ring-purple-900/30">
                                                {article.type}
                                            </span>

                                            <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                                                {article.title}
                                            </h2>

                                            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                                                {article.description.slice(
                                                    0,
                                                    100,
                                                )}
                                                ...
                                            </p>

                                            <div className="mt-6 flex items-center justify-between">
                                                <span className="flex items-center rounded-full bg-purple-50 px-3 py-1 text-sm text-purple-600 ring-1 ring-purple-100 dark:bg-purple-900/10 dark:text-purple-400 dark:ring-purple-900/30">
                                                    <CalendarIcon className="mr-1.5 h-4 w-4" />
                                                    {new Date(
                                                        article.created_at,
                                                    ).toLocaleDateString()}
                                                </span>

                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:shadow-xl dark:from-purple-500 dark:to-pink-500"
                                                >
                                                    Read More
                                                    <ArrowRightIcon className="h-4 w-4" />
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </motion.div>
                        ) : (
                            <EmptyState
                                icon={
                                    <NewspaperIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
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

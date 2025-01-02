import EmptyState from '@/Components/State/EmptyState';
import { NEWS_FILTERS } from '@/Consts/NEWS_FILTERS';
import MainLayout from '@/Layouts/MainLayout';
import { Article, PaginatedResponse } from '@/types/models';
import { Input } from '@headlessui/react';
import { Head } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import { debounce } from 'lodash';
import {
    ArrowRightIcon,
    CalendarIcon,
    NewspaperIcon,
    SparklesIcon,
} from 'lucide-react';
import { useState } from 'react';

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

            <main className="min-h-screen">
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
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                            className="text-center"
                        >
                            <motion.div
                                variants={itemVariants}
                                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm"
                            >
                                <SparklesIcon className="h-5 w-5 text-purple-200" />
                                <span className="text-sm font-medium">
                                    Breaking News
                                </span>
                            </motion.div>

                            <motion.h1
                                variants={itemVariants}
                                className="mt-6 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl"
                            >
                                K-pop News & Updates
                            </motion.h1>

                            <motion.div
                                variants={itemVariants}
                                className="mx-auto mt-8 max-w-xl"
                            >
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                        <NewspaperIcon className="h-5 w-5 text-white/60" />
                                    </div>
                                    <Input
                                        value={searchQuery}
                                        type="text"
                                        placeholder="Search news articles..."
                                        onChange={(e) =>
                                            handleSearch(e.target.value)
                                        }
                                        className="w-full rounded-xl border-0 bg-white/10 py-3 pl-11 pr-4 text-white ring-1 ring-white/20 backdrop-blur-xl transition-all duration-300 placeholder:text-white/60 focus:bg-white/20 focus:ring-2 focus:ring-white/50"
                                    />
                                </div>
                            </motion.div>

                            {/* Category Filters */}
                            <motion.div
                                variants={itemVariants}
                                className="mt-8 flex flex-wrap justify-center gap-2"
                            >
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
                                        className={`rounded-xl px-6 py-2.5 text-sm font-medium shadow-lg transition-all duration-300 ${
                                            selectedCategory ===
                                            category.toLowerCase()
                                                ? 'bg-white text-purple-600'
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
                                variants={containerVariants}
                                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                            >
                                {articles.data.map((article) => (
                                    <motion.article
                                        key={article.id}
                                        variants={itemVariants}
                                        whileHover={{ y: -5 }}
                                        className="group overflow-hidden rounded-2xl bg-white/80 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:ring-purple-200/50 dark:bg-gray-800/80 dark:ring-gray-700/50 dark:hover:ring-purple-700/50"
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
                                            <motion.span
                                                whileHover={{ scale: 1.05 }}
                                                className="inline-flex items-center gap-1.5 rounded-xl bg-purple-50 px-3 py-1 text-xs font-medium text-purple-600 ring-1 ring-purple-100 transition-all duration-300 dark:bg-purple-900/10 dark:text-purple-400 dark:ring-purple-900/30"
                                            >
                                                {article.type}
                                            </motion.span>

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
                                                <motion.span
                                                    whileHover={{ scale: 1.05 }}
                                                    className="flex items-center gap-1.5 rounded-xl bg-purple-50 px-3 py-1 text-sm text-purple-600 ring-1 ring-purple-100 transition-all duration-300 dark:bg-purple-900/10 dark:text-purple-400 dark:ring-purple-900/30"
                                                >
                                                    <CalendarIcon className="h-4 w-4" />
                                                    {new Date(
                                                        article.created_at,
                                                    ).toLocaleDateString()}
                                                </motion.span>

                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl dark:from-purple-500 dark:to-pink-500"
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

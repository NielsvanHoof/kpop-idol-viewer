import SEO from '@/Components/Common/SEO';
import IdolCard from '@/Components/Idols/Overview/IdolCard';
import IdolFilters from '@/Components/Idols/Overview/IdolFilters';
import EmptyState from '@/Components/State/EmptyState';
import { useIdolOverViewFilters } from '@/Hooks/useIdolOverViewFilters';
import MainLayout from '@/Layouts/MainLayout';
import type { Idol, Like } from '@/types/models';
import { Input } from '@headlessui/react';
import { Head, usePage, WhenVisible } from '@inertiajs/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { SparklesIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface IdolWithLikes extends Idol {
    likes: Like[];
}

export default function IdolOverview({
    idols,
    currentPage,
    lastPage,
}: {
    idols: IdolWithLikes[];
    currentPage: number;
    lastPage: number;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const { auth } = usePage().props;

    const [isLiked, setIsLiked] = useState<Record<number, boolean>>(
        idols.reduce((acc: Record<number, boolean>, idol: IdolWithLikes) => {
            acc[idol.id] = auth.user
                ? idol.likes.some(
                      (like: Like) => like.user_id === auth.user?.id,
                  )
                : false;
            return acc;
        }, {}),
    );

    useEffect(() => {
        setIsLiked((prev) => ({
            ...prev,
            ...idols.reduce(
                (acc: Record<number, boolean>, idol: IdolWithLikes) => {
                    acc[idol.id] = auth.user
                        ? idol.likes.some(
                              (like) => like.user_id === auth.user?.id,
                          )
                        : false;
                    return acc;
                },
                {},
            ),
        }));
    }, [idols, auth.user]);

    const {
        filters,
        handleSearch,
        handleGenderFilter,
        handleGroupFilter,
        resetFilters,
    } = useIdolOverViewFilters();

    const handleFilterChange = (filter: string) => {
        switch (filter) {
            case 'male':
            case 'female':
                handleGenderFilter(filter);
                break;
            case 'groups':
                handleGroupFilter(true);
                break;
            case 'solo':
                handleGroupFilter(false);
                break;
            case 'all':
                resetFilters();
                break;
        }
    };

    const handleLike = useCallback(
        (idolId: number) => {
            if (isLoading) return;
            setIsLoading(true);

            axios
                .post(route('like'), {
                    type: 'idol',
                    id: idolId,
                })
                .then(() => {
                    setIsLiked((prev) => ({
                        ...prev,
                        [idolId]: true,
                    }));
                })
                .finally(() => {
                    setIsLoading(false);
                });
        },
        [isLoading],
    );

    const handleUnlike = useCallback(
        (idolId: number) => {
            if (isLoading) return;
            setIsLoading(true);

            axios
                .post(route('unlike'), {
                    type: 'idol',
                    id: idolId,
                })
                .then(() => {
                    setIsLiked((prev) => ({
                        ...prev,
                        [idolId]: false,
                    }));
                })
                .finally(() => {
                    setIsLoading(false);
                });
        },
        [isLoading],
    );

    return (
        <MainLayout>
            <Head title="K-pop Idols | Discover Amazing Artists" />
            <SEO
                title="K-pop Idols | Discover Amazing Artists"
                description="Discover amazing K-pop idols and artists. Explore their music, videos, and more."
            />

            <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
                {/* Hero Section */}
                <section className="relative bg-white/80 backdrop-blur-xl dark:bg-gray-900/80">
                    <div className="relative px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            className="mx-auto max-w-5xl text-center"
                        >
                            <motion.div className="mb-8 flex justify-center">
                                <span className="inline-flex items-center gap-2 rounded-xl bg-purple-500/10 px-4 py-2 text-purple-600 backdrop-blur-sm dark:bg-purple-500/20 dark:text-purple-400">
                                    <SparklesIcon className="h-5 w-5" />
                                    <span className="text-sm font-medium">
                                        Browse Artists
                                    </span>
                                </span>
                            </motion.div>

                            <motion.h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                                K-pop Idols & Artists
                            </motion.h1>

                            <div className="mx-auto mt-8 max-w-xl">
                                <Input
                                    type="text"
                                    placeholder="Search for an idol..."
                                    value={filters.filter.name}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) => handleSearch(e.target.value)}
                                    className="w-full rounded-2xl border-0 bg-white/80 px-4 py-3 text-gray-900 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 dark:bg-gray-800/80 dark:text-white dark:ring-gray-700/50 dark:placeholder:text-gray-500 dark:focus:ring-purple-500"
                                />
                            </div>

                            <IdolFilters
                                activeFilters={filters.activeFilters}
                                onFilterChange={handleFilterChange}
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="relative px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        {idols.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {idols.map((idol) => (
                                        <IdolCard
                                            key={idol.id}
                                            idol={idol}
                                            isLiked={isLiked[idol.id]}
                                            onLike={() => handleLike(idol.id)}
                                            onUnlike={() =>
                                                handleUnlike(idol.id)
                                            }
                                        />
                                    ))}
                                </div>

                                {currentPage < lastPage && (
                                    <div className="mt-12 flex justify-center">
                                        <WhenVisible
                                            data="idols"
                                            params={{
                                                data: {
                                                    page: currentPage + 1,
                                                },
                                                only: ['idols'],
                                            }}
                                            always
                                            buffer={500}
                                            fallback={
                                                <div className="h-16 w-16 animate-pulse rounded-xl bg-purple-500/10 p-4 dark:bg-purple-500/20">
                                                    <div className="h-full w-full rounded-lg bg-purple-500/20 dark:bg-purple-500/30" />
                                                </div>
                                            }
                                        >
                                            <div className="h-16 w-16 animate-pulse rounded-xl bg-purple-500/10 p-4 dark:bg-purple-500/20">
                                                <div className="h-full w-full rounded-lg bg-purple-500/20 dark:bg-purple-500/30" />
                                            </div>
                                        </WhenVisible>
                                    </div>
                                )}
                            </>
                        ) : (
                            <EmptyState
                                title="No idols found"
                                message="Try adjusting your search or filters to find what you're looking for."
                                action={{
                                    label: 'Clear filters',
                                    onClick: resetFilters,
                                }}
                            />
                        )}
                    </div>
                </section>
            </main>
        </MainLayout>
    );
}

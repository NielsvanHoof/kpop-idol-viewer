import IdolCard from '@/Components/Idols/Overview/IdolCard';
import IdolFilters from '@/Components/Idols/Overview/IdolFilters';
import EmptyState from '@/Components/State/EmptyState';
import { useIdolOverViewFilters } from '@/Hooks/useIdolOverViewFilters';
import MainLayout from '@/Layouts/MainLayout';
import { Idol, PaginatedResponse } from '@/types/models';
import { Input } from '@headlessui/react';
import { Head, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import { Loader2Icon, UsersIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

export default function IdolOverview({
    idols,
}: {
    idols: PaginatedResponse<Idol[]>;
}) {
    const [isLoading, setIsLoading] = useState(false);

    const { auth } = usePage().props;

    const [isLiked, setIsLiked] = useState<Record<number, boolean>>(
        idols.data.reduce((acc: Record<number, boolean>, idol) => {
            acc[idol.id] = auth.user
                ? idol.likes.some((like) => like.user_id === auth.user?.id)
                : false;
            return acc;
        }, {}),
    );

    useEffect(() => {
        setIsLiked((prev) => ({
            ...prev,
            ...idols.data.reduce((acc: Record<number, boolean>, idol) => {
                acc[idol.id] = auth.user
                    ? idol.likes.some((like) => like.user_id === auth.user?.id)
                    : false;
                return acc;
            }, {}),
        }));
    }, [idols.data, auth.user]);

    const {
        filters,
        setFilters,
        handleSearch,
        handleGenderFilter,
        handleGroupFilter,
        reloadWithParams,
    } = useIdolOverViewFilters();

    const handleLoadMore = () => {
        if (isLoading || !idols.meta.next_cursor) return;

        setIsLoading(true);

        router.reload({
            only: ['idols'],
            data: {
                cursor: idols.meta.next_cursor,
            },
            onSuccess: () => {
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            },
        });
    };

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
                setFilters((prev) => ({
                    ...prev,
                    filter: {
                        ...prev.filter,
                        gender: '',
                        has_group: undefined,
                    },
                    activeFilters: ['all'],
                }));

                reloadWithParams(new URLSearchParams(), 'visit');
                break;
            default:
                handleGenderFilter('');
                handleGroupFilter(undefined);
        }
    };

    const handleLike = useCallback(
        debounce((idol: Idol) => {
            setIsLoading(true);

            axios
                .post(`like`, {
                    type: 'idol',
                    idol_id: idol.id,
                })
                .then(() => {
                    setIsLiked((prev) => {
                        const newLiked = { ...prev };
                        newLiked[idol.id] = true;
                        return newLiked;
                    });
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }, 1000),
        [],
    );

    const handleUnlike = useCallback(
        debounce((idol: Idol) => {
            setIsLoading(true);

            axios
                .post(`unlike`, {
                    type: 'idol',
                    idol_id: idol.id,
                })
                .then(() => {
                    setIsLiked((prev) => {
                        const newLiked = { ...prev };
                        delete newLiked[idol.id];
                        return newLiked;
                    });
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }, 1000),
        [],
    );

    return (
        <MainLayout>
            <Head title="K-pop Idols | Discover Amazing Artists" />

            <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Hero Section */}
                <section className="relative bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] opacity-30 [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]" />
                    </div>

                    <div className="relative px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            className="mx-auto max-w-5xl text-center"
                        >
                            <motion.h1 className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
                                K-pop Idols & Artists
                            </motion.h1>

                            <div className="mx-auto mt-8 max-w-xl">
                                <Input
                                    type="text"
                                    placeholder="Search for an idol..."
                                    value={filters.filter?.name}
                                    onChange={handleSearch}
                                    className="w-full rounded-full border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-lg ring-1 ring-gray-200 placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 dark:focus:border-purple-500 dark:focus:ring-purple-500"
                                />
                            </div>

                            <IdolFilters
                                activeFilters={filters.activeFilters}
                                onFilterChange={handleFilterChange}
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Grid Section */}
                <section className="relative bg-gray-50 px-4 py-8 sm:py-16 lg:py-24 dark:bg-gray-900">
                    <div className="relative mx-auto max-w-7xl">
                        {idols.data.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                                    {idols.data.map((idol) => (
                                        <IdolCard
                                            isLoading={isLoading}
                                            key={idol.id}
                                            idol={idol}
                                            isLiked={isLiked[idol.id]}
                                            showLikeButton={true}
                                            onLike={handleLike}
                                            onUnlike={handleUnlike}
                                        />
                                    ))}
                                </div>

                                {idols.meta.next_cursor && (
                                    <div className="mt-8 flex justify-center">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleLoadMore}
                                            disabled={isLoading}
                                            className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-70"
                                        >
                                            {isLoading && (
                                                <Loader2Icon className="h-4 w-4 animate-spin" />
                                            )}
                                            {isLoading
                                                ? 'Loading...'
                                                : 'Load More'}
                                        </motion.button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <EmptyState
                                title="No idols found"
                                message="Try adjusting your filters or search terms to find what you're looking for."
                                icon={
                                    <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
                                }
                                action={{
                                    label: 'Clear Filters',
                                    onClick: () => handleFilterChange('all'),
                                }}
                            />
                        )}
                    </div>
                </section>
            </main>
        </MainLayout>
    );
}

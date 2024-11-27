import Guest from '@/Layouts/GuestLayout';
import { Idol, PaginatedResponse } from '@/types/models';
import { Button } from '@headlessui/react';
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function IdolOverviewPage({
    initialIdols,
}: {
    initialIdols: PaginatedResponse<Idol[]>;
}) {
    const [idols, setIdols] = useState(initialIdols.data); // Store idol list
    const [nextCursor, setNextCursor] = useState(initialIdols.meta.next_cursor); // Store next cursor
    const [loading, setLoading] = useState(false); // Loading state for "Load More" button

    const loadMore = () => {
        if (!nextCursor) return;

        setLoading(true);

        // Use Inertia to fetch new data while merging with current props
        router.get(
            `/idols?cursor=${nextCursor}`,
            {},
            {
                preserveScroll: true,
                preserveState: true,
                only: ['initialIdols'],
                onSuccess: (page) => {
                    // @ts-ignore
                    const newIdols = page.props.initialIdols.data as Idol[];
                    // @ts-ignore
                    const newCursor = page.props.initialIdols.meta.next_cursor;

                    setIdols((prev) => [...prev, ...newIdols]);
                    setNextCursor(newCursor); // Update cursor
                    setLoading(false); // Reset loading state
                },
            },
        );
    };

    return (
        <Guest>
            <Head title="Explore KPop Idols" />
            <div className="relative mt-12 min-h-screen bg-gray-900 text-gray-300 dark:bg-gray-100 dark:text-gray-800">
                {/* Hero Section */}
                <section className="px-6 py-16 text-center">
                    <motion.h1
                        className="text-4xl font-extrabold text-gray-100 md:text-5xl dark:text-gray-900"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Meet Your Idols
                    </motion.h1>
                    <motion.p
                        className="mt-4 text-lg text-gray-400 md:text-xl dark:text-gray-600"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Discover the stars that light up the KPop universe.
                    </motion.p>
                </section>

                {/* Idol Grid */}
                <section className="mx-auto max-w-6xl px-6">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {idols.map((idol) => (
                            <motion.div
                                key={idol.id}
                                className="group transform overflow-hidden rounded-lg bg-gray-800 p-6 text-gray-300 shadow-lg transition hover:scale-105 hover:shadow-pink-500/50 dark:bg-gray-200 dark:text-gray-800 dark:hover:shadow-yellow-500/50"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="relative overflow-hidden rounded-lg">
                                    <img
                                        src={idol.cover_photo}
                                        alt={idol.name}
                                        className="h-48 w-full rounded-lg object-cover shadow-md"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition group-hover:opacity-100">
                                        <p className="text-sm font-bold text-gray-200">
                                            Click to View
                                        </p>
                                    </div>
                                </div>
                                <h2 className="mt-4 text-lg font-bold text-gray-100 dark:text-gray-900">
                                    {idol.name}
                                </h2>
                                <p className="mt-2 text-sm text-gray-400 dark:text-gray-600">
                                    {idol.group.name}
                                </p>
                                <Link
                                    href={`/idols/${idol.slug}`}
                                    className="block h-full w-full"
                                >
                                    <Button className="mt-4 transform rounded-lg bg-pink-500 px-4 py-2 font-bold text-gray-900 shadow-md transition-transform hover:scale-110 hover:bg-pink-400 hover:shadow-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500/50 dark:bg-yellow-400 dark:hover:bg-yellow-300 dark:hover:shadow-yellow-400 dark:focus:ring-yellow-500/50">
                                        View Profile
                                    </Button>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Load More Button */}
                    {nextCursor && (
                        <div className="mt-12 flex justify-center">
                            <Button
                                onClick={loadMore}
                                className={`flex items-center justify-center rounded-lg bg-gray-800 px-6 py-2 font-bold text-gray-300 transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500/50 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 dark:focus:ring-yellow-500/50 ${
                                    loading
                                        ? 'cursor-not-allowed opacity-50'
                                        : ''
                                }`}
                                disabled={loading}
                            >
                                {loading && (
                                    <svg
                                        className="mr-2 h-5 w-5 animate-spin text-pink-500 dark:text-yellow-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        />
                                    </svg>
                                )}
                                {loading ? 'Loading...' : 'Load More'}
                            </Button>
                        </div>
                    )}
                </section>
            </div>
        </Guest>
    );
}

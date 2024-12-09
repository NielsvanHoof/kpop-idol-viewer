import IdolOverViewFilters from '@/Components/Idols/overview/IdolOverViewFilters';
import IdolOverViewGrid from '@/Components/Idols/overview/idolOverViewGrid';
import LoadingSpinner from '@/Components/LoadingSpinner';
import SEO from '@/Components/SEO';
import SocialShare from '@/Components/SocialShare';
import MainLayout from '@/Layouts/MainLayout';
import { Idol, PaginatedResponse } from '@/types/models';
import {
    AdjustmentsHorizontalIcon,
    ArrowPathIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function IdolOverview({
    idols,
}: {
    idols: PaginatedResponse<Idol[]>;
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!idols || !idols.data) {
            setIsError(true);
            setIsLoading(false);
        }
    }, [idols]);

    if (isLoading) {
        return (
            <MainLayout>
                <div className="flex min-h-screen items-center justify-center">
                    <LoadingSpinner />
                </div>
            </MainLayout>
        );
    }

    if (isError) {
        return (
            <MainLayout>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex min-h-screen flex-col items-center justify-center text-center"
                >
                    <ArrowPathIcon className="h-12 w-12 text-red-500" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
                        Something went wrong
                    </h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Please try refreshing the page
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 rounded-full bg-purple-600 px-6 py-2 text-white hover:bg-purple-700"
                    >
                        Refresh Page
                    </button>
                </motion.div>
            </MainLayout>
        );
    }

    if (idols.data.length === 0) {
        return (
            <MainLayout>
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="flex min-h-screen flex-col items-center justify-center space-y-4 text-center"
                >
                    <UserGroupIcon className="h-12 w-12 text-gray-400" />
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            No idols found
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 inline-flex items-center space-x-2 rounded-full bg-purple-600 px-6 py-2 text-white hover:bg-purple-700"
                    >
                        <AdjustmentsHorizontalIcon className="h-5 w-5" />
                        <span>Adjust Filters</span>
                    </button>
                </motion.div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div variants={itemVariants}>
                    <SEO
                        title="K-pop Idols & Artists | KPOP Project"
                        description="Discover and learn about your favorite K-pop idols and artists."
                    />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <SocialShare />
                </motion.div>

                {/* Hero Section */}
                <motion.div
                    variants={itemVariants}
                    className="relative overflow-hidden"
                >
                    {/* Background Decoration */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="animate-pulse-slow h-[500px] w-[800px] rounded-full bg-purple-100/50 blur-3xl filter dark:bg-purple-900/20" />
                    </div>

                    <div className="relative">
                        <IdolOverViewFilters
                            onSearch={() => {}}
                            onFilter={() => {}}
                            onSort={() => {}}
                        />
                    </div>
                </motion.div>

                {/* Grid Section */}
                <motion.div variants={itemVariants} className="relative z-10">
                    <IdolOverViewGrid idols={idols.data} />
                </motion.div>
            </motion.div>
        </MainLayout>
    );
}

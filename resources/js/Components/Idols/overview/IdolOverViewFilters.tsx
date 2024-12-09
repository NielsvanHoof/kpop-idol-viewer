import { IDOL_FILTERS } from '@/Consts/IDOL_FILTERS';
import { Input } from '@headlessui/react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';

interface IdolOverViewFiltersProps {
    onSearch: (query: string) => void;
    onFilter: (filter: string) => void;
    onSort: (sortBy: string) => void;
}

export default function IdolOverViewFilters({
    onSearch,
    onFilter,
    onSort,
}: IdolOverViewFiltersProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

    // Debounced search handler
    const debouncedSearch = debounce((query: string) => {
        onSearch(query);
    }, 300);

    useEffect(() => {
        debouncedSearch(searchQuery);
        return () => debouncedSearch.cancel();
    }, [searchQuery]);

    const handleFilterChange = (filter: string) => {
        setSelectedFilter(filter.toLowerCase());
        onFilter(filter.toLowerCase());
    };

    const handleSortChange = (value: string) => {
        setSortBy(value);
        onSort(value);
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 px-4 py-16 sm:px-6 sm:py-24">
            {/* Background Decoration */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/30" />
                <div className="animate-pulse-slow absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
            </div>

            <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 mx-auto max-w-4xl text-center"
            >
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
                >
                    Discover K-pop Artists
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 text-lg text-purple-50 sm:text-xl"
                >
                    Explore detailed profiles of your favorite K-pop idols and
                    artists
                </motion.p>

                {/* Search Bar */}
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 flex items-center justify-center"
                >
                    <div className="relative w-full max-w-2xl">
                        <Input
                            type="text"
                            placeholder="Search for idols..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-full bg-white/90 px-6 py-3 pl-12 text-gray-900 placeholder-gray-500 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-300 dark:bg-gray-800/90 dark:text-white dark:placeholder-gray-400"
                        />
                        {searchQuery ? (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <XMarkIcon className="h-5 w-5 text-gray-400" />
                            </button>
                        ) : (
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        )}
                    </div>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 flex flex-wrap items-center justify-center gap-3"
                >
                    <AnimatePresence>
                        {IDOL_FILTERS.map((filter) => (
                            <motion.button
                                key={filter}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleFilterChange(filter)}
                                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                                    selectedFilter === filter.toLowerCase()
                                        ? 'bg-white text-purple-600 shadow-lg'
                                        : 'bg-white/20 text-white hover:bg-white/30'
                                }`}
                            >
                                {filter}
                            </motion.button>
                        ))}
                    </AnimatePresence>

                    {/* Sort Dropdown */}
                    <select
                        value={sortBy}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="rounded-full bg-white/90 px-6 py-2 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-300 dark:bg-gray-800/90 dark:text-white"
                    >
                        <option value="name">Sort by Name</option>
                        <option value="group">Sort by Group</option>
                        <option value="popularity">Sort by Popularity</option>
                    </select>
                </motion.div>
            </motion.div>
        </section>
    );
}

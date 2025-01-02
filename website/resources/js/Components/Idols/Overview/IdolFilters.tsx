import { motion } from 'framer-motion';
import { HeartIcon, UserIcon, UsersIcon, XIcon } from 'lucide-react';

interface IdolFiltersProps {
    activeFilters: string[];
    onFilterChange: (filter: string) => void;
}

export default function IdolFilters({
    activeFilters,
    onFilterChange,
}: IdolFiltersProps) {
    const filters = [
        {
            id: 'all',
            name: 'All',
            icon: UsersIcon,
        },
        {
            id: 'male',
            name: 'Male',
            icon: UserIcon,
        },
        {
            id: 'female',
            name: 'Female',
            icon: UserIcon,
        },
        {
            id: 'groups',
            name: 'Groups',
            icon: UsersIcon,
        },
        {
            id: 'solo',
            name: 'Solo',
            icon: HeartIcon,
        },
    ];

    const showResetButton = !activeFilters.includes('all');

    return (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {filters.map((filter) => {
                const isActive = activeFilters.includes(filter.id);
                const Icon = filter.icon;

                return (
                    <motion.button
                        key={filter.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onFilterChange(filter.id)}
                        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                            isActive
                                ? 'bg-purple-500 text-white shadow-lg dark:bg-purple-600'
                                : 'bg-white/80 text-gray-700 shadow-md backdrop-blur-xl hover:bg-purple-500/10 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-purple-500/20'
                        }`}
                    >
                        <Icon className="h-5 w-5" />
                        {filter.name}
                    </motion.button>
                );
            })}

            {showResetButton && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onFilterChange('all')}
                    className="inline-flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-sm font-medium text-red-600 shadow-md backdrop-blur-xl transition-colors duration-200 hover:bg-red-500/20 dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/30"
                >
                    <XIcon className="h-5 w-5" />
                    Reset
                </motion.button>
            )}
        </div>
    );
}

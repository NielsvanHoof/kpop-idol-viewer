import { IDOL_FILTERS } from '@/Consts/IDOL_FILTERS';
import { motion } from 'framer-motion';
import { UserIcon, UsersIcon } from 'lucide-react';

const filterIcons: Record<string, React.ReactNode> = {
    All: <UsersIcon className="h-4 w-4" />,
    Male: <UserIcon className="h-4 w-4" />,
    Female: <UserIcon className="h-4 w-4" />,
    Groups: <UsersIcon className="h-4 w-4" />,
    Solo: <UserIcon className="h-4 w-4" />,
};

interface IdolFiltersProps {
    activeFilters: string[] | undefined;
    onFilterChange: (filter: string) => void;
}

export default function IdolFilters({
    activeFilters,
    onFilterChange,
}: IdolFiltersProps) {
    return (
        <div className="mx-auto mt-8 flex flex-wrap justify-center gap-2 px-4 sm:mt-12">
            {IDOL_FILTERS.map((filter) => (
                <motion.button
                    key={filter}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onFilterChange(filter.toLowerCase())}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 sm:px-6 ${
                        activeFilters?.includes(filter.toLowerCase())
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                            : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700'
                    }`}
                >
                    {filterIcons[filter]}
                    <span>{filter}</span>
                </motion.button>
            ))}
        </div>
    );
}

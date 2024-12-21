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
            {IDOL_FILTERS.map((filter, index) => (
                <motion.button
                    key={filter}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                        scale: 1.05,
                        boxShadow:
                            '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onFilterChange(filter.toLowerCase())}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 sm:px-6 ${
                        activeFilters?.includes(filter.toLowerCase())
                            ? 'bg-purple-600 text-white shadow-lg dark:bg-purple-600'
                            : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50 hover:ring-purple-200 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700/80 dark:hover:ring-purple-700'
                    }`}
                >
                    <span
                        className={`${
                            activeFilters?.includes(filter.toLowerCase())
                                ? 'text-white'
                                : 'text-gray-500 group-hover:text-purple-600 dark:text-gray-400 dark:group-hover:text-purple-400'
                        }`}
                    >
                        {filterIcons[filter]}
                    </span>
                    <span>{filter}</span>
                </motion.button>
            ))}
        </div>
    );
}

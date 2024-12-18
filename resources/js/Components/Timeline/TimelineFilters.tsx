import { motion } from 'framer-motion';

const TIMELINE_FILTERS = ['All', 'Debut', 'Comeback', 'Award', 'Event'];

interface TimelineFiltersProps {
    selectedType: string;
    onTypeChange: (type: string) => void;
}

export default function TimelineFilters({
    selectedType,
    onTypeChange,
}: TimelineFiltersProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {TIMELINE_FILTERS.map((filter) => (
                <motion.button
                    key={filter}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onTypeChange(filter.toLowerCase())}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        selectedType === filter.toLowerCase()
                            ? 'bg-purple-600 text-white'
                            : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700'
                    }`}
                >
                    {filter}
                </motion.button>
            ))}
        </div>
    );
} 
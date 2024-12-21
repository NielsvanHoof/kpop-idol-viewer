import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';

type AlbumType = 'all' | 'album' | 'single';

interface IdolProfileMusicFilterProps {
    selectedType: AlbumType;
    setSelectedType: Dispatch<SetStateAction<AlbumType>>;
    totalAlbums: number;
}

const filterTypes: { label: string; value: AlbumType; color: string }[] = [
    {
        label: 'All',
        value: 'all',
        color: 'bg-purple-600',
    },
    {
        label: 'Albums',
        value: 'album',
        color: 'bg-blue-600',
    },
    {
        label: 'Singles',
        value: 'single',
        color: 'bg-pink-600',
    },
];

export default function IdolProfileMusicFilter({
    selectedType,
    setSelectedType,
    totalAlbums,
}: IdolProfileMusicFilterProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
                {filterTypes.map((type, index) => (
                    <motion.button
                        key={type.value}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedType(type.value)}
                        className={`group relative overflow-hidden rounded-full px-4 py-1.5 text-xs font-medium shadow-sm transition-all duration-300 hover:shadow-md sm:px-5 sm:text-sm ${
                            selectedType === type.value
                                ? 'text-white'
                                : 'bg-white/80 text-gray-600 hover:text-gray-900 dark:bg-gray-800/80 dark:text-gray-400 dark:hover:text-white'
                        }`}
                    >
                        <span className="relative z-10">{type.label}</span>
                        <div
                            className={`absolute inset-0 ${type.color} ${
                                selectedType === type.value
                                    ? 'opacity-100'
                                    : 'opacity-0 transition-opacity duration-300 group-hover:opacity-10'
                            }`}
                        />
                    </motion.button>
                ))}
            </div>

            <motion.span
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex flex-shrink-0 items-center justify-center rounded-full bg-purple-100/80 px-3 py-1.5 text-xs font-medium text-purple-600 backdrop-blur-sm transition-colors hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400"
            >
                {totalAlbums} {totalAlbums === 1 ? 'Album' : 'Albums'}
            </motion.span>
        </div>
    );
}

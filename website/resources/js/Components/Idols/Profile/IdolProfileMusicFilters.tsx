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
        color: 'bg-amber-500',
    },
    {
        label: 'Albums',
        value: 'album',
        color: 'bg-purple-500',
    },
    {
        label: 'Singles',
        value: 'single',
        color: 'bg-pink-500',
    },
];

export default function IdolProfileMusicFilter({
    selectedType,
    setSelectedType,
    totalAlbums,
}: IdolProfileMusicFilterProps) {
    return (
        <div className="flex w-full flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-2">
                {filterTypes.map((type, index) => (
                    <motion.button
                        key={type.value}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedType(type.value)}
                        className={`group relative overflow-hidden rounded-lg px-3 py-1 text-xs font-medium shadow-sm transition-all duration-300 hover:shadow-md sm:rounded-xl sm:px-4 sm:py-1.5 sm:text-sm ${
                            selectedType === type.value
                                ? `${type.color} text-white shadow-md`
                                : 'bg-white/80 text-gray-600 backdrop-blur-sm hover:bg-white/90 dark:bg-gray-800/80 dark:text-gray-400 dark:hover:bg-gray-800/90'
                        }`}
                    >
                        {type.label}
                    </motion.button>
                ))}
            </div>

            <motion.div
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="ml-auto inline-flex shrink-0 items-center justify-center rounded-lg bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 backdrop-blur-sm transition-colors hover:bg-amber-500/20 sm:rounded-xl sm:px-4 sm:py-1.5 sm:text-sm dark:text-amber-400"
            >
                {totalAlbums} {totalAlbums === 1 ? 'Album' : 'Albums'}
            </motion.div>
        </div>
    );
}

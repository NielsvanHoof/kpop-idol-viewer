import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';

type AlbumType = 'all' | 'album' | 'single';

interface IdolProfileMusicFilterProps {
    selectedType: AlbumType;
    setSelectedType: Dispatch<SetStateAction<AlbumType>>;
    totalAlbums: number;
}

export default function IdolProfileMusicFilter({
    selectedType,
    setSelectedType,
    totalAlbums,
}: IdolProfileMusicFilterProps) {
    const filterTypes: { label: string; value: AlbumType }[] = [
        { label: 'All', value: 'all' },
        { label: 'Albums', value: 'album' },
        { label: 'Singles', value: 'single' },
    ];

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
                {filterTypes.map((type) => (
                    <motion.button
                        key={type.value}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedType(type.value)}
                        className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
                            selectedType === type.value
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                        }`}
                    >
                        {type.label}
                    </motion.button>
                ))}
            </div>
            <span className="inline-flex flex-shrink-0 items-center justify-center rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                {totalAlbums} {totalAlbums === 1 ? 'Album' : 'Albums'}
            </span>

            <div className="flex items-center justify-end gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    Powered by
                </span>
                <a
                    href="https://spotify.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                >
                    <img
                        src="https://www.vectorlogo.zone/logos/spotify/spotify-icon.svg"
                        alt="Spotify"
                        className="h-4 w-auto"
                    />
                </a>
            </div>
        </div>
    );
}

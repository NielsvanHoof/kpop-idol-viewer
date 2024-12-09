import { Idol } from '@/types/models';
import { TabPanel } from '@headlessui/react';
import {
    CalendarIcon,
    ClockIcon,
    HeartIcon,
    MusicalNoteIcon,
    PlayCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const songs = [
    {
        title: 'Song 1',
        album: 'Album 1',
        release_date: new Date(),
        duration: '3:30',
        likes: 100,
        cover_image: 'https://via.placeholder.com/150',
    },
];

export default function IdolProfileMusicPanel({ idol }: { idol: Idol }) {
    return (
        <TabPanel>
            <div className="space-y-6 sm:space-y-8">
                {/* Music Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <MusicalNoteIcon className="h-5 w-5 text-purple-500" />
                        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                            Discography
                        </h2>
                    </div>
                    <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                        10 Songs
                    </span>
                </div>

                {/* Songs Grid */}
                <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
                    {songs.map((song, index) => (
                        <motion.div
                            key={index}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.15,
                                ease: 'easeOut',
                            }}
                            className="group relative rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 transition-all hover:-translate-y-1 hover:shadow-xl sm:p-6 dark:bg-gray-800 dark:ring-gray-700"
                        >
                            <div className="flex gap-4">
                                {/* Album Cover */}
                                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-20 sm:w-20 dark:bg-gray-700">
                                    <img
                                        src={song.cover_image || ''}
                                        alt={song.title}
                                        className="h-full w-full object-cover"
                                    />
                                    <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                        <PlayCircleIcon className="h-8 w-8 text-white" />
                                    </button>
                                </div>

                                {/* Song Info */}
                                <div className="flex flex-1 flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {song.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                            {song.album}
                                        </p>
                                    </div>

                                    {/* Song Stats */}
                                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <CalendarIcon className="h-4 w-4" />
                                            {new Date(
                                                song.release_date,
                                            ).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <ClockIcon className="h-4 w-4" />
                                            {song.duration || '3:30'}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <HeartIcon className="h-4 w-4" />
                                            {song.likes || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Bar (if playing) */}
                            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                                <div className="h-full w-0 rounded-full bg-purple-500 transition-all group-hover:w-1/3" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {(!songs || songs.length === 0) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center rounded-xl bg-gray-50 py-12 dark:bg-gray-800/50"
                    >
                        <MusicalNoteIcon className="h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                            No songs available
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Check back later for new releases
                        </p>
                    </motion.div>
                )}
            </div>
        </TabPanel>
    );
}

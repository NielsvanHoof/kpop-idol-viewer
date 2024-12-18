import { SpotifyAlbum } from '@/types/spotify';
import { motion } from 'framer-motion';
import { MusicIcon, PlayIcon } from 'lucide-react';

export default function RecommendedMusic({
    tracks,
}: {
    tracks: SpotifyAlbum[];
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
        >
            <div className="flex items-center gap-2">
                <MusicIcon className="h-5 w-5 text-purple-500" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                    Recommended Music
                </h3>
            </div>

            <div className="mt-4 space-y-3">
                {tracks.map((track) => (
                    <motion.div
                        key={track.id}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50"
                    >
                        {/* <img
                            src={track.images[0].url}
                            alt={track.name}
                            className="h-12 w-12 rounded-md object-cover"
                        /> */}
                        <div className="min-w-0 flex-1">
                            <p className="truncate font-medium text-gray-900 dark:text-white">
                                {track.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {track.artists.map((a) => a.name).join(', ')}
                            </p>
                        </div>
                        <button className="rounded-full bg-purple-500 p-2 text-white hover:bg-purple-600">
                            <PlayIcon className="h-4 w-4" />
                        </button>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

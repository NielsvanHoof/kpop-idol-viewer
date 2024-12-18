import { MusicIcon } from 'lucide-react';
import { motion } from 'motion/react';

export default function DashBoardTopGenres({
    topGenres,
}: {
    topGenres: string[];
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
        >
            <div className="flex items-center gap-2">
                <MusicIcon className="h-6 w-6 text-purple-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Your Top Genres
                </h2>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
                {topGenres.map((genre, index) => (
                    <motion.span
                        key={genre}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-full bg-purple-100 px-4 py-1 text-sm font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                    >
                        {genre}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
}

import { Idol } from '@/types/models';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { HeartIcon } from 'lucide-react';

export default function DashBoardFavoriteIdolCard({
    idol,
    index,
}: {
    idol: Idol;
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-200 hover:ring-gray-300 dark:bg-gray-800 dark:ring-gray-700 dark:hover:ring-gray-600"
        >
            {/* Image Section */}
            <div className="relative aspect-[3/4] overflow-hidden">
                <img
                    src={idol.cover_photo.url}
                    alt={idol.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* View Profile Button */}
                <Link
                    href={route('idols.show', idol.slug)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                    <span className="rounded-full bg-white/20 px-6 py-2 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/30 active:scale-95">
                        View Profile
                    </span>
                </Link>
            </div>

            {/* Info Section */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {idol.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-purple-600 dark:text-purple-400">
                    {idol.group.name}
                </p>

                {/* Stats Section */}
                <div className="mt-4 flex items-center gap-4">
                    <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <HeartIcon className="h-5 w-5 text-red-500" />
                        {idol.followers.length}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

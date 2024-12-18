import { Idol } from '@/types/models';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { HeartIcon } from 'lucide-react';

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3 },
    },
};

export default function GroupProfileMembersCard({ idol }: { idol: Idol }) {
    return (
        <motion.div
            variants={itemVariants}
            className="group relative overflow-hidden rounded-lg bg-gray-50 ring-1 ring-gray-200 transition-all hover:shadow-lg active:scale-[0.98] dark:bg-gray-900 dark:ring-gray-800"
        >
            <Link
                href={route('idols.show', idol.slug)}
                className="block h-full w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
                <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                        src={idol.cover_photo.url}
                        alt={idol.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                    {/* Mobile gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100" />

                    {/* Mobile tap indicator */}
                    <div className="absolute inset-x-4 bottom-4 flex items-center justify-center sm:hidden">
                        <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                            Tap to view profile
                        </span>
                    </div>

                    {/* Desktop hover state */}
                    <div className="absolute inset-0 hidden items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:flex">
                        <span className="transform rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30">
                            View Profile
                        </span>
                    </div>
                </div>

                <div className="p-3 sm:p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h3 className="text-base font-semibold text-gray-900 group-active:text-purple-600 sm:text-lg dark:text-white dark:group-active:text-purple-400">
                                {idol.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {idol.stage_name}
                            </p>
                        </div>
                        <span className="self-start rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                            {new Date().getFullYear() -
                                new Date(idol.birth_date).getFullYear()}{' '}
                            years
                        </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                        {idol.position?.split(',').map((position) => (
                            <span
                                key={position}
                                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                            >
                                {position.trim()}
                            </span>
                        ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                        <span className="flex items-center gap-1 text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                            <HeartIcon className="h-3.5 w-3.5 text-pink-500 sm:h-4 sm:w-4" />
                            {idol.followers.length}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            Since {new Date(idol.debute_date).getFullYear()}
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

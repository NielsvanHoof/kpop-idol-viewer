import { Idol } from '@/types/models';
import { Button } from '@headlessui/react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { HeartIcon, StarIcon, UserIcon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
        Vocalist:
            'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
        Dancer: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
        Rapper: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
        Leader: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
        Visual: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
        default:
            'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300',
    };
    return colors[category] || colors.default;
};

interface IdolOverViewGridProps {
    idols: Idol[];
}

export default function IdolOverViewGrid({ idols }: IdolOverViewGridProps) {
    const [likedIdols, setLikedIdols] = useState<number[]>([]);

    const handleLike = (e: React.MouseEvent, idolId: number) => {
        e.preventDefault();
        e.stopPropagation();
        setLikedIdols((prev) =>
            prev.includes(idolId)
                ? prev.filter((id) => id !== idolId)
                : [...prev, idolId],
        );
    };

    return (
        <section className="relative bg-gray-50 px-4 py-16 sm:px-6 sm:py-24 dark:bg-gray-900">
            {/* Background Decoration */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100/50 dark:to-gray-800/50" />
            </div>

            <div className="relative mx-auto max-w-7xl">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        layout
                    >
                        {idols.map((idol) => (
                            <motion.div
                                key={idol.id}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-800"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={idol.cover_photo}
                                        alt={idol.name}
                                        className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                    {/* Like Button */}
                                    <Button
                                        onClick={(e) => handleLike(e, idol.id)}
                                        className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
                                    >
                                        <HeartIcon
                                            className={`h-5 w-5 transition-colors ${
                                                likedIdols.includes(idol.id)
                                                    ? 'text-red-500'
                                                    : 'text-gray-400 hover:text-red-500'
                                            }`}
                                        />
                                    </Button>
                                </div>

                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {idol.name}
                                    </h3>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {idol.position
                                            ?.split(',')
                                            .map((position) => (
                                                <span
                                                    key={position}
                                                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${getCategoryColor(position.trim())}`}
                                                >
                                                    {position.trim()}
                                                </span>
                                            ))}
                                    </div>
                                    <Link
                                        href={route(
                                            'groups.show',
                                            idol.group.slug,
                                        )}
                                        className="mt-2 text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                                    >
                                        {idol.group.name}
                                    </Link>

                                    <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-700">
                                        <motion.span
                                            whileHover={{ scale: 1.1 }}
                                            className="flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                                        >
                                            <HeartIcon className="mr-1 h-4 w-4 text-red-500" />
                                            {likedIdols.includes(idol.id)
                                                ? '1'
                                                : '0'}
                                        </motion.span>
                                        <motion.span
                                            whileHover={{ scale: 1.1 }}
                                            className="flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                                        >
                                            <StarIcon className="mr-1 h-4 w-4 text-yellow-500" />
                                            5
                                        </motion.span>
                                        <motion.span
                                            whileHover={{ scale: 1.1 }}
                                            className="flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                                        >
                                            <UserIcon className="mr-1 h-4 w-4 text-blue-500" />
                                            {idol.followers || '0'}
                                        </motion.span>
                                    </div>

                                    <Link
                                        href={route('idols.show', idol.slug)}
                                        className="mt-4 flex w-full items-center justify-center rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-purple-700 hover:shadow-lg dark:bg-purple-700 dark:hover:bg-purple-600"
                                    >
                                        View Profile
                                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}

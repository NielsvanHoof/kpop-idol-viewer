import { Group } from '@/types/models';
import { TabPanel } from '@headlessui/react';
import { HeartIcon, StarIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

const formerMembers = [
    {
        name: 'John Doe',
        position: 'Vocal',
    },
];

export default function GroupProfileMembersPanel({ group }: { group: Group }) {
    return (
        <TabPanel>
            <div className="space-y-6 sm:space-y-8">
                {/* Current Members */}
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-white p-4 shadow-lg sm:p-6 dark:bg-gray-800"
                >
                    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                        Current Members
                    </h2>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                        {group.idols?.map((idol, index) => (
                            <motion.div
                                key={idol.id}
                                animate={{ opacity: 1, y: 0 }}
                                className="group relative overflow-hidden rounded-lg bg-gray-50 ring-1 ring-gray-200 transition-all hover:shadow-lg dark:bg-gray-900 dark:ring-gray-800"
                            >
                                <div className="relative aspect-[3/4] overflow-hidden">
                                    <img
                                        src={idol.cover_photo}
                                        alt={idol.name}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                    {/* Desktop Profile Button Overlay */}
                                    <Link
                                        href={route('idols.show', idol.slug)}
                                        className="absolute inset-0 hidden items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:flex"
                                    >
                                        <span className="transform rounded-full bg-white/20 px-6 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30 active:scale-95">
                                            View Profile
                                        </span>
                                    </Link>

                                    {/* Mobile Touch Overlay */}
                                    <Link
                                        href={route('idols.show', idol.slug)}
                                        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 active:opacity-100 sm:hidden"
                                    >
                                        <span className="rounded-full bg-white/20 px-6 py-2 text-sm font-medium text-white backdrop-blur-sm">
                                            View Profile
                                        </span>
                                    </Link>
                                </div>

                                <div className="p-3 sm:p-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-base font-semibold text-gray-900 sm:text-lg dark:text-white">
                                                {idol.name}
                                            </h3>
                                            <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                                                {idol.stage_name}
                                            </p>
                                        </div>
                                        <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-600 sm:px-2.5 sm:py-1 dark:bg-purple-900/30 dark:text-purple-400">
                                            {new Date(
                                                idol.birth_date,
                                            ).getFullYear()}
                                        </span>
                                    </div>

                                    <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                                        {idol.position
                                            ?.split(',')
                                            .map((position) => (
                                                <span
                                                    key={position}
                                                    className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 sm:px-2.5 sm:py-1 dark:bg-gray-800 dark:text-gray-300"
                                                >
                                                    {position.trim()}
                                                </span>
                                            ))}
                                    </div>

                                    <div className="mt-3 flex items-center justify-between sm:mt-4">
                                        <div className="flex space-x-2">
                                            <span className="flex items-center gap-1 text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                                                <HeartIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                                {idol.followers}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                                                <StarIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                                4.5
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {formerMembers.length > 0 && (
                    <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="rounded-xl bg-white p-4 shadow-lg sm:p-6 dark:bg-gray-800"
                    >
                        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                            Former Members
                        </h2>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                            {formerMembers.map((member) => (
                                <div
                                    key={member.name}
                                    className="group relative overflow-hidden rounded-lg bg-gray-50 ring-1 ring-gray-200 transition-all hover:shadow-lg dark:bg-gray-900 dark:ring-gray-800"
                                >
                                    <div className="p-3 sm:p-4">
                                        <h3 className="text-base font-semibold text-gray-900 sm:text-lg dark:text-white">
                                            {member.name}
                                        </h3>
                                        <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                                            {member.position}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </TabPanel>
    );
}

import { Idol } from '@/types/models';
import { TabPanel } from '@headlessui/react';
import { motion } from 'framer-motion';
import {
    BookOpenIcon,
    CalendarIcon,
    SparklesIcon,
    StarIcon,
    TrophyIcon,
    UserCircleIcon,
} from 'lucide-react';

const personalInfoItems = [
    {
        icon: UserCircleIcon,
        label: 'Birth Name',
        getValue: (idol: Idol) => idol.name,
        color: 'bg-purple-500/90',
        iconColor: 'text-purple-100',
    },
    {
        icon: SparklesIcon,
        label: 'Stage Name',
        getValue: (idol: Idol) => idol.stage_name,
        color: 'bg-blue-500/90',
        iconColor: 'text-blue-100',
    },
    {
        icon: CalendarIcon,
        label: 'Birth Date',
        getValue: (idol: Idol) =>
            new Date(idol.birth_date).toLocaleDateString(),
        color: 'bg-pink-500/90',
        iconColor: 'text-pink-100',
    },
    {
        icon: StarIcon,
        label: 'Nationality',
        getValue: () => 'Korean',
        color: 'bg-emerald-500/90',
        iconColor: 'text-emerald-100',
    },
];

const achievements = [
    'Best Newcomer Award 2023',
    'Best Dance Performance',
    'Rising Star Award',
];

export default function IdolProfileBioPanel({ idol }: { idol: Idol }) {
    return (
        <TabPanel>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                {/* Main Content - Biography */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-8"
                >
                    <div className="overflow-hidden rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all hover:bg-white/90 dark:bg-gray-800/80 dark:hover:bg-gray-800/90">
                        <div className="flex items-center justify-between">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3"
                            >
                                <div className="rounded-full bg-purple-500 p-2.5">
                                    <BookOpenIcon className="h-5 w-5 text-white" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                                    Detailed Biography
                                </h2>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="rounded-full bg-purple-500/10 px-4 py-1 text-sm font-medium text-purple-500 backdrop-blur-xl transition-colors hover:bg-purple-500/20 dark:text-purple-400"
                            >
                                {idol.name}
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="prose mt-6 max-w-none text-gray-600 dark:prose-invert dark:text-gray-300"
                            dangerouslySetInnerHTML={{ __html: idol.bio }}
                        />

                        {/* Personal Information Grid */}
                        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {personalInfoItems.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`group relative overflow-hidden rounded-xl ${item.color} p-4 shadow-lg backdrop-blur-md transition-all hover:shadow-xl`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-white/10 p-2 backdrop-blur-xl">
                                            <item.icon
                                                className={`h-5 w-5 ${item.iconColor}`}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-white">
                                                {item.label}
                                            </h3>
                                            <p className="mt-1 text-sm text-white/90">
                                                {item.getValue(idol)}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Sidebar - Career Milestones */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-4"
                >
                    <div className="overflow-hidden rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all hover:bg-white/90 dark:bg-gray-800/80 dark:hover:bg-gray-800/90">
                        <div className="flex items-center gap-3">
                            <div className="rounded-full bg-purple-500 p-2.5">
                                <TrophyIcon className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Career Milestones
                            </h3>
                        </div>

                        <div className="mt-6 space-y-3">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center gap-3 rounded-xl bg-purple-500/10 p-4 backdrop-blur-sm transition-colors hover:bg-purple-500/20 dark:bg-purple-500/20 dark:hover:bg-purple-500/30"
                            >
                                <div className="rounded-full bg-purple-500/20 p-2 backdrop-blur-xl dark:bg-purple-500/30">
                                    <StarIcon className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                                </div>
                                <span className="text-sm text-purple-600 dark:text-purple-400">
                                    Debuted with {idol.group.name} on{' '}
                                    {new Date(
                                        idol.debute_date,
                                    ).toLocaleDateString()}
                                </span>
                            </motion.div>

                            {achievements.map((achievement, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    className="flex items-center gap-3 rounded-xl bg-purple-500/10 p-4 backdrop-blur-sm transition-colors hover:bg-purple-500/20 dark:bg-purple-500/20 dark:hover:bg-purple-500/30"
                                >
                                    <div className="rounded-full bg-purple-500/20 p-2 backdrop-blur-xl dark:bg-purple-500/30">
                                        <TrophyIcon className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                                    </div>
                                    <span className="text-sm text-purple-600 dark:text-purple-400">
                                        {achievement}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </TabPanel>
    );
}

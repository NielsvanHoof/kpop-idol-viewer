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
        color: 'bg-purple-600',
    },
    {
        icon: SparklesIcon,
        label: 'Stage Name',
        getValue: (idol: Idol) => idol.stage_name,
        color: 'bg-blue-600',
    },
    {
        icon: CalendarIcon,
        label: 'Birth Date',
        getValue: (idol: Idol) =>
            new Date(idol.birth_date).toLocaleDateString(),
        color: 'bg-pink-600',
    },
    {
        icon: StarIcon,
        label: 'Nationality',
        getValue: () => 'Korean',
        color: 'bg-emerald-600',
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
                    <div className="overflow-hidden rounded-xl bg-white/80 p-4 shadow-lg ring-1 ring-purple-200/50 backdrop-blur-md transition-all hover:shadow-xl sm:p-6 dark:bg-gray-800/80 dark:ring-purple-800/50">
                        <div className="flex items-center justify-between">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2"
                            >
                                <BookOpenIcon className="h-5 w-5 text-purple-500" />
                                <h2 className="text-xl font-bold text-purple-600 sm:text-2xl dark:text-purple-400">
                                    Detailed Biography
                                </h2>
                            </motion.div>
                            <motion.span
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-600 backdrop-blur-sm transition-colors hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400"
                            >
                                {idol.name}
                            </motion.span>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="prose mt-4 max-w-none text-gray-600 dark:prose-invert sm:mt-6 dark:text-gray-400"
                            dangerouslySetInnerHTML={{ __html: idol.bio }}
                        />

                        {/* Personal Information Grid */}
                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {personalInfoItems.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative overflow-hidden rounded-lg bg-white p-4 shadow-md ring-1 ring-purple-100 transition-all hover:shadow-lg dark:bg-gray-800 dark:ring-purple-900/30"
                                >
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2">
                                            <item.icon className="h-5 w-5 text-white" />
                                            <h3 className="font-medium text-white">
                                                {item.label}
                                            </h3>
                                        </div>
                                        <p className="mt-2 text-sm text-white">
                                            {item.getValue(idol)}
                                        </p>
                                    </div>
                                    <div
                                        className={`absolute inset-0 ${item.color} opacity-90 transition-opacity duration-300 group-hover:opacity-100`}
                                    />
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
                    <div className="overflow-hidden rounded-xl bg-white/80 p-4 shadow-lg ring-1 ring-purple-200/50 backdrop-blur-md transition-all hover:shadow-xl sm:p-6 dark:bg-gray-800/80 dark:ring-purple-800/50">
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-purple-600 dark:text-purple-400">
                            <TrophyIcon className="h-5 w-5 text-purple-500" />
                            Career Milestones
                        </h3>

                        <div className="mt-6 space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex items-start gap-2 rounded-lg bg-purple-50 p-3 ring-1 ring-purple-100 dark:bg-purple-900/10 dark:ring-purple-900/30"
                            >
                                <StarIcon className="h-5 w-5 shrink-0 text-purple-500" />
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
                                    className="flex items-start gap-2 rounded-lg bg-purple-50 p-3 ring-1 ring-purple-100 dark:bg-purple-900/10 dark:ring-purple-900/30"
                                >
                                    <TrophyIcon className="h-5 w-5 shrink-0 text-purple-500" />
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

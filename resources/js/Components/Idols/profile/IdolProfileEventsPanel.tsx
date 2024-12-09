import { Idol } from '@/types/models';
import { TabPanel } from '@headlessui/react';
import {
    CalendarIcon,
    ClockIcon,
    MapPinIcon,
    TicketIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function IdolProfileEventsPanel({ idol }: { idol: Idol }) {
    return (
        <TabPanel>
            <div className="space-y-6 sm:space-y-8">
                {/* Events Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-purple-500" />
                        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                            Upcoming Events
                        </h2>
                    </div>
                    <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                        {idol.events?.length || 0} Events
                    </span>
                </div>

                {/* Events Timeline */}
                <div className="relative space-y-4 sm:space-y-6">
                    {/* Timeline Line */}
                    <div className="absolute bottom-0 left-8 top-0 hidden w-px bg-gray-200 sm:block dark:bg-gray-700" />

                    {idol.events?.map((event, index) => (
                        <motion.div
                            key={index}
                            animate={{ opacity: 1, x: 0 }}
                            className="group relative rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl sm:p-6 dark:bg-gray-800 dark:ring-gray-700"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute -left-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 rounded-full border-4 border-white bg-purple-100 transition-colors group-hover:bg-purple-200 sm:block dark:border-gray-800 dark:bg-purple-900/30" />

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                {/* Event Info */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {event.name}
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-4">
                                        <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                                            <MapPinIcon className="h-4 w-4" />
                                            {event.venue}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                                            <ClockIcon className="h-4 w-4" />
                                            {new Date(
                                                event.date,
                                            ).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </span>
                                    </div>
                                </div>

                                {/* Event Date & Action */}
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col items-center rounded-lg bg-purple-50 px-3 py-1.5 text-center dark:bg-purple-900/10">
                                        <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                                            {new Date(
                                                event.date,
                                            ).toLocaleDateString(undefined, {
                                                month: 'short',
                                            })}
                                        </span>
                                        <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                            {new Date(event.date).getDate()}
                                        </span>
                                    </div>
                                    <motion.a
                                        href={'https://www.google.com'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-1.5 rounded-full bg-purple-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-purple-700"
                                    >
                                        <TicketIcon className="h-4 w-4" />
                                        Get Tickets
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Empty State */}
                    {(!idol.events || idol.events.length === 0) && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center justify-center rounded-xl bg-gray-50 py-12 dark:bg-gray-800/50"
                        >
                            <CalendarIcon className="h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                                No upcoming events
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Check back later for new events
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </TabPanel>
    );
}

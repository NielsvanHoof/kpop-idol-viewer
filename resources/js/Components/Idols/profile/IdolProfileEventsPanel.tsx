import EmptyState from '@/Components/State/EmptyState';
import { Idol } from '@/types/models';
import { TabPanel } from '@headlessui/react';
import { motion } from 'framer-motion';
import {
    CalendarIcon,
    ClockIcon,
    MapPinIcon,
    SparklesIcon,
    TicketIcon,
    UsersRoundIcon,
} from 'lucide-react';

export default function IdolProfileEventsPanel({ idol }: { idol: Idol }) {
    const upcomingEvents =
        idol.events?.filter((e) => new Date(e.date) > new Date()) || [];
    const pastEvents =
        idol.events?.filter((e) => new Date(e.date) <= new Date()) || [];

    return (
        <TabPanel>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                {/* Main Content - Upcoming Events */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-8"
                >
                    <div className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="h-5 w-5 text-purple-500" />
                                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                                    Upcoming Events
                                </h2>
                            </div>
                            <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                                {upcomingEvents.length} Events
                            </span>
                        </div>

                        {/* Events Timeline */}
                        <div className="relative mt-6 space-y-4">
                            {upcomingEvents.length > 0 ? (
                                upcomingEvents.map((event, index) => (
                                    <motion.div
                                        key={index}
                                        transition={{ delay: index * 0.1 }}
                                        className="group relative flex gap-4 rounded-lg bg-gray-50 p-4 ring-1 ring-gray-200 transition-all hover:-translate-y-1 hover:shadow-md dark:bg-gray-800/50 dark:ring-gray-700"
                                    >
                                        {/* Event Date */}
                                        <div className="flex flex-col items-center rounded-lg bg-purple-50 px-3 py-1.5 text-center dark:bg-purple-900/10">
                                            <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                                                {new Date(
                                                    event.date,
                                                ).toLocaleDateString(
                                                    undefined,
                                                    {
                                                        month: 'short',
                                                    },
                                                )}
                                            </span>
                                            <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                                {new Date(event.date).getDate()}
                                            </span>
                                        </div>

                                        {/* Event Details */}
                                        <div className="flex flex-1 flex-col">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                                        {event.name}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                        {event.venue}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <motion.button
                                                        onClick={() => {
                                                            window.open(
                                                                `https://www.google.com/maps/search/?api=1&query=${event.venue}`,
                                                                '_blank',
                                                            );
                                                        }}
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.95,
                                                        }}
                                                        className="flex items-center gap-1.5 rounded-full bg-gray-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-gray-700"
                                                    >
                                                        <MapPinIcon className="h-4 w-4" />
                                                        View on Map
                                                    </motion.button>
                                                    <motion.a
                                                        href="#"
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.95,
                                                        }}
                                                        className="flex items-center gap-1.5 rounded-full bg-purple-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-purple-700"
                                                    >
                                                        <TicketIcon className="h-4 w-4" />
                                                        Get Tickets
                                                    </motion.a>
                                                </div>
                                            </div>

                                            <div className="mt-2 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <ClockIcon className="h-4 w-4" />
                                                    {new Date(
                                                        event.date,
                                                    ).toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <UsersRoundIcon className="h-4 w-4" />
                                                    {event.type}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <EmptyState
                                    title="No upcoming events"
                                    message="No upcoming events are currently scheduled at this time."
                                    icon={
                                        <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    }
                                />
                            )}
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="rounded-lg bg-purple-50 p-3 text-center ring-1 ring-purple-100 sm:p-4 dark:bg-purple-900/10 dark:ring-purple-900/30"
                            >
                                <CalendarIcon className="mx-auto h-5 w-5 text-purple-600 sm:h-6 sm:w-6 dark:text-purple-400" />
                                <div className="mt-1.5 text-sm font-medium text-purple-600 sm:mt-2 dark:text-purple-400">
                                    {upcomingEvents.length} Upcoming
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="rounded-lg bg-purple-50 p-3 text-center ring-1 ring-purple-100 sm:p-4 dark:bg-purple-900/10 dark:ring-purple-900/30"
                            >
                                <UsersRoundIcon className="mx-auto h-5 w-5 text-purple-600 sm:h-6 sm:w-6 dark:text-purple-400" />
                                <div className="mt-1.5 text-sm font-medium text-purple-600 sm:mt-2 dark:text-purple-400">
                                    {pastEvents.length} Past
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="rounded-lg bg-purple-50 p-3 text-center ring-1 ring-purple-100 sm:p-4 dark:bg-purple-900/10 dark:ring-purple-900/30"
                            >
                                <TicketIcon className="mx-auto h-5 w-5 text-purple-600 sm:h-6 sm:w-6 dark:text-purple-400" />
                                <div className="mt-1.5 text-sm font-medium text-purple-600 sm:mt-2 dark:text-purple-400">
                                    {idol.events?.length || 0} Total
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Sidebar - Event Statistics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-4"
                >
                    <div className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800">
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                            <SparklesIcon className="h-5 w-5 text-purple-500" />
                            Event Details
                        </h3>
                        <dl className="mt-4 space-y-4 sm:mt-6">
                            <div className="flex justify-between">
                                <dt className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <CalendarIcon className="h-4 w-4" />
                                    Total Events
                                </dt>
                                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                    {idol.events?.length || 0}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <TicketIcon className="h-4 w-4" />
                                    Available Events
                                </dt>
                                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                    {upcomingEvents.length}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </motion.div>
            </div>
        </TabPanel>
    );
}

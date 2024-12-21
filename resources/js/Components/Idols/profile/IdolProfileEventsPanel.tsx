import EmptyState from '@/Components/State/EmptyState';
import { Event, Idol } from '@/types/models';
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

const eventStats = [
    {
        icon: CalendarIcon,
        label: 'Upcoming Events',
        getValue: (upcoming: Event[]) => `${upcoming.length} Events`,
        color: 'bg-purple-600',
    },
    {
        icon: UsersRoundIcon,
        label: 'Past Events',
        getValue: (upcoming: Event[], past: Event[]) => `${past.length} Events`,
        color: 'bg-blue-600',
    },
    {
        icon: TicketIcon,
        label: 'Total Events',
        getValue: (upcoming: Event[], past: Event[], idol: Idol) =>
            `${idol.events?.length || 0} Events`,
        color: 'bg-pink-600',
    },
];

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
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-8"
                >
                    <div className="overflow-hidden rounded-xl bg-white/80 p-4 shadow-lg ring-1 ring-purple-200/50 backdrop-blur-md transition-all hover:shadow-xl sm:p-6 dark:bg-gray-800/80 dark:ring-purple-800/50">
                        <div className="flex items-center justify-between">
                            <motion.div
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2"
                            >
                                <CalendarIcon className="h-5 w-5 text-purple-500" />
                                <h2 className="text-xl font-bold text-purple-600 sm:text-2xl dark:text-purple-400">
                                    Upcoming Events
                                </h2>
                            </motion.div>
                            <motion.span
                                animate={{ opacity: 1, scale: 1 }}
                                className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-600 backdrop-blur-sm transition-colors hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400"
                            >
                                {upcomingEvents.length} Events
                            </motion.span>
                        </div>

                        {/* Events Timeline */}
                        <div className="relative mt-6 space-y-4">
                            {upcomingEvents.length > 0 ? (
                                upcomingEvents.map((event, index) => (
                                    <motion.div
                                        key={index}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group relative overflow-hidden rounded-lg bg-white p-4 shadow-md ring-1 ring-purple-100 transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800 dark:ring-purple-900/30"
                                    >
                                        <div className="relative z-10 flex gap-4">
                                            {/* Event Date */}
                                            <div className="flex flex-col items-center rounded-lg bg-purple-50/50 px-3 py-1.5 text-center backdrop-blur-sm dark:bg-purple-900/10">
                                                <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                                                    {new Date(
                                                        event.date,
                                                    ).toLocaleDateString(
                                                        undefined,
                                                        { month: 'short' },
                                                    )}
                                                </span>
                                                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                                    {new Date(
                                                        event.date,
                                                    ).getDate()}
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
                                                            className="flex items-center gap-1.5 rounded-full bg-purple-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-purple-700"
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
                                                            className="flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-600 transition-colors hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400"
                                                        >
                                                            <TicketIcon className="h-4 w-4" />
                                                            Get Tickets
                                                        </motion.a>
                                                    </div>
                                                </div>
                                                <div className="mt-3 flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <ClockIcon className="h-4 w-4" />
                                                        {new Date(
                                                            event.date,
                                                        ).toLocaleTimeString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <EmptyState
                                        title="No upcoming events"
                                        message="Check back later for new events"
                                        icon={
                                            <CalendarIcon className="mx-auto h-12 w-12 text-purple-400" />
                                        }
                                    />
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Sidebar - Event Stats */}
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-4"
                >
                    <div className="overflow-hidden rounded-xl bg-white/80 p-4 shadow-lg ring-1 ring-purple-200/50 backdrop-blur-md transition-all hover:shadow-xl sm:p-6 dark:bg-gray-800/80 dark:ring-purple-800/50">
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-purple-600 dark:text-purple-400">
                            <SparklesIcon className="h-5 w-5 text-purple-500" />
                            Event Stats
                        </h3>

                        <div className="mt-6 grid grid-cols-1 gap-4">
                            {eventStats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative overflow-hidden rounded-lg bg-white p-4 shadow-md ring-1 ring-purple-100 transition-all hover:shadow-lg dark:bg-gray-800 dark:ring-purple-900/30"
                                >
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2">
                                            <stat.icon className="h-5 w-5 text-white" />
                                            <h3 className="font-medium text-white">
                                                {stat.label}
                                            </h3>
                                        </div>
                                        <p className="mt-2 text-sm text-white">
                                            {stat.getValue(
                                                upcomingEvents,
                                                pastEvents,
                                                idol,
                                            )}
                                        </p>
                                    </div>
                                    <div
                                        className={`absolute inset-0 ${stat.color} opacity-90 transition-opacity duration-300 group-hover:opacity-100`}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </TabPanel>
    );
}

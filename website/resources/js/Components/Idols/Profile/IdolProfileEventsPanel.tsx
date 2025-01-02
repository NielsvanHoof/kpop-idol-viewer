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
        color: 'bg-emerald-500/90',
        iconColor: 'text-emerald-100',
    },
    {
        icon: UsersRoundIcon,
        label: 'Past Events',
        getValue: (upcoming: Event[], past: Event[]) => `${past.length} Events`,
        color: 'bg-purple-500/90',
        iconColor: 'text-purple-100',
    },
    {
        icon: TicketIcon,
        label: 'Total Events',
        getValue: (upcoming: Event[], past: Event[], idol: Idol) =>
            `${idol.events?.length || 0} Events`,
        color: 'bg-pink-500/90',
        iconColor: 'text-pink-100',
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-8"
                >
                    <div className="overflow-hidden rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all hover:bg-white/90 dark:bg-gray-800/80 dark:hover:bg-gray-800/90">
                        <div className="flex items-center justify-between">
                            <motion.div
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3"
                            >
                                <div className="rounded-full bg-emerald-500 p-2.5">
                                    <CalendarIcon className="h-5 w-5 text-white" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                                    Upcoming Events
                                </h2>
                            </motion.div>
                            <motion.div
                                animate={{ opacity: 1, scale: 1 }}
                                className="rounded-full bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-500 backdrop-blur-xl transition-colors hover:bg-emerald-500/20 dark:text-emerald-400"
                            >
                                {upcomingEvents.length} Events
                            </motion.div>
                        </div>

                        {/* Events Timeline */}
                        <div className="relative mt-6 space-y-4">
                            {upcomingEvents.length > 0 ? (
                                upcomingEvents.map((event, index) => (
                                    <motion.div
                                        key={index}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group relative overflow-hidden rounded-xl bg-white/50 p-4 shadow-lg backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/60 hover:shadow-xl dark:bg-gray-800/50 dark:hover:bg-gray-800/60"
                                    >
                                        <div className="relative z-10 flex gap-4">
                                            {/* Event Date */}
                                            <div className="flex flex-col items-center rounded-xl bg-emerald-500/10 px-3 py-1.5 text-center backdrop-blur-sm dark:bg-emerald-500/20">
                                                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                                    {new Date(
                                                        event.date,
                                                    ).toLocaleDateString(
                                                        undefined,
                                                        { month: 'short' },
                                                    )}
                                                </span>
                                                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
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
                                                            className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3 py-1 text-xs font-medium text-white shadow-sm transition-all hover:bg-emerald-600 hover:shadow-md"
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
                                                            className="flex items-center gap-1.5 rounded-xl bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 shadow-sm transition-all hover:bg-emerald-500/20 hover:shadow-md dark:text-emerald-400"
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
                                            <CalendarIcon className="mx-auto h-12 w-12 text-emerald-400" />
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
                    <div className="overflow-hidden rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all hover:bg-white/90 dark:bg-gray-800/80 dark:hover:bg-gray-800/90">
                        <div className="flex items-center gap-3">
                            <div className="rounded-full bg-emerald-500 p-2.5">
                                <SparklesIcon className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Event Stats
                            </h3>
                        </div>

                        <div className="mt-6 space-y-3">
                            {eventStats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`group relative overflow-hidden rounded-xl ${stat.color} p-4 shadow-lg backdrop-blur-md transition-all hover:shadow-xl`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-white/10 p-2 backdrop-blur-xl">
                                            <stat.icon
                                                className={`h-5 w-5 ${stat.iconColor}`}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-white">
                                                {stat.label}
                                            </h3>
                                            <p className="mt-1 text-sm text-white/90">
                                                {stat.getValue(
                                                    upcomingEvents,
                                                    pastEvents,
                                                    idol,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </TabPanel>
    );
}

import EmptyState from '@/Components/State/EmptyState';
import { EventTypes, Group } from '@/types/models';
import { TabPanel } from '@headlessui/react';
import { motion, Variants } from 'framer-motion';
import {
    CalendarIcon,
    ClockIcon,
    GlobeIcon,
    MapPinIcon,
    MusicIcon,
    SparklesIcon,
    TicketIcon,
    TrendingUpIcon,
    UsersIcon,
} from 'lucide-react';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3 },
    },
};

export default function GroupProfileEventPanel({ group }: { group: Group }) {
    const eventTypes = [
        { type: 'concert', label: 'Concerts', icon: MusicIcon },
        { type: 'fanmeet', label: 'Fan Meetings', icon: UsersIcon },
        { type: 'broadcast', label: 'Broadcasts', icon: GlobeIcon },
        { type: 'release', label: 'Releases', icon: SparklesIcon },
    ];

    return (
        <TabPanel>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                {/* Main Content - Events List */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="lg:col-span-8"
                >
                    <div className="overflow-hidden rounded-2xl bg-white/80 p-4 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl transition-all duration-300 hover:bg-white/90 sm:p-6 dark:bg-gray-800/80 dark:ring-gray-700/50 dark:hover:bg-gray-800/90">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="h-5 w-5 text-purple-500" />
                                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                                    Upcoming Events
                                </h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {eventTypes.map((type) => (
                                    <span
                                        key={type.type}
                                        className="flex items-center gap-1.5 rounded-xl bg-purple-100/80 px-3 py-1 text-xs font-medium text-purple-600 backdrop-blur-sm dark:bg-purple-900/30 dark:text-purple-400"
                                    >
                                        <type.icon className="h-3.5 w-3.5" />
                                        {type.label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            {group.events.map((event) => (
                                <motion.div
                                    key={event.id}
                                    variants={itemVariants}
                                    className="group relative overflow-hidden rounded-xl bg-gray-50/80 p-4 ring-1 ring-gray-200/50 backdrop-blur-sm transition-all duration-300 hover:bg-gray-100/80 hover:shadow-lg dark:bg-gray-900/50 dark:ring-gray-700/50 dark:hover:bg-gray-900/80"
                                >
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-1">
                                                <h3 className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                                                    {event.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {event.venue}
                                                </p>
                                            </div>
                                            <span
                                                className={`rounded-xl px-3 py-1 text-xs font-medium backdrop-blur-sm ${
                                                    event.type ===
                                                    EventTypes.CONCERT
                                                        ? 'bg-green-100/80 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                                                        : event.type ===
                                                            EventTypes.FANMEETING
                                                          ? 'bg-blue-100/80 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                                                          : 'bg-gray-100/80 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400'
                                                }`}
                                            >
                                                {event.type
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    event.type.slice(1)}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                                            <span className="flex items-center gap-1.5">
                                                <CalendarIcon className="h-4 w-4" />
                                                {new Date(
                                                    event.date,
                                                ).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <ClockIcon className="h-4 w-4" />
                                                {event.created_at}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <MapPinIcon className="h-4 w-4" />
                                                {event.venue}
                                            </span>
                                            {event.venue && (
                                                <span className="flex items-center gap-1.5">
                                                    <TicketIcon className="h-4 w-4" />
                                                    {`${event.venue}`}
                                                </span>
                                            )}
                                        </div>

                                        {event.venue && (
                                            <div className="flex items-center gap-2">
                                                <motion.button
                                                    onClick={() => {
                                                        window.open(
                                                            `https://www.google.com/maps/search/?api=1&query=${event.venue}`,
                                                            '_blank',
                                                        );
                                                    }}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="flex items-center gap-1.5 rounded-xl bg-gray-600/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-gray-700 dark:bg-gray-700/90 dark:hover:bg-gray-600"
                                                >
                                                    <MapPinIcon className="h-4 w-4" />
                                                    View on Map
                                                </motion.button>
                                                {event.venue && (
                                                    <motion.a
                                                        href={event.venue}
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.95,
                                                        }}
                                                        className="flex items-center gap-1.5 rounded-xl bg-purple-600/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-purple-700 dark:bg-purple-700/90 dark:hover:bg-purple-600"
                                                    >
                                                        <TicketIcon className="h-4 w-4" />
                                                        Get Tickets
                                                    </motion.a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Empty State */}
                            {group.events_count === 0 && (
                                <EmptyState
                                    title="No upcoming events"
                                    message="Check back later for new events"
                                    icon={
                                        <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    }
                                />
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Sidebar Content */}
                <div className="space-y-6 lg:col-span-4">
                    {/* Event Stats */}
                    <motion.div
                        variants={itemVariants}
                        className="overflow-hidden rounded-2xl bg-white/80 p-4 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl transition-all duration-300 hover:bg-white/90 sm:p-6 dark:bg-gray-800/80 dark:ring-gray-700/50 dark:hover:bg-gray-800/90"
                    >
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                            <TrendingUpIcon className="h-5 w-5 text-purple-500" />
                            Event Statistics
                        </h3>
                        <dl className="mt-4 space-y-4">
                            {eventTypes.map((type) => (
                                <div
                                    key={type.type}
                                    className="group flex justify-between border-b border-gray-100 pb-2 transition-colors duration-300 last:border-0 dark:border-gray-700"
                                >
                                    <dt className="flex items-center gap-2 text-sm text-gray-600 transition-colors group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
                                        <type.icon className="h-4 w-4" />
                                        {type.label}
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                        {
                                            group.events.filter(
                                                (e) => e.type === type.type,
                                            ).length
                                        }
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </motion.div>

                    {/* Venue Map (Placeholder) */}
                    <motion.div
                        variants={itemVariants}
                        className="overflow-hidden rounded-2xl bg-white/80 p-4 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl transition-all duration-300 hover:bg-white/90 sm:p-6 dark:bg-gray-800/80 dark:ring-gray-700/50 dark:hover:bg-gray-800/90"
                    >
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                            <MapPinIcon className="h-5 w-5 text-purple-500" />
                            Event Locations
                        </h3>
                        <div className="mt-4 space-y-2">
                            {Array.from(
                                new Set(
                                    group.events.map((event) => event.venue),
                                ),
                            ).map((location) => (
                                <div
                                    key={location}
                                    className="group flex items-center justify-between rounded-xl bg-gray-50/80 px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:bg-gray-100/80 dark:bg-gray-900/50 dark:hover:bg-gray-900/80"
                                >
                                    <span className="text-sm text-gray-600 transition-colors group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
                                        {location}
                                    </span>
                                    <span className="rounded-xl bg-purple-100/80 px-3 py-1 text-xs font-medium text-purple-600 backdrop-blur-sm dark:bg-purple-900/30 dark:text-purple-400">
                                        {
                                            group.events.filter(
                                                (e) => e.venue === location,
                                            ).length
                                        }{' '}
                                        events
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </TabPanel>
    );
}

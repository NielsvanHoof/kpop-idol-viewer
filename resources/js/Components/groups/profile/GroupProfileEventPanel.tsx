import EmptyState from '@/Components/State/EmptyState';
import { EventTypes, Group } from '@/types/models';
import { TabPanel } from '@headlessui/react';
import { motion } from 'framer-motion';
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

interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    type: 'concert' | 'fanmeet' | 'broadcast' | 'release';
    ticketUrl?: string;
    capacity: number;
    status: 'upcoming' | 'ongoing' | 'completed';
    description?: string;
    venue?: string;
    price?: {
        min: number;
        max: number;
        currency: string;
    };
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
                    <div className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800">
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
                                        className="flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                                    >
                                        <type.icon className="h-3 w-3" />
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
                                    className="group relative overflow-hidden rounded-lg bg-gray-50 p-4 transition-all hover:shadow-md dark:bg-gray-900"
                                >
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-1">
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                    {event.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {event.venue}
                                                </p>
                                            </div>
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                    event.type ===
                                                    EventTypes.CONCERT
                                                        ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                                                        : event.type ===
                                                            EventTypes.FANMEETING
                                                          ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                                                          : 'bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400'
                                                }`}
                                            >
                                                {event.type
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    event.type.slice(1)}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <CalendarIcon className="h-4 w-4" />
                                                {new Date(
                                                    event.date,
                                                ).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <ClockIcon className="h-4 w-4" />
                                                {event.created_at}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPinIcon className="h-4 w-4" />
                                                {event.venue}
                                            </span>
                                            {event.venue && (
                                                <span className="flex items-center gap-1">
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
                                                    className="flex items-center gap-1.5 rounded-full bg-gray-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-gray-700"
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
                                                        className="flex items-center gap-1.5 rounded-full bg-purple-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-purple-700"
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800"
                    >
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                            <TrendingUpIcon className="h-5 w-5 text-purple-500" />
                            Event Statistics
                        </h3>
                        <dl className="mt-4 space-y-4">
                            {eventTypes.map((type) => (
                                <div
                                    key={type.type}
                                    className="flex justify-between border-b border-gray-100 pb-2 last:border-0 dark:border-gray-700"
                                >
                                    <dt className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800"
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
                                    className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-900"
                                >
                                    <span className="text-sm text-gray-900 dark:text-white">
                                        {location}
                                    </span>
                                    <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
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

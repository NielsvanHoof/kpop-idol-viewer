import { Event, Idol } from '@/types/models';
import { motion } from 'framer-motion';
import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react';

export default function UpcomingEvents({
    events,
    followedIdols,
}: {
    events: Event[];
    followedIdols: Idol[];
}) {
    const filteredEvents = events
        .filter((event) =>
            event.participants.some((participant) =>
                followedIdols.some((idol) => idol.id === participant.id)
            )
        )
        .slice(0, 3);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
        >
            <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-purple-500" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                    Upcoming Events
                </h3>
            </div>

            <div className="mt-4 space-y-4">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative flex gap-4 rounded-lg bg-gray-50 p-4 ring-1 ring-gray-200 transition-all hover:-translate-y-1 hover:shadow-md dark:bg-gray-800/50 dark:ring-gray-700"
                        >
                            {/* Event Date Box - Referenced from IdolProfileEventsPanel */}
                            <div className="flex flex-col items-center rounded-lg bg-purple-50 px-3 py-1.5 text-center dark:bg-purple-900/10">
                                <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                                    {new Date(event.date).toLocaleDateString(undefined, {
                                        month: 'short',
                                    })}
                                </span>
                                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                    {new Date(event.date).getDate()}
                                </span>
                            </div>

                            <div className="flex-1">
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                    {event.title}
                                </h4>
                                <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <MapPinIcon className="h-4 w-4" />
                                        {event.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <UsersIcon className="h-4 w-4" />
                                        {event.participants.length} Artists
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        No upcoming events for your followed artists
                    </div>
                )}
            </div>
        </motion.div>
    );
} 
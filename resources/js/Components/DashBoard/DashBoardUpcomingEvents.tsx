import { Event } from '@/types/models';
import { motion } from 'framer-motion';
import { CalendarIcon, MapPinIcon } from 'lucide-react';

interface UpcomingEventsProps {
    events: Event[];
}

export default function DashBoardUpcomingEvents({
    events,
}: UpcomingEventsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
        >
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <CalendarIcon className="h-6 w-6 text-blue-500" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Upcoming Events
                    </h2>
                </div>
            </div>

            <div className="space-y-4">
                {events.map((event, index) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">
                                    {event.name}
                                </h3>
                                <div className="mt-1 flex items-center gap-3">
                                    <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                        <CalendarIcon className="h-4 w-4" />
                                        {new Date(
                                            event.date,
                                        ).toLocaleDateString()}
                                    </span>
                                    <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                        <MapPinIcon className="h-4 w-4" />
                                        {event.location?.lat
                                            ? `${event.location.lat}, ${event.location.lng}`
                                            : 'No location'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

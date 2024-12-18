import { motion } from 'framer-motion';
import { TimelineEvent as TimelineEventType } from './TimelineFeature';

interface TimelineEventProps {
    event: TimelineEventType;
    index: number;
}

export default function TimelineEvent({ event, index }: TimelineEventProps) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex ${isEven ? 'flex-row' : 'flex-row-reverse'} items-center gap-8`}
        >
            {/* Content */}
            <div className={`w-1/2 ${isEven ? 'text-right' : 'text-left'}`}>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-lg bg-white p-6 shadow-lg ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
                >
                    <div className="flex items-center gap-2">
                        {event.artist.profile_photo && (
                            <img
                                src={event.artist.profile_photo}
                                alt={event.artist.name}
                                className="h-8 w-8 rounded-full object-cover"
                            />
                        )}
                        <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                            {event.artist.name}
                        </span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                        {event.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {event.description}
                    </p>
                    {event.media && (
                        <img
                            src={event.media}
                            alt={event.title}
                            className="mt-4 h-32 w-full rounded-lg object-cover"
                        />
                    )}
                </motion.div>
            </div>

            {/* Date Marker */}
            <div className="relative flex h-8 w-8 items-center justify-center">
                <div className="absolute h-4 w-4 rounded-full bg-purple-600 ring-4 ring-white dark:ring-gray-900" />
                <div
                    className={`absolute ${
                        isEven ? '-right-28' : '-left-28'
                    } whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-400`}
                >
                    {event.date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </div>
            </div>
        </motion.div>
    );
}

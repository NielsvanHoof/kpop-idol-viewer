import { motion } from 'framer-motion';
import { CalendarIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import TimelineEvent from './TimelineEvent';
import TimelineFilters from './TimelineFilters';

interface TimelineProps {
    events: TimelineEvent[];
}

export interface TimelineEvent {
    date: Date;
    type: 'debut' | 'comeback' | 'award' | 'event';
    title: string;
    description: string;
    media?: string;
    artist: {
        id: number;
        name: string;
        type: 'idol' | 'group';
        profile_photo?: string;
    };
}

export default function TimelineFeature({ events }: TimelineProps) {
    const [selectedType, setSelectedType] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredEvents = events
        .filter((event) => {
            if (selectedType === 'all') return true;
            return event.type === selectedType;
        })
        .filter(
            (event) =>
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.artist.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
        )
        .sort((a, b) => b.date.getTime() - a.date.getTime());

    return (
        <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <span className="inline-flex items-center rounded-full bg-purple-100 px-4 py-1 text-sm font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                        <CalendarIcon className="mr-1.5 h-4 w-4" />
                        Timeline
                    </span>
                    <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        K-pop History Timeline
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                        Track important milestones, debuts, and events in K-pop
                        history
                    </p>
                </motion.div>

                {/* Filters and Search */}
                <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <TimelineFilters
                        selectedType={selectedType}
                        onTypeChange={setSelectedType}
                    />
                    <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-full border-0 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500"
                        />
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative mt-12">
                    <div className="absolute left-1/2 h-full w-px -translate-x-1/2 bg-gray-200 dark:bg-gray-700" />
                    <div className="space-y-12">
                        {filteredEvents.map((event, index) => (
                            <TimelineEvent
                                key={index}
                                event={event}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

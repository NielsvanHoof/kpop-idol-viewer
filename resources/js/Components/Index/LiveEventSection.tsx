import { Button } from '@headlessui/react';

export default function LiveEventsSection() {
    return (
        <section className="relative mt-12 bg-gray-900 py-12 text-center transition-colors duration-500 dark:bg-gray-100">
            {/* Background Glow */}
            <div className="pointer-events-none absolute inset-0 bg-pink-500 opacity-10 blur-3xl dark:bg-yellow-400 dark:opacity-5"></div>

            {/* Heading */}
            <h2
                className="mb-4 text-3xl font-bold text-gray-100 dark:text-gray-900"
                aria-label="Next Big Event"
            >
                Next Big Event
            </h2>

            {/* Subheading */}
            <p className="mb-6 text-lg text-gray-300 dark:text-gray-600">
                Don't miss out on the live performance of the year!
            </p>

            {/* Countdown Timer */}
            <div
                className="text-5xl font-extrabold tracking-wider text-yellow-400 dark:text-yellow-500"
                aria-label="Event Countdown"
            >
                02:15:34
            </div>

            {/* Call-to-Action Button */}
            <Button
                className="mt-8 transform rounded-lg bg-pink-600 px-8 py-4 font-bold text-gray-100 shadow-lg transition-transform hover:scale-105 hover:bg-pink-500 hover:shadow-pink-500/50 focus:outline-none focus:ring-4 focus:ring-pink-500/50 dark:bg-pink-500 dark:text-gray-900 dark:hover:bg-pink-400 dark:hover:shadow-pink-300/50 dark:focus:ring-pink-300/50"
                aria-label="Reserve your spot"
            >
                Reserve Your Spot
            </Button>
        </section>
    );
}

import React from "react";
import { Button } from "@headlessui/react";

export default function LiveEventsSection() {
    return (
        <section
            className="mt-12 bg-gray-900 dark:bg-gray-100 py-12 text-center relative transition-colors duration-500"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-pink-500 opacity-10 blur-3xl pointer-events-none dark:opacity-5"></div>

            <h2 className="text-3xl font-bold text-gray-100 dark:text-gray-900 mb-4">
                Next Big Event
            </h2>
            <p className="text-lg text-gray-300 dark:text-gray-600 mb-6">
                Don't miss out on the live performance of the year!
            </p>
            <div className="text-yellow-400 dark:text-yellow-500 text-5xl font-extrabold tracking-wider">
                02:15:34
            </div>
            <Button
                className="mt-8 px-8 py-4 bg-pink-600 text-gray-100 dark:bg-pink-500 dark:text-gray-900 font-bold rounded-lg shadow-lg
                hover:bg-pink-500 dark:hover:bg-pink-400 hover:shadow-pink-500/50 dark:hover:shadow-pink-300/50
                transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-500/50"
            >
                Reserve Your Spot
            </Button>
        </section>
    );
}

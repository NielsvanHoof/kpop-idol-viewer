import { motion } from "framer-motion";
import { MusicalNoteIcon, StarIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function FeaturesSection() {
    return (
        <section
            id="features"
            className="mt-24 px-6 py-16 bg-gray-900 dark:bg-gray-100 text-center transition-colors duration-500"
        >
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <motion.div
                    className="bg-gray-800 dark:bg-gray-200 text-gray-300 dark:text-gray-800 rounded-lg p-8 shadow-lg hover:shadow-pink-500/50 dark:hover:shadow-pink-300/50 transition-transform transform"
                    whileHover={{ scale: 1.05 }}
                >
                    <MusicalNoteIcon className="h-12 w-12 text-pink-500 dark:text-pink-600 mx-auto" />
                    <h3 className="text-xl font-bold mt-6 text-gray-100 dark:text-gray-900">
                        Exclusive Music
                    </h3>
                    <p className="mt-4 text-sm text-gray-400 dark:text-gray-600">
                        Discover unreleased tracks, rare performances, and curated playlists.
                    </p>
                </motion.div>
                {/* Feature 2 */}
                <motion.div
                    className="bg-gray-800 dark:bg-gray-200 text-gray-300 dark:text-gray-800 rounded-lg p-8 shadow-lg hover:shadow-purple-500/50 dark:hover:shadow-purple-300/50 transition-transform transform"
                    whileHover={{ scale: 1.05 }}
                >
                    <StarIcon className="h-12 w-12 text-purple-500 dark:text-purple-600 mx-auto" />
                    <h3 className="text-xl font-bold mt-6 text-gray-100 dark:text-gray-900">
                        Fan Experiences
                    </h3>
                    <p className="mt-4 text-sm text-gray-400 dark:text-gray-600">
                        Exclusive behind-the-scenes content and one-on-one interactions with idols.
                    </p>
                </motion.div>
                {/* Feature 3 */}
                <motion.div
                    className="bg-gray-800 dark:bg-gray-200 text-gray-300 dark:text-gray-800 rounded-lg p-8 shadow-lg hover:shadow-yellow-500/50 dark:hover:shadow-yellow-300/50 transition-transform transform"
                    whileHover={{ scale: 1.05 }}
                >
                    <MusicalNoteIcon className="h-12 w-12 text-yellow-500 dark:text-yellow-600 mx-auto" />
                    <h3 className="text-xl font-bold mt-6 text-gray-100 dark:text-gray-900">
                        Events & Merch
                    </h3>
                    <p className="mt-4 text-sm text-gray-400 dark:text-gray-600">
                        Attend exclusive concerts and shop rare, limited-edition merchandise.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

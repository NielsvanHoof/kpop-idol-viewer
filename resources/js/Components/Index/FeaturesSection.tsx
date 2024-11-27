import { MusicalNoteIcon, StarIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

export default function FeaturesSection() {
    return (
        <section
            id="features"
            className="mt-24 bg-gray-900 px-6 py-16 text-center transition-colors duration-500 dark:bg-gray-100"
        >
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
                {/* Feature 1 */}
                <motion.div
                    className="transform rounded-lg bg-gray-800 p-8 text-gray-300 shadow-lg transition-transform hover:shadow-pink-500/50 dark:bg-gray-200 dark:text-gray-800 dark:hover:shadow-pink-300/50"
                    whileHover={{ scale: 1.05 }}
                    aria-label="Discover exclusive music"
                >
                    <MusicalNoteIcon className="mx-auto h-12 w-12 text-pink-500 dark:text-pink-600" />
                    <h3 className="mt-6 text-xl font-bold text-gray-100 dark:text-gray-900">
                        Exclusive Music
                    </h3>
                    <p className="mt-4 text-sm text-gray-400 dark:text-gray-600">
                        Discover unreleased tracks, rare performances, and
                        curated playlists.
                    </p>
                </motion.div>

                {/* Feature 2 */}
                <motion.div
                    className="transform rounded-lg bg-gray-800 p-8 text-gray-300 shadow-lg transition-transform hover:shadow-purple-500/50 dark:bg-gray-200 dark:text-gray-800 dark:hover:shadow-purple-300/50"
                    whileHover={{ scale: 1.05 }}
                    aria-label="Engage in unique fan experiences"
                >
                    <StarIcon className="mx-auto h-12 w-12 text-purple-500 dark:text-purple-600" />
                    <h3 className="mt-6 text-xl font-bold text-gray-100 dark:text-gray-900">
                        Fan Experiences
                    </h3>
                    <p className="mt-4 text-sm text-gray-400 dark:text-gray-600">
                        Exclusive behind-the-scenes content and one-on-one
                        interactions with idols.
                    </p>
                </motion.div>

                {/* Feature 3 */}
                <motion.div
                    className="transform rounded-lg bg-gray-800 p-8 text-gray-300 shadow-lg transition-transform hover:shadow-yellow-500/50 dark:bg-gray-200 dark:text-gray-800 dark:hover:shadow-yellow-300/50"
                    whileHover={{ scale: 1.05 }}
                    aria-label="Explore exclusive events and merchandise"
                >
                    <MusicalNoteIcon className="mx-auto h-12 w-12 text-yellow-500 dark:text-yellow-600" />
                    <h3 className="mt-6 text-xl font-bold text-gray-100 dark:text-gray-900">
                        Events & Merch
                    </h3>
                    <p className="mt-4 text-sm text-gray-400 dark:text-gray-600">
                        Attend exclusive concerts and shop rare, limited-edition
                        merchandise.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

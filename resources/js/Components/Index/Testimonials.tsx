import { motion } from 'framer-motion';

export default function Testimonials() {
    return (
        <section
            id="testimonials"
            className="relative mt-24 bg-gray-900 px-6 py-12 text-center transition-colors duration-500 dark:bg-gray-100"
        >
            {/* Background Glow */}
            <div className="pointer-events-none absolute inset-0 bg-pink-500 opacity-10 blur-3xl dark:opacity-5"></div>

            <div className="mx-auto max-w-4xl">
                <h2 className="mb-12 text-4xl font-bold text-gray-100 dark:text-gray-900">
                    What Fans Say
                </h2>
                <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
                    {/* Testimonial 1 */}
                    <motion.div
                        className="w-72 transform rounded-lg bg-gray-800 p-6 text-gray-300 shadow-lg transition-transform hover:shadow-pink-500/50 dark:bg-gray-200 dark:text-gray-800 dark:hover:shadow-pink-300/50"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <p className="text-sm italic text-gray-400 dark:text-gray-600">
                            "The best platform for KPop fans. I feel closer to
                            my idols than ever!"
                        </p>
                        <div className="mt-4 flex items-center justify-center">
                            <img
                                src="https://i.pravatar.cc/100"
                                alt="Fan 1"
                                className="h-10 w-10 rounded-full shadow-md"
                            />
                            <span className="ml-2 font-bold text-gray-100 dark:text-gray-900">
                                - Jisoo K.
                            </span>
                        </div>
                    </motion.div>

                    {/* Testimonial 2 */}
                    <motion.div
                        className="w-72 transform rounded-lg bg-gray-800 p-6 text-gray-300 shadow-lg transition-transform hover:shadow-purple-500/50 dark:bg-gray-200 dark:text-gray-800 dark:hover:shadow-purple-300/50"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <p className="text-sm italic text-gray-400 dark:text-gray-600">
                            "Amazing content, exclusive tracks, and a great
                            community!"
                        </p>
                        <div className="mt-4 flex items-center justify-center">
                            <img
                                src="https://i.pravatar.cc/100?img=4"
                                alt="Fan 2"
                                className="h-10 w-10 rounded-full shadow-md"
                            />
                            <span className="ml-2 font-bold text-gray-100 dark:text-gray-900">
                                - Minho T.
                            </span>
                        </div>
                    </motion.div>

                    {/* Testimonial 3 */}
                    <motion.div
                        className="w-72 transform rounded-lg bg-gray-800 p-6 text-gray-300 shadow-lg transition-transform hover:shadow-yellow-500/50 dark:bg-gray-200 dark:text-gray-800 dark:hover:shadow-yellow-300/50"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <p className="text-sm italic text-gray-400 dark:text-gray-600">
                            "Incredible platform! The live events are amazing,
                            and I love the exclusive content."
                        </p>
                        <div className="mt-4 flex items-center justify-center">
                            <img
                                src="https://i.pravatar.cc/100?img=8"
                                alt="Fan 3"
                                className="h-10 w-10 rounded-full shadow-md"
                            />
                            <span className="ml-2 font-bold text-gray-100 dark:text-gray-900">
                                - Lisa P.
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

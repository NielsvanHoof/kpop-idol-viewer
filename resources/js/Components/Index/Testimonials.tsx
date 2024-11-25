import { motion } from "framer-motion";
import React from "react";

export default function Testimonials() {
    return (
        <section
            id="testimonials"
            className="mt-24 px-6 py-12 bg-gray-900 dark:bg-gray-100 text-center relative transition-colors duration-500"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-pink-500 opacity-10 blur-3xl pointer-events-none dark:opacity-5"></div>

            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-gray-100 dark:text-gray-900 mb-12">
                    What Fans Say
                </h2>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                    {/* Testimonial 1 */}
                    <motion.div
                        className="bg-gray-800 dark:bg-gray-200 text-gray-300 dark:text-gray-800 rounded-lg p-6 shadow-lg hover:shadow-pink-500/50 dark:hover:shadow-pink-300/50 w-72 transition-transform transform"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <p className="text-sm italic text-gray-400 dark:text-gray-600">
                            "The best platform for KPop fans. I feel closer to my idols than ever!"
                        </p>
                        <div className="mt-4 flex items-center justify-center">
                            <img
                                src="https://i.pravatar.cc/100"
                                alt="Fan 1"
                                className="w-10 h-10 rounded-full shadow-md"
                            />
                            <span className="ml-2 font-bold text-gray-100 dark:text-gray-900">
                                - Jisoo K.
                            </span>
                        </div>
                    </motion.div>

                    {/* Testimonial 2 */}
                    <motion.div
                        className="bg-gray-800 dark:bg-gray-200 text-gray-300 dark:text-gray-800 rounded-lg p-6 shadow-lg hover:shadow-purple-500/50 dark:hover:shadow-purple-300/50 w-72 transition-transform transform"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <p className="text-sm italic text-gray-400 dark:text-gray-600">
                            "Amazing content, exclusive tracks, and a great community!"
                        </p>
                        <div className="mt-4 flex items-center justify-center">
                            <img
                                src="https://i.pravatar.cc/100?img=4"
                                alt="Fan 2"
                                className="w-10 h-10 rounded-full shadow-md"
                            />
                            <span className="ml-2 font-bold text-gray-100 dark:text-gray-900">
                                - Minho T.
                            </span>
                        </div>
                    </motion.div>

                    {/* Testimonial 3 */}
                    <motion.div
                        className="bg-gray-800 dark:bg-gray-200 text-gray-300 dark:text-gray-800 rounded-lg p-6 shadow-lg hover:shadow-yellow-500/50 dark:hover:shadow-yellow-300/50 w-72 transition-transform transform"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <p className="text-sm italic text-gray-400 dark:text-gray-600">
                            "Incredible platform! The live events are amazing, and I love the exclusive content."
                        </p>
                        <div className="mt-4 flex items-center justify-center">
                            <img
                                src="https://i.pravatar.cc/100?img=8"
                                alt="Fan 3"
                                className="w-10 h-10 rounded-full shadow-md"
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

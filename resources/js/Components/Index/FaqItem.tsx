import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { motion } from "framer-motion";
import React from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export default function FAQ() {
    const faqs = [
        { question: "What is KPop Universe?", answer: "A hub for exclusive KPop content and events." },
        { question: "How do I join live events?", answer: "Sign up and purchase tickets on our events page." },
        { question: "Can I connect with idols?", answer: "Yes! You can interact with idols through virtual meet-and-greets." },
    ];

    return (
        <motion.section
            id="faq"
            className="mt-24 px-6 py-12 bg-gray-900 dark:bg-gray-100 text-center relative transition-colors duration-500"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-pink-500 opacity-10 blur-3xl pointer-events-none dark:opacity-5"></div>

            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-gray-100 dark:text-gray-900 mb-6">
                    Frequently Asked Questions
                </h2>
                {faqs.map((faq, index) => (
                    <Disclosure key={index}>
                        {({ open }) => (
                            <div className="bg-gray-800 dark:bg-gray-200 text-gray-300 dark:text-gray-800 rounded-lg shadow-lg mb-4 transition-transform transform hover:scale-105 hover:shadow-pink-500/50 dark:hover:shadow-pink-300/50">
                                <DisclosureButton className="flex justify-between items-center w-full p-4 font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500/50">
                                    <span>{faq.question}</span>
                                    <ChevronUpIcon
                                        className={`h-6 w-6 transform transition-transform ${
                                            open ? "rotate-180 text-pink-500 dark:text-pink-600" : "text-gray-400 dark:text-gray-600"
                                        }`}
                                    />
                                </DisclosureButton>
                                <DisclosurePanel className="px-4 pt-2 pb-4 text-gray-400 dark:text-gray-600">
                                    {faq.answer}
                                </DisclosurePanel>
                            </div>
                        )}
                    </Disclosure>
                ))}
            </div>
        </motion.section>
    );
}

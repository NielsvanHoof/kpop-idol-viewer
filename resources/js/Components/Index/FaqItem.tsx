import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

export default function FAQ() {
    const faqs = [
        {
            question: 'What is KPop Universe?',
            answer: 'A hub for exclusive KPop content and events.',
        },
        {
            question: 'How do I join live events?',
            answer: 'Sign up and purchase tickets on our events page.',
        },
        {
            question: 'Can I connect with idols?',
            answer: 'Yes! You can interact with idols through virtual meet-and-greets.',
        },
    ];

    return (
        <motion.section
            id="faq"
            className="relative mt-24 bg-gray-900 px-6 py-12 text-center transition-colors duration-500 dark:bg-gray-100"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            {/* Background Glow */}
            <div className="pointer-events-none absolute inset-0 bg-pink-500 opacity-10 blur-3xl dark:opacity-5" />

            <div className="mx-auto max-w-4xl">
                <h2 className="mb-6 text-4xl font-bold text-gray-100 dark:text-gray-900">
                    Frequently Asked Questions
                </h2>
                {faqs.map((faq, index) => (
                    <Disclosure key={index}>
                        {({ open }) => (
                            <div className="mb-4 transform rounded-lg bg-gray-800 text-gray-300 shadow-lg transition-transform hover:scale-105 dark:bg-gray-200 dark:text-gray-800">
                                <DisclosureButton
                                    className={`flex w-full items-center justify-between p-4 font-semibold transition-all ${
                                        open
                                            ? 'bg-gray-700 dark:bg-gray-300'
                                            : 'hover:bg-gray-700 hover:dark:bg-gray-300'
                                    } rounded-lg`}
                                >
                                    <span className="text-gray-100 dark:text-gray-800">
                                        {faq.question}
                                    </span>
                                    <ChevronUpIcon
                                        className={`h-6 w-6 transform transition-transform ${
                                            open
                                                ? 'rotate-180 text-pink-500 dark:text-pink-600'
                                                : 'text-gray-400 dark:text-gray-600'
                                        }`}
                                    />
                                </DisclosureButton>
                                <DisclosurePanel className="px-4 pb-4 pt-2 text-gray-400 dark:text-gray-600">
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

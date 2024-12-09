import { Button, Input } from '@headlessui/react';
import {
    ArrowPathIcon,
    CheckCircleIcon,
    EnvelopeIcon,
    SparklesIcon,
} from '@heroicons/react/16/solid';
import { useForm } from '@inertiajs/react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

export default function NewsLetterSection() {
    const [isNewsletterSuccess, setIsNewsletterSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, post } = useForm({
        email: '',
    });

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        post('/subscribe', {
            preserveScroll: true,
            data,
            onSuccess: () => {
                setIsNewsletterSuccess(true);
                setIsLoading(false);
            },
        });
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24 dark:from-gray-900 dark:to-gray-800">
            {/* Background Decoration */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40">
                <div className="animate-pulse-slow h-[500px] w-[800px] rounded-full bg-purple-100 blur-3xl filter dark:bg-purple-900/20" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-2xl"
                >
                    <span className="mb-4 inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                        <EnvelopeIcon className="mr-1.5 h-4 w-4" />
                        Newsletter
                    </span>
                    <h2 className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                        Stay in the K-pop Loop
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-base text-gray-600 sm:text-lg dark:text-gray-400">
                        Get exclusive updates, behind-the-scenes content, and
                        special offers delivered straight to your inbox.
                    </p>
                </motion.div>

                {/* Newsletter Form */}
                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mx-auto mt-8 max-w-xl sm:mt-12"
                >
                    <form
                        onSubmit={handleNewsletterSubmit}
                        className="relative flex flex-col gap-4 sm:flex-row sm:gap-0"
                    >
                        <div className="relative flex-1">
                            <Input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                placeholder="Enter your email address"
                                className="w-full rounded-full border-2 border-gray-200 bg-white px-6 py-3 text-base text-gray-900 placeholder-gray-500 transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 sm:pr-48 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-400"
                                required
                            />
                            <div className="mt-4 sm:absolute sm:right-1 sm:top-1 sm:mt-0">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="group relative w-full overflow-hidden rounded-full bg-purple-600 px-8 py-2 text-base font-semibold text-white transition-all duration-300 hover:bg-purple-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto dark:hover:bg-purple-500"
                                >
                                    <span className="relative z-10 flex items-center justify-center">
                                        {isLoading ? (
                                            <>
                                                <ArrowPathIcon className="mr-2 h-5 w-5 animate-spin" />
                                                Subscribing...
                                            </>
                                        ) : (
                                            <>
                                                Subscribe
                                                <SparklesIcon className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                                            </>
                                        )}
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </form>
                    <AnimatePresence mode="wait">
                        {isNewsletterSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-green-600 dark:text-green-400"
                            >
                                <CheckCircleIcon className="h-5 w-5" />
                                Thanks for subscribing! Check your email for
                                confirmation. 🎉
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}

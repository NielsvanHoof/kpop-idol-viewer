import { Button, Input } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { debounce } from 'lodash';
import {
    CheckCircleIcon,
    MailIcon,
    RefreshCcwDotIcon,
    SparklesIcon,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';

export default function NewsLetterSection() {
    const [isNewsletterSuccess, setIsNewsletterSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, post } = useForm({
        email: '',
    });

    const debouncedSubmit = useCallback(
        debounce(() => {
            post('/subscribe', {
                preserveScroll: true,
                data,
                onSuccess: () => {
                    setIsNewsletterSuccess(true);
                    setIsLoading(false);
                },
                onError: () => {
                    setIsLoading(false);
                },
            });
        }, 500),
        [data],
    );

    useEffect(() => {
        return () => {
            debouncedSubmit.cancel();
        };
    }, [debouncedSubmit]);

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        debouncedSubmit();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700"
        >
            <div className="text-center lg:text-left">
                <span className="mb-4 inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                    <MailIcon className="mr-1.5 h-4 w-4" />
                    Newsletter
                </span>
                <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                    Stay in the K-pop Loop
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Get exclusive updates and special offers delivered straight
                    to your inbox.
                </p>
            </div>

            <div className="mt-6">
                <form
                    onSubmit={handleNewsletterSubmit}
                    className="flex flex-col gap-3 sm:flex-row"
                >
                    <div className="flex-1">
                        <Input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Enter your email address"
                            className="w-full rounded-lg border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-500 transition-colors focus:border-purple-500 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 dark:hover:bg-purple-500"
                    >
                        {isLoading ? (
                            <>
                                <RefreshCcwDotIcon className="mr-2 h-4 w-4 animate-spin" />
                                Subscribing...
                            </>
                        ) : (
                            <>
                                Subscribe
                                <SparklesIcon className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </form>

                <AnimatePresence mode="wait">
                    {isNewsletterSuccess && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-3 flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400"
                        >
                            <CheckCircleIcon className="h-5 w-5" />
                            Thanks for subscribing! Check your email for
                            confirmation.
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

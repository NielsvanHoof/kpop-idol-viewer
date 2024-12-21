import { Button, Input } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { debounce } from 'lodash';
import {
    CheckCircleIcon,
    MailIcon,
    RefreshCcwDotIcon,
    SparklesIcon,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

export default function NewsLetterSection() {
    const [isNewsletterSuccess, setIsNewsletterSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, post } = useForm({
        email: '',
    });

    const debouncedSubmit = useCallback(() => {
        return debounce((formData: typeof data) => {
            post('/subscribe', {
                preserveScroll: true,
                data: formData,
                onSuccess: () => {
                    setIsNewsletterSuccess(true);
                    setIsLoading(false);
                },
                onError: () => {
                    setIsLoading(false);
                },
            });
        }, 500);
    }, [post]);

    useEffect(() => {
        const submitFn = debouncedSubmit();
        return () => {
            submitFn.cancel();
        };
    }, [debouncedSubmit]);

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        debouncedSubmit()(data);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 rounded-xl bg-gray-50 p-6 sm:p-8 dark:bg-gray-800"
        >
            <div className="text-center lg:text-left">
                <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-4 inline-flex items-center rounded-full bg-purple-100 px-3 py-1.5 text-sm font-medium text-purple-700 ring-1 ring-purple-200 transition-colors hover:bg-purple-200 dark:bg-gray-700 dark:text-purple-300 dark:ring-purple-600"
                >
                    <MailIcon className="mr-1.5 h-4 w-4" />
                    Newsletter
                </motion.span>
                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-2 text-lg font-semibold text-gray-900 dark:text-white"
                >
                    Stay in the K-pop Loop
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-2 text-sm text-gray-600 dark:text-gray-300"
                >
                    Get exclusive updates and special offers delivered straight
                    to your inbox.
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
            >
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
                            className="w-full rounded-lg border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-500 transition-colors focus:border-purple-500 focus:ring-purple-500 dark:border-gray-700 dark:bg-white/5 dark:text-white dark:placeholder-gray-400"
                            required
                        />
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full overflow-hidden rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-purple-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto dark:bg-purple-600 dark:hover:bg-purple-700"
                        >
                            <span className="relative z-10 inline-flex items-center">
                                {isLoading ? (
                                    <>
                                        <RefreshCcwDotIcon className="mr-2 h-4 w-4 animate-spin" />
                                        Subscribing...
                                    </>
                                ) : (
                                    <>
                                        Subscribe
                                        <SparklesIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                                    </>
                                )}
                            </span>
                        </Button>
                    </motion.div>
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
            </motion.div>
        </motion.div>
    );
}

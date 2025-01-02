import { Button, Input } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { debounce } from 'lodash';
import {
    CheckCircleIcon,
    MailIcon,
    RefreshCcwDotIcon,
    SparklesIcon,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const containerVariants: Variants = {
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

const contentVariants: Variants = {
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3 },
    },
};

export default function NewsLetterSection() {
    const [isNewsletterSuccess, setIsNewsletterSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, post } = useForm({
        email: '',
    });

    const debouncedSubmit = useCallback(() => {
        return debounce((formData: typeof data) => {
            post(route('subscribe'), {
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mt-8 overflow-hidden rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-white/90 hover:shadow-xl sm:p-8 dark:bg-gray-800/80 dark:hover:bg-gray-800/90"
        >
            <div className="text-center lg:text-left">
                <motion.div
                    variants={contentVariants}
                    className="mb-4 flex justify-center lg:justify-start"
                >
                    <span className="inline-flex items-center gap-2 rounded-2xl bg-purple-500/10 px-4 py-2 text-purple-600 backdrop-blur-sm dark:bg-purple-500/20 dark:text-purple-400">
                        <SparklesIcon className="h-5 w-5" />
                        <span className="text-sm font-medium">Newsletter</span>
                    </span>
                </motion.div>
                <motion.h3
                    variants={contentVariants}
                    className="text-2xl font-bold text-gray-900 dark:text-white"
                >
                    Stay in the K-pop Loop
                </motion.h3>
                <motion.p
                    variants={contentVariants}
                    className="mt-2 text-base text-gray-600 dark:text-gray-300"
                >
                    Get exclusive updates and special offers delivered straight
                    to your inbox.
                </motion.p>
            </div>

            <motion.div variants={contentVariants} className="mt-6">
                <form
                    onSubmit={handleNewsletterSubmit}
                    className="flex flex-col gap-3 sm:flex-row"
                >
                    <div className="relative flex-1">
                        <Input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Enter your email address"
                            className="w-full rounded-xl border-gray-200 bg-white/80 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 shadow-sm backdrop-blur-xl transition-all duration-300 hover:bg-white/80 focus:border-purple-500 focus:bg-white/80 focus:ring-purple-500 dark:border-gray-700 dark:bg-white/5 dark:text-white dark:placeholder-gray-400 dark:hover:bg-white/10 dark:focus:bg-white/5"
                            required
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MailIcon className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full overflow-hidden rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-purple-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto dark:bg-purple-600 dark:hover:bg-purple-700"
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

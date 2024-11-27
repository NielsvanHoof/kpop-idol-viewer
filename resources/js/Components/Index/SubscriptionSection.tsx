import { Button, Input } from '@headlessui/react';

export default function SubscriptionSection() {
    return (
        <section className="relative mt-24 bg-gray-900 py-12 text-center text-gray-300 transition-colors duration-500 dark:bg-gray-100 dark:text-gray-800">
            {/* Background Glow */}
            <div className="pointer-events-none absolute inset-0 bg-yellow-500 opacity-10 blur-3xl dark:opacity-5"></div>

            <div className="mx-auto max-w-4xl">
                <h2 className="mb-4 text-3xl font-bold text-gray-100 dark:text-gray-900">
                    Stay Updated
                </h2>
                <p className="mb-6 text-lg text-gray-400 dark:text-gray-600">
                    Subscribe to our newsletter for the latest KPop news,
                    events, and more!
                </p>
                <form className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-lg bg-gray-800 px-4 py-2 text-gray-100 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 sm:w-72 dark:bg-gray-200 dark:text-gray-900 dark:focus:ring-yellow-500"
                    />
                    <Button
                        type="submit"
                        className="transform rounded-lg bg-yellow-500 px-6 py-2 font-bold text-gray-900 shadow-lg transition-transform hover:scale-105 hover:bg-yellow-400 hover:shadow-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-500/50 dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-300 dark:hover:shadow-yellow-200"
                    >
                        Subscribe
                    </Button>
                </form>
            </div>
        </section>
    );
}

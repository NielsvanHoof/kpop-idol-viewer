import { Button, Input } from "@headlessui/react";

export default function SubscriptionSection() {
    return (
        <section
            className="mt-24 bg-gray-900 dark:bg-gray-100 text-gray-300 dark:text-gray-800 py-12 text-center relative transition-colors duration-500"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-yellow-500 opacity-10 blur-3xl pointer-events-none dark:opacity-5"></div>

            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-100 dark:text-gray-900 mb-4">
                    Stay Updated
                </h2>
                <p className="mb-6 text-lg text-gray-400 dark:text-gray-600">
                    Subscribe to our newsletter for the latest KPop news, events, and
                    more!
                </p>
                <form className="flex justify-center flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        className="px-4 py-2 rounded-lg w-full sm:w-72 text-white bg-gray-800 dark:text-gray-900 dark:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-500 shadow-md"
                    />
                    <Button
                        type="submit"
                        className="bg-yellow-500 text-gray-900 dark:bg-yellow-400 dark:text-gray-900 px-6 py-2 rounded-lg font-bold shadow-lg
                        hover:bg-yellow-400 dark:hover:bg-yellow-300 hover:shadow-yellow-400 dark:hover:shadow-yellow-200
                        focus:outline-none focus:ring-4 focus:ring-yellow-500/50 transition-transform transform hover:scale-105"
                    >
                        Subscribe
                    </Button>
                </form>
            </div>
        </section>
    );
}

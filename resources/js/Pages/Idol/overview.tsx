import React from 'react';
import { motion } from 'framer-motion';
import Guest from '@/Layouts/GuestLayout';
import { Button } from '@headlessui/react';

const idols = [
    {
        id: 1,
        name: 'Jisoo Kim',
        group: 'BlackPink',
        bio: 'Lead vocalist and visual of BlackPink.',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 2,
        name: 'Taehyung Kim (V)',
        group: 'BTS',
        bio: 'Vocalist, actor, and icon in the BTS ARMY.',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 3,
        name: 'Lisa Manoban',
        group: 'BlackPink',
        bio: 'World-renowned rapper and dancer.',
        image: 'https://via.placeholder.com/150',
    },
];

export default function IdolOverviewPage() {
    return (
        <Guest>
            <div className="bg-gray-900 dark:bg-gray-100 min-h-screen text-gray-300 dark:text-gray-800 mt-12 relative">
                {/* Hero Section */}
                <section className="px-6 py-16 text-center">
                    <h1 className="text-5xl font-extrabold text-gray-100 dark:text-gray-900">
                        Meet Your Idols
                    </h1>
                    <p className="mt-4 text-lg text-gray-400 dark:text-gray-600">
                        Discover the stars that light up the KPop universe.
                    </p>
                </section>

                {/* Idol Grid */}
                <section className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {idols.map((idol) => (
                            <motion.div
                                key={idol.id}
                                className="bg-gray-800 dark:bg-gray-200 text-gray-300 dark:text-gray-800 rounded-lg shadow-lg hover:shadow-pink-500/50 dark:hover:shadow-yellow-500/50 p-6 transition-transform transform hover:scale-105"
                                whileHover={{ scale: 1.05 }}
                            >
                                <img
                                    src={idol.image}
                                    alt={idol.name}
                                    className="w-full h-48 object-cover rounded-lg shadow-md"
                                />
                                <h2 className="text-xl font-bold mt-4 text-gray-100 dark:text-gray-900">
                                    {idol.name}
                                </h2>
                                <p className="text-sm text-gray-400 dark:text-gray-600 mt-2">{idol.group}</p>
                                <p className="text-sm mt-4">{idol.bio}</p>
                                <Button
                                    className="mt-4 px-4 py-2 bg-pink-500 dark:bg-yellow-400 text-gray-900 font-bold rounded-lg shadow-md hover:bg-pink-400 dark:hover:bg-yellow-300 hover:shadow-pink-300 dark:hover:shadow-yellow-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 dark:focus:ring-yellow-500/50 transition-transform transform hover:scale-110"
                                >
                                    View More
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </Guest>
    );
}

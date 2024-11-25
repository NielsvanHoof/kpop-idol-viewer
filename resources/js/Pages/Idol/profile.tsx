import React from 'react';
import { motion } from 'framer-motion';
import Guest from '@/Layouts/GuestLayout';

export default function IdolProfilePage() {
    const idol = {
        name: 'Jisoo Kim',
        group: 'BlackPink',
        bio: 'Lead vocalist and visual of BlackPink. Known for her stunning visuals and charismatic presence, Jisoo has won hearts globally with her talent and charm.',
        image: 'https://via.placeholder.com/400x500',
        stats: {
            fans: '50M+',
            albums: '10',
            awards: '25+'
        },
        gallery: [
            'https://via.placeholder.com/150',
            'https://via.placeholder.com/150',
            'https://via.placeholder.com/150'
        ]
    };

    const merch = [
        { name: 'BlackPink T-Shirt', price: '$25', image: 'https://via.placeholder.com/150' },
        { name: 'Signed Poster', price: '$50', image: 'https://via.placeholder.com/150' },
        { name: 'Custom Keychain', price: '$10', image: 'https://via.placeholder.com/150' }
    ];

    const leaderboard = [
        { name: 'Fan1', points: '1500' },
        { name: 'Fan2', points: '1300' },
        { name: 'Fan3', points: '1100' }
    ];

    return (
        <Guest>
            <div className="bg-gray-900 text-gray-300 min-h-screen py-12 relative mt-12">
                {/* Background Glow */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-pink-500 opacity-40 blur-2xl rounded-full"
                            style={{
                                width: `${Math.random() * 20 + 10}px`,
                                height: `${Math.random() * 20 + 10}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`
                            }}
                            animate={{
                                y: [0, 50, -50, 0],
                                x: [0, -50, 50, 0]
                            }}
                            transition={{
                                duration: Math.random() * 5 + 5,
                                repeat: Infinity,
                                repeatType: 'mirror'
                            }}
                        />
                    ))}
                </div>

                {/* Hero Section */}
                <section className="max-w-5xl mx-auto px-6 text-center">
                    <motion.h1
                        className="text-5xl font-extrabold text-gray-100 relative"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {idol.name}
                        <span
                            className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent animate-pulse"></span>
                    </motion.h1>
                    <motion.p
                        className="text-lg text-gray-400 mt-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        {idol.group}
                    </motion.p>
                </section>

                {/* Profile Section */}
                <section className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <img
                            src={idol.image}
                            alt={idol.name}
                            className="w-full h-auto rounded-lg shadow-lg"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-pink-500"></div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-100">Biography</h2>
                        <p className="text-gray-400">{idol.bio}</p>
                        <div className="grid grid-cols-3 gap-4 text-center mt-6">
                            {Object.entries(idol.stats).map(([key, value]) => (
                                <div key={key}>
                                    <p className="text-2xl font-bold text-pink-500">{value}</p>
                                    <p className="text-sm text-gray-400 capitalize">{key}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Gallery Section */}
                <motion.section
                    className="max-w-6xl mx-auto px-6 mt-16"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-gray-100 mb-8 text-center">Gallery</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {idol.gallery.map((image, index) => (
                            <motion.img
                                key={index}
                                src={image}
                                alt={`Gallery Image ${index + 1}`}
                                className="w-full h-auto rounded-lg shadow-md hover:shadow-pink-500 transition-transform transform hover:scale-105"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            />
                        ))}
                    </div>
                </motion.section>

                {/* Merchandise Section */}
                <motion.section
                    className="max-w-6xl mx-auto px-6 mt-16"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-gray-100 mb-8 text-center">
                        Exclusive Merchandise
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {merch.map((item, index) => (
                            <motion.div
                                key={index}
                                className="bg-gray-800 text-gray-300 p-4 rounded-lg shadow-md hover:shadow-pink-500 transition-transform transform hover:scale-105"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-lg font-bold">{item.name}</h3>
                                <p className="text-gray-400 mt-2">{item.price}</p>
                                <button
                                    className="mt-4 px-4 py-2 bg-pink-500 text-gray-900 rounded-lg font-bold hover:bg-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-500/50 transition">
                                    Buy Now
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Fan Leaderboard */}
                <motion.section
                    className="max-w-6xl mx-auto px-6 mt-16"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-gray-100 mb-8 text-center">Top Fans</h2>
                    <ul className="space-y-4">
                        {leaderboard.map((fan, index) => (
                            <div className="relative group" key={index}>
                                <p className="text-gray-400">{fan.name}</p>
                                <p className="text-pink-500 font-bold">{fan.points} pts</p>
                                <div
                                    className="absolute left-0 bottom-full bg-gray-800 text-gray-300 text-sm p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    Top contributor this month!
                                </div>
                            </div>
                        ))}
                    </ul>
                </motion.section>

                {/* Spotify Playlist */}
                <section className="max-w-6xl mx-auto px-6 mt-16 text-center">
                    <h2 className="text-3xl font-bold text-gray-100 mb-4">Listen to BlackPink</h2>
                    <iframe
                        src="https://open.spotify.com/embed/playlist/your_playlist_id"
                        width="100%"
                        height="380"
                        className="rounded-lg shadow-lg"
                        allow="encrypted-media"
                    ></iframe>
                </section>

                {/* Fan Poll */}
                <section className="max-w-6xl mx-auto px-6 mt-16">
                    <h2 className="text-3xl font-bold text-gray-100 mb-8 text-center">Vote for Your Favorite Song</h2>
                    <form className="space-y-4 text-gray-400">
                        {['Song 1', 'Song 2', 'Song 3'].map((song, index) => (
                            <label key={index} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="favoriteSong"
                                    value={song}
                                    className="form-radio text-pink-500"
                                />
                                <span>{song}</span>
                            </label>
                        ))}
                        <button
                            className="mt-4 px-6 py-2 bg-pink-500 text-gray-900 rounded-lg font-bold hover:bg-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-500/50 transition-transform transform hover:scale-105">
                            Submit Vote
                        </button>
                    </form>
                </section>
            </div>
        </Guest>
    );
}

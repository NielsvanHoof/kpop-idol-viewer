import React from "react";

export default function SpotifyPlaylistSection() {
    return (
        <section
            className="mt-12 py-12 bg-gray-900 dark:bg-gray-100 text-center relative transition-colors duration-500"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-purple-500 opacity-10 blur-3xl pointer-events-none dark:opacity-5"></div>

            <h2 className="text-3xl font-bold text-gray-100 dark:text-gray-900 mb-4">
                Vibe with Us
            </h2>
            <p className="text-lg text-gray-300 dark:text-gray-600 mb-8">
                Enjoy the best KPop hits while exploring the universe.
            </p>
            <iframe
                src="https://open.spotify.com/embed/playlist/6vvtidxSyrnyZMenUTVaSR"
                width="300"
                height="380"
                allow="encrypted-media"
                className="mx-auto rounded-lg shadow-lg border-4 border-pink-500 hover:border-purple-500 dark:border-pink-400 dark:hover:border-purple-400 transition-all duration-300"
            />
        </section>
    );
}

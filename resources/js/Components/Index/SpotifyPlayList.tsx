export default function SpotifyPlaylistSection() {
    return (
        <section className="relative mt-12 bg-gray-900 py-12 text-center transition-colors duration-500 dark:bg-gray-100">
            {/* Background Glow */}
            <div className="pointer-events-none absolute inset-0 bg-purple-500 opacity-10 blur-3xl dark:opacity-5"></div>

            {/* Heading */}
            <h2
                className="mb-4 text-3xl font-bold text-gray-100 dark:text-gray-900"
                aria-label="Spotify Playlist Section"
            >
                Vibe with Us
            </h2>

            {/* Description */}
            <p className="mb-8 text-lg text-gray-300 dark:text-gray-600">
                Enjoy the best KPop hits while exploring the universe.
            </p>

            {/* Spotify Embed */}
            <iframe
                src="https://open.spotify.com/embed/playlist/6vvtidxSyrnyZMenUTVaSR"
                width="100%"
                height="380"
                allow="encrypted-media"
                className="mx-auto max-w-md rounded-lg border-4 border-pink-500 shadow-lg transition-all duration-300 hover:border-purple-500 md:max-w-lg dark:border-pink-400 dark:hover:border-purple-400"
                aria-label="Spotify playlist embed"
            />
        </section>
    );
}

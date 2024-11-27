import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 dark:bg-gray-100 text-gray-300 dark:text-gray-800 py-8 relative transition-colors duration-500">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-pink-500 dark:bg-purple-200 opacity-10 blur-3xl pointer-events-none"></div>

            {/* Footer Content */}
            <div className="max-w-6xl mx-auto text-center">
                <p className="text-sm">
                    © {new Date().getFullYear()}{" "}
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 dark:from-purple-400 dark:via-pink-400 dark:to-yellow-400">
                        KPop Universe
                    </span>
                    . All rights reserved.
                </p>
                <p className="text-xs mt-2 text-gray-400 dark:text-gray-600">
                    Designed with ❤️ for all KPop fans worldwide.
                </p>
            </div>
        </footer>
    );
}

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@headlessui/react";

const products = [
    { name: "T-Shirt", price: "25.00", image: "https://i.pravatar.cc/100?img=4" },
    { name: "Poster", price: "10.00", image: "https://i.pravatar.cc/100?img=5" },
    { name: "Keychain", price: "5.00", image: "https://i.pravatar.cc/100?img=6" },
];

export default function MerchSection() {
    return (
        <section
            className="mt-12 px-6 py-12 bg-gray-900 dark:bg-gray-100 text-center relative transition-colors duration-500"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-yellow-400 opacity-10 blur-3xl pointer-events-none dark:opacity-5"></div>

            <h2 className="text-3xl font-bold text-gray-100 dark:text-gray-900 mb-6">
                Exclusive Merch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.map((product, index) => (
                    <motion.div
                        key={index}
                        className="bg-gray-800 dark:bg-gray-200 text-gray-300 dark:text-gray-800 rounded-lg shadow-lg hover:shadow-yellow-500/50 dark:hover:shadow-yellow-300/50 transition-transform transform hover:scale-105 p-6"
                        whileHover={{ scale: 1.05 }}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded-lg shadow-md"
                        />
                        <h3 className="text-lg font-bold mt-4 text-gray-100 dark:text-gray-900">
                            {product.name}
                        </h3>
                        <p className="text-sm text-gray-400 dark:text-gray-600 mt-2">
                            ${product.price}
                        </p>
                        <Button
                            className="mt-4 px-4 py-2 bg-yellow-500 text-gray-900 dark:bg-yellow-400 dark:text-gray-900 font-bold rounded-lg shadow-md
                                hover:bg-yellow-400 dark:hover:bg-yellow-300 hover:shadow-yellow-400 dark:hover:shadow-yellow-200
                                focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                        >
                            Buy Now
                        </Button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

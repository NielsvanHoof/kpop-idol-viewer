import { Button } from '@headlessui/react';
import { motion } from 'framer-motion';

const products = [
    {
        name: 'T-Shirt',
        price: '25.00',
        image: 'https://i.pravatar.cc/100?img=4',
    },
    {
        name: 'Poster',
        price: '10.00',
        image: 'https://i.pravatar.cc/100?img=5',
    },
    {
        name: 'Keychain',
        price: '5.00',
        image: 'https://i.pravatar.cc/100?img=6',
    },
];

export default function MerchSection() {
    return (
        <section className="relative mt-12 bg-gray-900 px-6 py-12 text-center transition-colors duration-500 dark:bg-gray-100">
            {/* Background Glow */}
            <div className="pointer-events-none absolute inset-0 bg-yellow-400 opacity-10 blur-3xl dark:opacity-5" />

            <h2 className="mb-6 text-3xl font-bold text-gray-100 dark:text-gray-900">
                Exclusive Merch
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                {products.map((product, index) => (
                    <motion.div
                        key={index}
                        className="transform rounded-lg bg-gray-800 p-6 text-gray-300 shadow-lg transition-transform hover:scale-105 hover:shadow-yellow-500/50 dark:bg-gray-200 dark:text-gray-800 dark:hover:shadow-yellow-300/50"
                        whileHover={{ scale: 1.05 }}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-40 w-full rounded-lg object-cover shadow-md"
                        />
                        <h3 className="mt-4 text-lg font-bold text-gray-100 dark:text-gray-900">
                            {product.name}
                        </h3>
                        <p className="mt-2 text-sm text-gray-400 dark:text-gray-600">
                            ${product.price}
                        </p>
                        <Button className="mt-4 transform rounded-lg bg-yellow-500 px-4 py-2 font-bold text-gray-900 shadow-md transition-transform hover:scale-110 hover:bg-yellow-400 hover:shadow-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-300 dark:hover:shadow-yellow-200">
                            Buy Now
                        </Button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

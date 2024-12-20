import { Article } from '@/types/models';
import { Button } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, CalendarIcon } from 'lucide-react';
import { remark } from 'remark';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
    hover: {
        y: -4,
        transition: { duration: 0.2 },
    },
};

export default function LatestNewsSection({
    articles,
}: {
    articles: Article[];
}) {
    return (
        <section className="relative overflow-hidden bg-white py-16 sm:py-24 dark:bg-gray-800/95">
            {/* Background Decoration */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-pulse-slow h-[500px] w-[800px] rounded-full bg-purple-100 blur-3xl filter dark:bg-purple-900/20" />
                </div>
                <div className="absolute left-0 top-0 -translate-x-12 -translate-y-12 blur-3xl">
                    <div className="animate-pulse-slow h-72 w-72 rounded-full bg-pink-100 dark:bg-pink-900/20" />
                </div>
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
            >
                {/* Section Header */}
                <motion.div variants={itemVariants} className="text-center">
                    <motion.div className="mb-8 flex justify-center">
                        <span className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-purple-600 ring-1 ring-purple-100 dark:bg-purple-900/10 dark:text-purple-400 dark:ring-purple-900/30">
                            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
                            <span className="text-sm font-medium">
                                Latest Updates
                            </span>
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl lg:text-5xl"
                    >
                        Stay in the Loop
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg dark:text-gray-400"
                    >
                        Get the latest news and updates from the K-pop world
                    </motion.p>
                </motion.div>

                {/* News Grid */}
                <motion.div
                    variants={itemVariants}
                    className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 md:grid-cols-2 lg:mt-20 lg:grid-cols-3"
                >
                    <AnimatePresence>
                        {articles.map((item, index) => (
                            <motion.div
                                key={item.id}
                                variants={cardVariants}
                                whileHover="hover"
                                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <motion.img
                                        src={'#'}
                                        alt={item.title}
                                        initial={{ scale: 1 }}
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="absolute right-4 top-4 rounded-full bg-purple-600 px-3 py-1 text-xs font-medium text-white shadow-lg backdrop-blur-sm"
                                    >
                                        {item.type}
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <CalendarIcon className="h-4 w-4" />
                                        {new Date(item.date).toLocaleDateString(
                                            'en-US',
                                            {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                            },
                                        )}
                                    </div>
                                    <motion.h3
                                        variants={itemVariants}
                                        className="mb-2 text-xl font-semibold text-gray-900 dark:text-white"
                                    >
                                        {item.title}
                                    </motion.h3>
                                    <motion.p
                                        variants={itemVariants}
                                        className="mb-4 text-base text-gray-600 dark:text-gray-400"
                                        dangerouslySetInnerHTML={{
                                            __html: remark()
                                                .processSync(item.description)
                                                .toString(),
                                        }}
                                    ></motion.p>
                                    <motion.div
                                        whileHover={{ x: 4 }}
                                        className="inline-block"
                                    >
                                        <Button className="inline-flex items-center font-medium text-purple-600 transition-colors hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                                            Read More
                                            <ArrowRightIcon className="ml-2 h-4 w-4" />
                                        </Button>
                                    </motion.div>
                                </div>

                                {/* Hover Gradient */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 transition-opacity duration-300 group-hover:opacity-5 dark:from-purple-900/10 dark:to-pink-900/10" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </section>
    );
}

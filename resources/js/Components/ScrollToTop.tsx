import { Button } from "@headlessui/react";

export default function ScrollToTop() {
    const scrollToTop = () =>
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    return (
        <Button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 bg-pink-500 text-white p-4 rounded-full shadow-lg hover:scale-110 hover:shadow-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-500/50 transition-transform z-50"
            aria-label="Scroll to top"
        >
            ↑
        </Button>
    );
}

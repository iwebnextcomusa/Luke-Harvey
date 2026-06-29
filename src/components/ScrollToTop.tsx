import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="fixed bottom-6 right-24 z-[100] pointer-events-none" id="scroll-to-top-wrapper">
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            className="p-3 bg-sedona-charcoal/90 hover:bg-sedona-clay hover:text-sedona-sand text-sedona-orange rounded-full border border-sedona-clay/25 hover:border-sedona-orange shadow-lg backdrop-blur-sm pointer-events-auto cursor-pointer focus:outline-none transition-colors"
            title="Scroll back to top"
            aria-label="Scroll to top"
            id="btn-scroll-to-top"
          >
            <ArrowUp className="w-5 h-5 animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

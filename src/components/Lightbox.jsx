import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({ images, index, onClose, onNavigate }) {
  const goNext = useCallback(
    () => onNavigate((index + 1) % images.length),
    [index, images.length, onNavigate]
  );
  const goPrev = useCallback(
    () => onNavigate((index - 1 + images.length) % images.length),
    [index, images.length, onNavigate]
  );

  useEffect(() => {
    if (index === null) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, onClose, goNext, goPrev]);

  if (index === null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/90 p-4 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <X size={18} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous screenshot"
          className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
        >
          <ChevronLeft size={20} />
        </button>

        <motion.img
          key={images[index]}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          src={images[index]}
          alt={`Screenshot ${index + 1} of ${images.length}`}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[85vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next screenshot"
          className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
        >
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-white">
          {index + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

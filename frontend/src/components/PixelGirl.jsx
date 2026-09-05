import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PixelSprite } from "./PixelSprite";
import { GIRL_ART, GIRL_PALETTE, SPEECH } from "../data/content";
import { sfx } from "../utils/audioSynth";

export const PixelGirl = ({ booted }) => {
  const [line, setLine] = useState(null);
  const idx = useRef(0);
  const timer = useRef(null);

  useEffect(() => {
    if (!booted) return;
    timer.current = setTimeout(() => setLine(SPEECH[0]), 1500);
    const hide = setTimeout(() => setLine(null), 7000);
    return () => {
      clearTimeout(timer.current);
      clearTimeout(hide);
    };
  }, [booted]);

  const speak = () => {
    sfx.blip();
    idx.current = (idx.current + 1) % SPEECH.length;
    setLine(SPEECH[idx.current]);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setLine(null), 4500);
  };

  return (
    <div className="absolute right-14 sm:right-24 bottom-[78px] z-30 flex flex-col items-center">
      <AnimatePresence>
        {line && (
          <motion.div
            data-testid="pixel-girl-speech"
            initial={{ opacity: 0, y: 8, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mb-2 bg-[#FFF8F0] border-2 border-[#2D2631] shadow-[3px_3px_0_#2D2631] px-3 py-2 max-w-[190px] relative"
          >
            <p className="font-pixel text-[8px] leading-relaxed text-[#2D2631]">{line}</p>
            <div className="absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FFF8F0] border-r-2 border-b-2 border-[#2D2631] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        data-testid="pixel-girl"
        onClick={speak}
        aria-label="Pixel girl — click for a quote"
        initial={{ y: -400, opacity: 0 }}
        animate={booted ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: 0.4, type: "spring", stiffness: 120, damping: 12 }}
        whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
        whileTap={{ scale: 0.92 }}
        className="relative"
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <PixelSprite art={GIRL_ART} palette={GIRL_PALETTE} size={5} className="drop-shadow-[3px_3px_0_rgba(45,38,49,0.35)]" />
        </motion.div>
      </motion.button>
    </div>
  );
};

import { motion } from "framer-motion";
import { TAGLINE } from "../data/content";

export const StickyNote = () => (
  <motion.div
    data-testid="sticky-note"
    drag
    dragMomentum={false}
    whileDrag={{ scale: 1.06, rotate: 0 }}
    whileHover={{ rotate: 1.5, scale: 1.03 }}
    initial={{ opacity: 0, y: -30, rotate: -8 }}
    animate={{ opacity: 1, y: 0, rotate: -2 }}
    transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 15 }}
    className="absolute left-4 sm:left-10 top-16 sm:top-20 z-10 bg-[#FFF49C] border-2 border-[#2D2631] shadow-[5px_5px_0_#2D2631] p-4 pt-5 max-w-[210px] sm:max-w-[240px] cursor-grab active:cursor-grabbing"
  >
    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#FF6B9D] border-2 border-[#2D2631]" />
    <p className="font-pixel text-[9px] sm:text-[10px] leading-relaxed text-[#2D2631]">
      {TAGLINE}
    </p>
    <p className="font-terminal text-base text-[#8A7B57] mt-2">— drag me around!</p>
  </motion.div>
);

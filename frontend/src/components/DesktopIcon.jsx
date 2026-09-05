import { motion } from "framer-motion";
import { PixelSprite } from "./PixelSprite";
import { getIcon } from "../data/content";
import { sfx } from "../utils/audioSynth";

export const DesktopIcon = ({ item, selected, onSelect, onOpen, index }) => {
  const icon = getIcon(item.icon);
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  return (
    <motion.button
      data-testid={`icon-${item.id}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.08, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.9 }}
      onClick={(e) => {
        e.stopPropagation();
        sfx.select();
        onSelect(item.id);
        if (coarse) onOpen(item.id);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onOpen(item.id);
      }}
      className="flex flex-col items-center gap-1.5 w-[76px] group"
    >
      <div
        className={`p-2 border-2 transition-colors ${
          selected
            ? "bg-[#FF9EC6]/60 border-[#2D2631] shadow-[3px_3px_0_#2D2631]"
            : "border-transparent group-hover:bg-[#FFF8F0]/50 group-hover:border-[#2D2631]/40"
        }`}
      >
        <PixelSprite art={icon.art} palette={icon.palette} size={3.4} />
      </div>
      <span
        className={`font-pixel text-[7px] sm:text-[8px] leading-tight text-center px-1 py-0.5 border ${
          selected
            ? "bg-[#2D2631] text-[#FFF8F0] border-[#2D2631]"
            : "bg-[#FFF8F0]/85 text-[#2D2631] border-transparent"
        }`}
      >
        {item.label}
      </span>
    </motion.button>
  );
};

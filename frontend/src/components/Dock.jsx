import { motion } from "framer-motion";
import { PixelSprite } from "./PixelSprite";
import { getIcon, DESKTOP_ITEMS, TRASH_ITEM } from "../data/content";
import { sfx } from "../utils/audioSynth";

const DockIcon = ({ item, active, onOpen, testid }) => {
  const icon = getIcon(item.icon);
  return (
    <motion.button
      data-testid={testid || `dock-${item.id}`}
      onClick={() => {
        sfx.click();
        onOpen(item.id);
      }}
      whileHover={{ y: -10, scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      className="relative flex flex-col items-center"
      aria-label={item.label}
      title={item.label}
    >
      <PixelSprite art={icon.art} palette={icon.palette} size={3} />
      <span
        className={`absolute -bottom-2 w-1.5 h-1.5 ${active ? "bg-[#2D2631]" : "bg-transparent"}`}
      />
    </motion.button>
  );
};

export const Dock = ({ openIds, onOpen }) => (
  <motion.nav
    data-testid="dock"
    initial={{ y: 90 }}
    animate={{ y: 0 }}
    transition={{ delay: 0.6, type: "spring", stiffness: 160, damping: 16 }}
    className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-end gap-3 sm:gap-4 px-4 sm:px-5 pt-3 pb-4 bg-[#FFF8F0]/85 backdrop-blur-md border-2 border-[#2D2631] shadow-[5px_5px_0_#2D2631]"
  >
    {DESKTOP_ITEMS.map((item) => (
      <DockIcon key={item.id} item={item} active={openIds.includes(item.id)} onOpen={onOpen} />
    ))}
    <div className="w-[2px] self-stretch bg-[#2D2631]/30 mx-1" />
    <DockIcon item={TRASH_ITEM} active={openIds.includes("trash")} onOpen={onOpen} testid="trash-easter-egg" />
  </motion.nav>
);

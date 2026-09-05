import { useState } from "react";
import { motion } from "framer-motion";
import { sfx } from "../utils/audioSynth";

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

const TrafficButton = ({ color, glyph, testid, onClick, label }) => (
  <button
    data-testid={testid}
    aria-label={label}
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    onPointerDown={(e) => e.stopPropagation()}
    className="w-4 h-4 border-2 border-[#2D2631] flex items-center justify-center font-pixel text-[7px] text-[#2D2631] group/btn active:translate-y-[1px]"
    style={{ backgroundColor: color }}
  >
    <span className="opacity-0 group-hover/btn:opacity-100">{glyph}</span>
  </button>
);

export const MacWindow = ({
  id,
  title,
  z,
  initial,
  maximized,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  children,
}) => {
  const [pos, setPos] = useState(initial);

  const startDrag = (e) => {
    if (maximized) return;
    onFocus();
    const offX = e.clientX - pos.x;
    const offY = e.clientY - pos.y;
    const move = (ev) => {
      setPos({
        x: clamp(ev.clientX - offX, 0, window.innerWidth - 90),
        y: clamp(ev.clientY - offY, 34, window.innerHeight - 110),
      });
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const posStyle = maximized
    ? { left: 8, right: 8, top: 40, bottom: 84 }
    : { left: pos.x, top: pos.y, width: "min(560px, 92vw)" };

  return (
    <motion.div
      data-testid={`window-${id}`}
      className="absolute"
      style={{ zIndex: z, ...posStyle }}
      initial={{ opacity: 0, scale: 0.6, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.65, y: 24 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      onPointerDown={onFocus}
    >
      <div className="border-2 border-[#2D2631] bg-[#FAF8F5] shadow-[7px_7px_0_#2D2631] flex flex-col h-full max-h-full">
        <div
          data-testid={`window-titlebar-${id}`}
          onPointerDown={startDrag}
          onDoubleClick={onMaximize}
          className="flex items-center gap-2 bg-[#EADEC9] border-b-2 border-[#2D2631] px-2 h-9 select-none touch-none cursor-grab active:cursor-grabbing shrink-0"
        >
          <div className="flex gap-1.5">
            <TrafficButton color="#FF6B6B" glyph="×" testid="window-close-button" label="Close window" onClick={() => { sfx.close(); onClose(); }} />
            <TrafficButton color="#FFD93D" glyph="–" testid="window-minimize-button" label="Minimize window" onClick={() => { sfx.minimize(); onMinimize(); }} />
            <TrafficButton color="#6BCB77" glyph="+" testid="window-maximize-button" label="Maximize window" onClick={() => { sfx.maximize(); onMaximize(); }} />
          </div>
          <span className="flex-1 text-center font-pixel text-[9px] sm:text-[10px] uppercase tracking-wider text-[#2D2631] truncate pr-8">
            {title}
          </span>
        </div>
        <div
          className={`p-4 sm:p-5 overflow-y-auto font-terminal text-lg leading-snug text-[#332C37] ${
            maximized ? "flex-1" : "max-h-[58vh]"
          }`}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
};

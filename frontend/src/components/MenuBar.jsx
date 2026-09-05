import { useEffect, useState } from "react";
import { PixelSprite } from "./PixelSprite";
import { HEART_ART, HEART_PALETTE, NAME } from "../data/content";
import { sfx } from "../utils/audioSynth";

const Clock = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const h = now.getHours() % 12 || 12;
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const ap = now.getHours() >= 12 ? "PM" : "AM";
  return (
    <span data-testid="menu-bar-clock" className="tabular-nums">
      {h}
      <span className="animate-blink">:</span>
      {mm}
      <span className="animate-blink">:</span>
      {ss} {ap}
    </span>
  );
};

export const MenuBar = ({ activeTitle, soundOn, onToggleSound }) => (
  <header
    data-testid="menu-bar"
    className="fixed top-0 left-0 right-0 z-50 h-8 px-2 sm:px-4 flex items-center justify-between border-b-2 border-[#2D2631] bg-[#FFF8F0]/90 backdrop-blur-md font-pixel text-[9px] sm:text-[10px] text-[#2D2631] select-none"
  >
    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
      <PixelSprite art={HEART_ART} palette={HEART_PALETTE} size={2.4} />
      <span className="font-bold whitespace-nowrap">{NAME}</span>
      {activeTitle && (
        <span data-testid="menu-bar-active-title" className="hidden md:inline text-[#6B5E73] truncate">
          — {activeTitle}
        </span>
      )}
    </div>
    <div className="flex items-center gap-3 sm:gap-4">
      <button
        data-testid="sound-toggle-button"
        onClick={() => {
          onToggleSound();
          sfx.click();
        }}
        className="hover:text-[#FF6B9D] transition-colors"
        aria-label="Toggle sound"
      >
        SND:{soundOn ? "ON" : "OFF"}
      </button>
      <Clock />
    </div>
  </header>
);

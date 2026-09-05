import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sfx } from "../utils/audioSynth";

const LINES = [
  "PIXEL DEV OS (TM) v2.6",
  "BIOS CHECK .............. OK",
  "MEMORY: 640K ............ OK",
  "LOADING PASTEL.SYS ...... OK",
  "MOUNTING /projects ...... OK",
  "CHIPTUNE AUDIO .......... READY",
  "",
  "ALL SYSTEMS PASTEL. WELCOME.",
];

export const BootScreen = ({ onDone, soundOn, onToggleSound }) => {
  const [shown, setShown] = useState(0);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (shown < LINES.length) {
      const t = setTimeout(() => setShown((s) => s + 1), 320);
      return () => clearTimeout(t);
    }
  }, [shown]);

  useEffect(() => {
    if (shown >= LINES.length && progress < 100) {
      const t = setTimeout(() => setProgress((p) => Math.min(100, p + 8)), 55);
      return () => clearTimeout(t);
    }
    if (progress >= 100 && !ready) {
      const t = setTimeout(() => setReady(true), 250);
      return () => clearTimeout(t);
    }
  }, [shown, progress, ready]);

  const enter = () => {
    if (!ready || leaving) return;
    sfx.boot();
    setLeaving(true);
    setTimeout(onDone, 620);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Enter") enter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const blocks = Math.round(progress / 10);

  return (
    <motion.div
      data-testid="boot-screen"
      className="fixed inset-0 z-[100] bg-[#14101A] flex items-center justify-center p-4"
      animate={leaving ? { scaleY: 0.004, opacity: 0 } : { scaleY: 1, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
      style={{ originY: 0.5 }}
    >
      <div className="w-full max-w-xl font-pixel text-[#B2FBA5]">
        <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] text-[#FF9EC6]">◤ PASTEL BIOS ◢</span>
          <button
            data-testid="boot-sound-toggle"
            onClick={onToggleSound}
            className="text-[10px] border-2 border-[#B2FBA5] px-2 py-1 hover:bg-[#B2FBA5] hover:text-[#14101A] transition-colors"
          >
            SOUND [{soundOn ? "ON" : "OFF"}]
          </button>
        </div>
        <div className="min-h-[190px] text-[10px] sm:text-xs leading-6">
          {LINES.slice(0, shown).map((l, i) => (
            <div key={i}>{l}</div>
          ))}
          {!ready && <span className="inline-block w-2 h-3 bg-[#B2FBA5] animate-blink" />}
        </div>
        <div className="mt-6 border-2 border-[#B2FBA5] p-1 h-6">
          <div className="flex gap-[2px] h-full">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 ${i < blocks ? "bg-[#B2FBA5]" : "bg-transparent"}`}
              />
            ))}
          </div>
        </div>
        <div className="mt-2 text-[10px] text-right">{progress}%</div>
        <button
          data-testid="boot-enter-button"
          onClick={enter}
          disabled={!ready}
          className={`mt-8 w-full text-center text-xs sm:text-sm py-4 border-2 transition-colors ${
            ready
              ? "border-[#FF9EC6] text-[#FF9EC6] animate-blink hover:bg-[#FF9EC6] hover:text-[#14101A]"
              : "border-[#3A3244] text-[#3A3244] cursor-not-allowed"
          }`}
        >
          {ready ? "▶ PRESS ENTER OR CLICK TO START ◀" : "BOOTING..."}
        </button>
      </div>
    </motion.div>
  );
};

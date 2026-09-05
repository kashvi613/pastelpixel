import { motion } from "framer-motion";
import { PixelSprite } from "./PixelSprite";
import { CLOUD_ART, CLOUD_PALETTE } from "../data/content";

const CLOUDS = [
  { top: "8%", dur: 90, size: 5, delay: 0, opacity: 0.95 },
  { top: "22%", dur: 130, size: 3, delay: -40, opacity: 0.7 },
  { top: "45%", dur: 110, size: 4, delay: -75, opacity: 0.85 },
  { top: "62%", dur: 150, size: 2.5, delay: -20, opacity: 0.6 },
  { top: "33%", dur: 70, size: 6, delay: -55, opacity: 1 },
];

export const CloudLayer = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
    {CLOUDS.map((c, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{ top: c.top, opacity: c.opacity }}
        initial={{ x: "-20vw" }}
        animate={{ x: "110vw" }}
        transition={{ duration: c.dur, repeat: Infinity, ease: "linear", delay: c.delay }}
      >
        <PixelSprite art={CLOUD_ART} palette={CLOUD_PALETTE} size={c.size} />
      </motion.div>
    ))}
  </div>
);

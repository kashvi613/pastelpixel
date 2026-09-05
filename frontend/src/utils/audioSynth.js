let ctx = null;
let enabled = true;

export const setSoundEnabled = (v) => { enabled = v; };

const ac = () => {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
};

const tone = (freq, start, dur, { type = "square", vol = 0.1, slide } = {}) => {
  if (!enabled) return;
  try {
    const c = ac();
    const o = c.createOscillator();
    const g = c.createGain();
    const t = c.currentTime + start;
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + dur + 0.02);
  } catch (e) { /* audio not ready */ }
};

const noise = (dur = 0.35, vol = 0.2) => {
  if (!enabled) return;
  try {
    const c = ac();
    const len = c.sampleRate * dur;
    const buf = c.createBuffer(1, len, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = c.createBufferSource();
    src.buffer = buf;
    const f = c.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.setValueAtTime(3000, c.currentTime);
    f.frequency.exponentialRampToValueAtTime(200, c.currentTime + dur);
    const g = c.createGain();
    g.gain.setValueAtTime(vol, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
    src.connect(f).connect(g).connect(c.destination);
    src.start();
  } catch (e) { /* audio not ready */ }
};

export const sfx = {
  boot() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.13, 0.28, { vol: 0.12 }));
  },
  click() {
    tone(1400, 0, 0.03, { vol: 0.07 });
  },
  select() {
    tone(880, 0, 0.05, { vol: 0.06, type: "triangle" });
  },
  open() {
    [523.25, 659.25, 783.99].forEach((f, i) => tone(f, i * 0.07, 0.13, { vol: 0.1 }));
  },
  close() {
    [783.99, 523.25].forEach((f, i) => tone(f, i * 0.08, 0.15, { vol: 0.1 }));
  },
  minimize() {
    tone(392, 0, 0.14, { slide: 160, vol: 0.09 });
  },
  maximize() {
    tone(262, 0, 0.16, { slide: 784, vol: 0.09 });
  },
  trash() {
    noise(0.4, 0.22);
    tone(320, 0, 0.35, { slide: 60, vol: 0.08 });
  },
  blip() {
    tone(880, 0, 0.06, { vol: 0.09 });
    tone(1318, 0.06, 0.09, { vol: 0.09 });
  },
  error() {
    tone(220, 0, 0.12, { vol: 0.1 });
    tone(185, 0.12, 0.2, { vol: 0.1 });
  },
};

export const pixelCursorUrl = (inner = "#FFF8F0") => {
  const art = [
    "K...........",
    "KK..........",
    "KWK.........",
    "KWWK........",
    "KWWWK.......",
    "KWWWWK......",
    "KWWWWWK.....",
    "KWWWWWWK....",
    "KWWWWWWWK...",
    "KWWWWWKKKK..",
    "KWKWWK......",
    "KK.KWWK.....",
    "K..KWWK.....",
    "...KWWK.....",
    "...KWWK.....",
    "....KK......",
  ];
  const rects = [];
  art.forEach((row, y) =>
    row.split("").forEach((ch, x) => {
      if (ch === "K") rects.push(`<rect x='${x}' y='${y}' width='1' height='1' fill='%232D2631'/>`);
      if (ch === "W") rects.push(`<rect x='${x}' y='${y}' width='1' height='1' fill='${inner.replace("#", "%23")}'/>`);
    })
  );
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' shape-rendering='crispEdges'>${rects.join("")}</svg>`;
  return `url("data:image/svg+xml,${svg}") 0 0, auto`;
};

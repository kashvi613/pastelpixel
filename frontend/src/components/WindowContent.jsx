import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PixelSprite } from "./PixelSprite";
import { SKILLS, RESUME_TEXT, NAME, TAGLINE, getIcon } from "../data/content";
import { sfx } from "../utils/audioSynth";

const Tag = ({ children, accent }) => (
  <span
    className="font-pixel text-[7px] px-2 py-1 border-2 border-[#2D2631]"
    style={{ backgroundColor: accent }}
  >
    {children}
  </span>
);

export const ProjectContent = ({ project }) => {
  const icon = getIcon(project.type);
  return (
    <div data-testid={`content-${project.id}`}>
      <div className="flex items-start gap-4 mb-4">
        <div className="p-2 border-2 border-[#2D2631] shrink-0" style={{ backgroundColor: project.accent }}>
          <PixelSprite art={icon.art} palette={icon.palette} size={4} />
        </div>
        <div>
          <h2 className="font-pixel text-sm text-[#2D2631]">{project.title}</h2>
          <p className="text-[#6B5E73]">{project.tagline} · {project.year}</p>
        </div>
      </div>
      <p className="mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tags.map((t) => (
          <Tag key={t} accent={project.accent}>{t}</Tag>
        ))}
      </div>
      <div className="flex gap-3">
        <button
          data-testid={`visit-${project.id}`}
          onClick={() => sfx.open()}
          className="font-pixel text-[9px] px-4 py-2 bg-[#2D2631] text-[#FFF8F0] border-2 border-[#2D2631] shadow-[3px_3px_0_#B185A7] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          ▶ LAUNCH DEMO
        </button>
        <button
          data-testid={`source-${project.id}`}
          onClick={() => sfx.click()}
          className="font-pixel text-[9px] px-4 py-2 bg-[#FFF8F0] text-[#2D2631] border-2 border-[#2D2631] shadow-[3px_3px_0_#2D2631] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          &lt;/&gt; SOURCE
        </button>
      </div>
    </div>
  );
};

export const AboutContent = () => (
  <div data-testid="content-about">
    <h2 className="font-pixel text-sm text-[#2D2631] mb-3">HI, I'M {NAME.toUpperCase()}!</h2>
    <p className="mb-3">
      {TAGLINE} I'm a creative frontend engineer with 6+ years of experience turning
      wild ideas into interfaces people actually enjoy using.
    </p>
    <p className="mb-4">
      By day I build design systems and dashboards. By night I draw pixel art, compose
      chiptunes, and ship weird side projects (see Trash for the ones that didn't make it).
    </p>
    <div className="grid grid-cols-3 gap-2 text-center">
      {[
        ["6+", "YEARS"],
        ["40+", "PROJECTS"],
        ["∞", "COFFEE"],
      ].map(([n, l]) => (
        <div key={l} className="border-2 border-[#2D2631] bg-[#FFF49C] p-3 shadow-[3px_3px_0_#2D2631]">
          <div className="font-pixel text-base text-[#2D2631]">{n}</div>
          <div className="font-pixel text-[7px] text-[#6B5E73] mt-1">{l}</div>
        </div>
      ))}
    </div>
  </div>
);

export const SkillsContent = () => (
  <div data-testid="content-skills">
    <h2 className="font-pixel text-sm text-[#2D2631] mb-4">TECH STACK</h2>
    <div className="space-y-3">
      {SKILLS.map((s) => (
        <div key={s.name}>
          <div className="flex justify-between mb-1">
            <span>{s.name}</span>
            <span className="font-pixel text-[8px] text-[#6B5E73]">{s.level}%</span>
          </div>
          <div className="h-4 border-2 border-[#2D2631] bg-[#FFF8F0] p-[2px]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${s.level}%` }}
              transition={{ duration: 0.8, ease: "steps(12)" }}
              className="h-full"
              style={{ backgroundColor: s.color }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const ResumeContent = () => {
  const download = () => {
    sfx.open();
    const blob = new Blob([RESUME_TEXT], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "PixelDev_Resume.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  };
  return (
    <div data-testid="content-resume">
      <div className="border-2 border-[#2D2631] bg-[#FFF8F0] p-4 shadow-[3px_3px_0_#2D2631] mb-4 whitespace-pre-wrap text-base leading-relaxed">
        {RESUME_TEXT}
      </div>
      <button
        data-testid="resume-download-button"
        onClick={download}
        className="font-pixel text-[9px] px-4 py-2 bg-[#6BCB77] text-[#2D2631] border-2 border-[#2D2631] shadow-[3px_3px_0_#2D2631] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      >
        ▼ DOWNLOAD .TXT
      </button>
    </div>
  );
};

export const ContactContent = () => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    sfx.blip();
    try {
      await navigator.clipboard.writeText("hello@pixeldev.os");
    } catch (e) { /* clipboard blocked */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div data-testid="content-contact">
      <h2 className="font-pixel text-sm text-[#2D2631] mb-3">SEND A SIGNAL</h2>
      <p className="mb-4">
        Got a project, a job, or just want to talk pixel art? My inbox is always in pastel mode.
      </p>
      <div className="border-2 border-[#2D2631] bg-[#FFF49C] p-3 mb-4 flex items-center justify-between gap-2 flex-wrap shadow-[3px_3px_0_#2D2631]">
        <span className="font-pixel text-[10px]">hello@pixeldev.os</span>
        <button
          data-testid="contact-copy-button"
          onClick={copy}
          className="font-pixel text-[8px] px-3 py-1.5 bg-[#2D2631] text-[#FFF8F0] border-2 border-[#2D2631]"
        >
          {copied ? "COPIED!" : "COPY"}
        </button>
      </div>
      <div className="flex gap-3 flex-wrap">
        <a
          data-testid="contact-email-button"
          href="mailto:hello@pixeldev.os"
          onClick={() => sfx.open()}
          className="font-pixel text-[9px] px-4 py-2 bg-[#FF9EC6] text-[#2D2631] border-2 border-[#2D2631] shadow-[3px_3px_0_#2D2631] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          ✉ SAY HELLO
        </a>
        <button
          data-testid="contact-github-button"
          onClick={() => sfx.click()}
          className="font-pixel text-[9px] px-4 py-2 bg-[#FFF8F0] text-[#2D2631] border-2 border-[#2D2631] shadow-[3px_3px_0_#2D2631] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          GITHUB
        </button>
      </div>
    </div>
  );
};

export const TrashContent = ({ items, onEmpty, onRestore }) => {
  const [exploding, setExploding] = useState(false);
  const empty = () => {
    sfx.trash();
    setExploding(true);
    setTimeout(() => {
      onEmpty();
      setExploding(false);
    }, 650);
  };
  return (
    <div data-testid="content-trash" className="relative">
      <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
        <h2 className="font-pixel text-xs text-[#2D2631]">REJECTED CONCEPTS</h2>
        {items.length > 0 && (
          <button
            data-testid="empty-trash-button"
            onClick={empty}
            className="font-pixel text-[8px] px-3 py-1.5 bg-[#FF6B6B] text-[#2D2631] border-2 border-[#2D2631] shadow-[3px_3px_0_#2D2631] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            EMPTY TRASH
          </button>
        )}
      </div>
      {items.length === 0 ? (
        <p className="text-[#6B5E73] italic">Trash is empty. Good ideas only from here on.</p>
      ) : (
        <ul className="space-y-2 relative">
          <AnimatePresence>
            {items.map((r) => (
              <motion.li
                key={r.id}
                exit={{ opacity: 0, x: 60, rotate: 6 }}
                className="border-2 border-[#2D2631] bg-[#FFF8F0] p-3 shadow-[3px_3px_0_#2D2631]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-pixel text-[9px] text-[#2D2631] mb-1">{r.name}</div>
                    <p className="text-base text-[#6B5E73]">{r.note}</p>
                  </div>
                  <button
                    data-testid={`restore-${r.id}`}
                    onClick={() => {
                      sfx.close();
                      onRestore(r.id);
                    }}
                    className="font-pixel text-[7px] px-2 py-1 border-2 border-[#2D2631] bg-[#B2FBA5] shrink-0"
                  >
                    RESTORE
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
          {exploding &&
            Array.from({ length: 14 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute w-2 h-2 left-1/2 top-1/3 pointer-events-none"
                style={{ backgroundColor: ["#FF6B6B", "#FFD93D", "#79BAC1", "#FF9EC6"][i % 4] }}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: (Math.random() - 0.5) * 320,
                  y: (Math.random() - 0.7) * 260,
                  opacity: 0,
                  rotate: Math.random() * 360,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            ))}
        </ul>
      )}
    </div>
  );
};

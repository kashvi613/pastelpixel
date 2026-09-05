import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import "@/App.css";
import Seo from "@/components/Seo";
import { BootScreen } from "./components/BootScreen";
import { MenuBar } from "./components/MenuBar";
import { CloudLayer } from "./components/CloudLayer";
import { StickyNote } from "./components/StickyNote";
import { PixelGirl } from "./components/PixelGirl";
import { DesktopIcon } from "./components/DesktopIcon";
import { MacWindow } from "./components/MacWindow";
import { Dock } from "./components/Dock";
import {
  ProjectContent,
  AboutContent,
  SkillsContent,
  ResumeContent,
  ContactContent,
  TrashContent,
} from "./components/WindowContent";
import { PROJECTS, DESKTOP_ITEMS, WINDOW_TITLES, REJECTED } from "./data/content";
import { sfx, setSoundEnabled, pixelCursorUrl } from "./utils/audioSynth";

const getTitle = (id) => {
  const p = PROJECTS.find((pr) => pr.id === id);
  return p ? p.title : WINDOW_TITLES[id] || id;
};

function App() {
  const [booted, setBooted] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [windows, setWindows] = useState([]);
  const [zOrder, setZOrder] = useState([]);
  const [selected, setSelected] = useState(null);
  const [rejected, setRejected] = useState(REJECTED);

  useEffect(() => {
    setSoundEnabled(soundOn);
  }, [soundOn]);

  useEffect(() => {
    const root = document.documentElement;
    if (booted) {
      root.style.setProperty("--cur-arrow", pixelCursorUrl("#FFF8F0"));
      root.style.setProperty("--cur-pointer", pixelCursorUrl("#FF9EC6"));
      root.classList.add("pixel-cursors");
    } else {
      root.classList.remove("pixel-cursors");
    }
  }, [booted]);

  const focusWindow = (id) => {
    setZOrder((prev) => [...prev.filter((w) => w !== id), id]);
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: false } : w)));
  };

  const openWindow = (id) => {
    setSelected(null);
    if (windows.some((w) => w.id === id)) {
      sfx.click();
      focusWindow(id);
      return;
    }
    sfx.open();
    const n = windows.length;
    setWindows((prev) => [
      ...prev,
      {
        id,
        minimized: false,
        maximized: false,
        initial: { x: 70 + (n % 5) * 44, y: 52 + (n % 5) * 36 },
      },
    ]);
    setZOrder((prev) => [...prev.filter((w) => w !== id), id]);
  };

  const closeWindow = (id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setZOrder((prev) => prev.filter((w) => w !== id));
  };

  const minimizeWindow = (id) =>
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));

  const toggleMaximize = (id) =>
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)));

  const activeId = [...zOrder].reverse().find((id) => {
    const w = windows.find((x) => x.id === id);
    return w && !w.minimized;
  });

  const renderContent = (id) => {
    const project = PROJECTS.find((p) => p.id === id);
    if (project) return <ProjectContent project={project} />;
    switch (id) {
      case "about":
        return <AboutContent />;
      case "skills":
        return <SkillsContent />;
      case "resume":
        return <ResumeContent />;
      case "contact":
        return <ContactContent />;
      case "trash":
        return (
          <TrashContent
            items={rejected}
            onEmpty={() => setRejected([])}
            onRestore={(rid) => setRejected((prev) => prev.filter((r) => r.id !== rid))}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden relative"
      style={{ background: "linear-gradient(135deg, #FFC0CB 0%, #FFDAB9 48%, #E6E6FA 100%)" }}
      onClick={() => setSelected(null)}
    >
      <Seo
        title="Kashvi Kalra — Pixel-Art Portfolio OS"
        siteName="Kashvi Kalra"
        description="A retro pixel-art macOS-style portfolio by Kashvi Kalra. Boot the OS, double-click project icons, drag windows around, and dig through the trash for rejected concepts."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Kashvi Kalra",
          description: "Pixel-art macOS-style portfolio of Kashvi Kalra, creative frontend engineer.",
        }}
      />

      <CloudLayer />

      {booted && (
        <>
          <MenuBar
            activeTitle={activeId ? getTitle(activeId) : null}
            soundOn={soundOn}
            onToggleSound={() => setSoundOn((s) => !s)}
          />
          <StickyNote />

          <div
            data-testid="desktop-icons"
            className="absolute right-2 sm:right-5 top-14 z-20 grid grid-cols-2 md:grid-cols-1 gap-3 sm:gap-4"
          >
            {DESKTOP_ITEMS.map((item, i) => (
              <DesktopIcon
                key={item.id}
                item={item}
                index={i}
                selected={selected === item.id}
                onSelect={setSelected}
                onOpen={openWindow}
              />
            ))}
          </div>

          <PixelGirl booted={booted} />

          <AnimatePresence>
            {windows
              .filter((w) => !w.minimized)
              .map((w) => (
                <MacWindow
                  key={w.id}
                  id={w.id}
                  title={getTitle(w.id)}
                  z={10 + zOrder.indexOf(w.id)}
                  initial={w.initial}
                  maximized={w.maximized}
                  onFocus={() => focusWindow(w.id)}
                  onClose={() => closeWindow(w.id)}
                  onMinimize={() => minimizeWindow(w.id)}
                  onMaximize={() => toggleMaximize(w.id)}
                >
                  {renderContent(w.id)}
                </MacWindow>
              ))}
          </AnimatePresence>

          <Dock openIds={windows.map((w) => w.id)} onOpen={openWindow} />
        </>
      )}

      <div className="scanlines" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <AnimatePresence>
        {!booted && (
          <BootScreen
            onDone={() => setBooted(true)}
            soundOn={soundOn}
            onToggleSound={() => setSoundOn((s) => !s)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

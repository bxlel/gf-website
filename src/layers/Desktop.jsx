import React, { useState } from "react";
import useSound from "../components/useSound.js";
import SectionWindow from "../components/SectionWindow.jsx";
import AppIcon from "../components/AppIcon.jsx";
import LoveTimer from "../components/LoveTimer.jsx";
import RestoMap from "../components/RestoMap.jsx";
import Moodboard from "../components/Moodboard.jsx";
import DateApp from "../components/DateApp.jsx";
import Wheel from "../components/Wheel.jsx";
import { CompatTest, Typewriter } from "../components/Bonus.jsx";
import { LOVE_LETTER, POEM, POEM_SIGNATURE } from "../data/content.js";

// >>> Les icônes de mes_apps. Pour en AJOUTER une : copie une ligne.
//     Plus tard tu remplaceras `emoji` par `img` (un PNG/SVG importé).
const APPS = [
  { id: "date",      label: "mon_date.exe",  emoji: "💖", title: "mon_date.exe" },
  { id: "moodboard", label: "moodboard.exe", emoji: "📸", title: "moodboard.exe" },
  { id: "restos",    label: "nos_restos",    emoji: "🗺️", title: "carte_des_restos.exe" },
  { id: "wheel",     label: "la_roue",       emoji: "🎡", title: "roue_de_la_chance.exe" },
  { id: "compat",    label: "compatibilité", emoji: "💘", title: "amour_calculator.exe" },
  { id: "poem",      label: "poème",         emoji: "📜", title: "poeme.txt" },
  { id: "love",      label: "mot_secret",    emoji: "💌", title: "lettre_damour.txt" },
];

export default function Desktop() {
  const snd = useSound();
  const [popup, setPopup] = useState(null);

  const open = (id) => { snd.pop(); setPopup(id); };
  const close = () => { snd.pop(); setPopup(null); };

  const current = APPS.find((a) => a.id === popup);

  return (
    <div className="relative z-20 w-full flex flex-col items-center gap-6 px-3 py-4">

      {/* ===== FENÊTRE mes_apps.exe (grille d'icônes) ===== */}
      <SectionWindow title="mes_apps.exe" className="max-w-md">
        <div className="flex flex-wrap justify-center gap-4">
          {APPS.map((a) => (
            <AppIcon key={a.id} label={a.label} emoji={a.emoji} img={a.img} onOpen={() => open(a.id)} />
          ))}
        </div>
      </SectionWindow>

      {/* ===== FENÊTRE lovetimer.exe (toujours visible) ===== */}
      <SectionWindow title="lovetimer.exe" className="max-w-md">
        <div className="flex justify-center"><LoveTimer /></div>
      </SectionWindow>

      {/* ===== POP-UP de l'app ouverte ===== */}
      {popup && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/30 px-3 py-6 overflow-auto" onClick={close}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-md border-2 overflow-hidden shadow-[4px_4px_0_rgba(120,90,160,0.5)]"
            style={{ borderColor: "#c9c9d6", background: "linear-gradient(180deg,#ffffff 0%,#fdf0ff 55%,#f6e2ff 100%)" }}
          >
            {/* Barre de titre avec croix qui ferme */}
            <div className="flex items-center justify-between px-3 py-1.5" style={{ background: "linear-gradient(90deg,#7b2ff7,#d14fff,#ff6ad5)" }}>
              <span className="text-sm font-bold text-white drop-shadow select-none truncate">{current?.title}</span>
              <div className="flex gap-1">
                <span className="grid h-4 w-4 place-items-center rounded-[3px] border border-white/70 bg-[#e6e6ef] text-[9px] font-bold text-gray-700">_</span>
                <span className="grid h-4 w-4 place-items-center rounded-[3px] border border-white/70 bg-[#e6e6ef] text-[9px] font-bold text-gray-700">▢</span>
                <span onClick={close} className="grid h-4 w-4 place-items-center rounded-[3px] border border-white/70 bg-[#ffb3c8] text-[9px] font-bold text-gray-800 cursor-pointer">✕</span>
              </div>
            </div>

            {/* Contenu de l'app */}
            <div className="p-4">
              {popup === "date" && <DateApp />}
              {popup === "moodboard" && <Moodboard />}
              {popup === "restos" && <RestoMap />}
              {popup === "wheel" && <Wheel />}
              {popup === "compat" && <CompatTest />}
              {popup === "poem" && <Typewriter title="poeme.txt" content={POEM} ctaLabel="Lire le poème 📜" endLabel={POEM_SIGNATURE} />}
              {popup === "love" && <Typewriter title="lettre_damour.txt" content={LOVE_LETTER} ctaLabel="Lire le mot ✍️" endLabel="💌 Écrit avec amour" />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState } from "react";
import FlipPhoneSVG from "../FlipPhoneSVG.jsx";
import useSound from "../components/useSound.js";
import { RetroWindow } from "../components/Ui.jsx";
import { CompatTest, Typewriter } from "../components/Bonus.jsx";
import Wheel from "../components/Wheel.jsx";
import LoveTimer from "../components/LoveTimer.jsx";
import { CODE, LOVE_LETTER, POEM, POEM_SIGNATURE } from "../data/content.js";

// >>> Pour AJOUTER une application, copie une ligne ici <<<
const APPS = [
  { id: "poem", icon: "📜", label: "Un poème" },
  { id: "love", icon: "💌", label: "Mot secret" },
  { id: "compat", icon: "💘", label: "Test de compatibilité" },
  { id: "wheel", icon: "🎡", label: "Roue de la chance" },
];

// Fenêtre complète façon OS rétro (en-tête + cadre + fond)
function SectionWindow({ title, children }) {
  return (
    <div
      className="w-full max-w-md rounded-md border-2 overflow-hidden shadow-[4px_4px_0_rgba(120,90,160,0.4)]"
      style={{ borderColor: "#c9c9d6", background: "linear-gradient(180deg,#ffffff 0%,#fdf0ff 55%,#f6e2ff 100%)" }}
    >
      <div className="flex items-center justify-between px-3 py-1.5" style={{ background: "linear-gradient(90deg,#7b2ff7,#d14fff,#ff6ad5)" }}>
        <span className="text-sm font-bold text-white drop-shadow select-none truncate">{title}</span>
        <div className="flex gap-1">
          <span className="grid h-4 w-4 place-items-center rounded-[3px] border border-white/70 bg-[#e6e6ef] text-[9px] font-bold text-gray-700">_</span>
          <span className="grid h-4 w-4 place-items-center rounded-[3px] border border-white/70 bg-[#e6e6ef] text-[9px] font-bold text-gray-700">▢</span>
          <span className="grid h-4 w-4 place-items-center rounded-[3px] border border-white/70 bg-[#ffb3c8] text-[9px] font-bold text-gray-800">✕</span>
        </div>
      </div>
      <div className="p-4 flex flex-col items-center gap-4">{children}</div>
    </div>
  );
}

export default function Layer1({ onComplete }) {
  const snd = useSound();
  const [entry, setEntry] = useState("");
  const [shake, setShake] = useState(false);
  const [status, setStatus] = useState("TAPE LE CODE 📟");
  const [unlocked, setUnlocked] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const [hint2, setHint2] = useState(false);
  const [quizMsg, setQuizMsg] = useState("");
  const [popup, setPopup] = useState(null);

  const handleKey = (k) => {
    snd.key();
    if (unlocked) return;
    if (k === "C") { setEntry(""); setStatus("TAPE LE CODE 📟"); return; }
    if (k === "OK") return;
    if (entry.length >= 4) return;
    const next = entry + k;
    setEntry(next);
    if (next.length === 4) {
      if (next === CODE) {
        setStatus("DÉVERROUILLÉ 💖");
        setUnlocked(true);
        snd.victory();
        setTimeout(onComplete, 1400);
      } else {
        setStatus("MAUVAIS CODE 🙈");
        snd.error();
        setShake(true);
        setTimeout(() => { setShake(false); setEntry(""); setStatus("TAPE LE CODE 📟"); }, 800);
      }
    }
  };

  const pickQuiz = (correct) => {
    snd.pop();
    if (correct) {
      setHint2(true);
      setQuizMsg("Évidemment 😏 Indice : Regarde notre premier date !");
    } else {
      setQuizMsg("Mauvaise réponse, recommence 💅");
      snd.error();
    }
  };

  return (
    <div className="relative z-20 flex flex-col items-center gap-5 px-3 w-full">
      <p className="text-center text-sm sm:text-base font-bold text-purple-700 bg-white/70 rounded-full px-4 py-1 shadow">
        Indice 1 : Le jour où tout a commencé... 🗓️
      </p>

      {/* ===== TÉLÉPHONE (libre, sans fenêtre) ===== */}
      <div className={`flex justify-center ${shake ? "animate-[shaker_0.4s_ease]" : ""}`}>
        <FlipPhoneSVG currentEntry={entry.padEnd(4, "•")} statusText={status} onKey={handleKey} />
      </div>

      {!hintOpen && (
        <button onClick={() => { snd.pop(); setHintOpen(true); }} className="rounded-full border-2 border-white bg-gradient-to-r from-pink-400 to-fuchsia-500 px-5 py-2 text-sm font-bold text-white shadow-[2px_2px_0_rgba(150,110,190,0.5)] active:translate-y-[2px]">
          💡 Besoin d'un second indice ?
        </button>
      )}

      {/* ===== FENÊTRE APPLICATIONS ===== */}
      <SectionWindow title="mes_apps.exe">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {APPS.map((g) => (
            <button
              key={g.id}
              onClick={() => { snd.pop(); setPopup(g.id); }}
              className="rounded-2xl border-2 border-white bg-gradient-to-r from-fuchsia-400 to-pink-500 px-4 py-3 text-sm font-bold text-white shadow-[2px_2px_0_rgba(150,110,190,0.5)] active:translate-y-[2px]"
            >
              {g.icon} {g.label}
            </button>
          ))}
        </div>
      </SectionWindow>

      {/* ===== FENÊTRE TIMER ===== */}
      <SectionWindow title="lovetimer.exe">
        <LoveTimer />
      </SectionWindow>

      {hintOpen && (
        <RetroWindow title="quiz_secret.exe" className="w-full max-w-xs" onClose={() => setHintOpen(false)}>
          {!hint2 ? (
            <>
              <p className="mb-2 text-sm font-bold text-purple-800">Quelle est la plus belle fille sur Terre ?</p>
              <div className="flex flex-col gap-2">
                <button onClick={() => pickQuiz(true)} className="rounded border-2 border-pink-300 bg-pink-50 px-3 py-2 text-left text-sm font-semibold hover:bg-pink-100">1) Ana Oliveira Pereira</button>
                <button onClick={() => pickQuiz(false)} className="rounded border-2 border-gray-300 bg-gray-50 px-3 py-2 text-left text-sm font-semibold hover:bg-gray-100">2) Keira Knightley</button>
                <button onClick={() => pickQuiz(false)} className="rounded border-2 border-gray-300 bg-gray-50 px-3 py-2 text-left text-sm font-semibold hover:bg-gray-100">3) Anne Hathaway</button>
              </div>
            </>
          ) : (
            <p className="text-center text-sm font-bold text-fuchsia-700">Regarde notre premier date ! 💞</p>
          )}
          {quizMsg && <p className="mt-2 text-center text-xs font-bold text-purple-600">{quizMsg}</p>}
        </RetroWindow>
      )}

      {/* Pop-ups applications */}
      {popup && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/30 px-4 py-6 overflow-auto" onClick={() => setPopup(null)}>
          <div onClick={(e) => e.stopPropagation()}>
            {popup === "compat" && <CompatTest onClose={() => setPopup(null)} />}
            {popup === "poem" && <Typewriter onClose={() => setPopup(null)} title="poeme.txt" content={POEM} ctaLabel="Lire le poème 📜" endLabel={POEM_SIGNATURE} />}
            {popup === "love" && <Typewriter onClose={() => setPopup(null)} title="lettre_damour.txt" content={LOVE_LETTER} ctaLabel="Lire le mot ✍️" endLabel="💌 Écrit avec amour" />}
            {popup === "wheel" && <Wheel onClose={() => setPopup(null)} />}
          </div>
        </div>
      )}
    </div>
  );
}
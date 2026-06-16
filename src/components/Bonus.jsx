import React, { useState } from "react";
import useSound from "./useSound.js";
import { RetroWindow } from "./Ui.jsx";
import { COMPAT_MSGS } from "../data/content.js";

// ---------- Test de compatibilité (accepte seulement "Bilel") ----------
export function CompatTest({ onClose }) {
  const snd = useSound();
  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("Ana");
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [shown, setShown] = useState([]);
  const [done, setDone] = useState(false);
  const [rejected, setRejected] = useState(false);

  const launch = () => {
    if (n1.trim().toLowerCase() !== "bilel") {
      setRejected(true);
      snd.error();
      setTimeout(() => setRejected(false), 2200);
      return;
    }
    if (!n2.trim()) return;

    setRunning(true);
    setDone(false);
    setScore(0);
    setShown([]);
    snd.pop();

    let s = 0;
    const barTimer = setInterval(() => {
      s += 2;
      if (s >= 100) {
        s = 100;
        clearInterval(barTimer);
        setScore(100);
        setDone(true);
        snd.victory();
      } else {
        setScore(s);
      }
    }, 130);

    let i = 0;
    const msgTimer = setInterval(() => {
      setShown((prev) => [...prev, COMPAT_MSGS[i]]);
      snd.key();
      i++;
      if (i >= COMPAT_MSGS.length) clearInterval(msgTimer);
    }, 700);
  };

  return (
    <RetroWindow title="amour_calculator.exe" className="w-full max-w-md" onClose={onClose}>
      <div className="flex items-center gap-2">
        <input value={n1} onChange={(e) => setN1(e.target.value)} placeholder="Prénom 1" className="w-full rounded-lg border-2 border-pink-300 bg-white px-3 py-2 text-sm outline-none focus:border-fuchsia-500" />
        <span className="text-xl">💕</span>
        <input value={n2} onChange={(e) => setN2(e.target.value)} placeholder="Prénom 2" className="w-full rounded-lg border-2 border-pink-300 bg-white px-3 py-2 text-sm outline-none focus:border-fuchsia-500" />
      </div>

      {rejected && (
        <div className="mt-3 animate-[pop_0.3s_ease] rounded border-2 border-red-300 bg-red-50 px-3 py-2 text-center">
          <div className="text-3xl">😡</div>
          <p className="text-xs font-black text-red-600 mt-1">Erreur : Tu as mis autre chose que Bilel là ?? </p>
        </div>
      )}

      <div className="mt-4 h-6 w-full overflow-hidden rounded-full border-2 border-fuchsia-300 bg-white">
        <div className="h-full transition-all duration-100" style={{ width: `${score}%`, background: "linear-gradient(90deg,#ff7eb9,#d14fff,#7b2ff7)" }} />
      </div>
      <p className="mt-1 text-center text-2xl font-black text-fuchsia-600">{score}%</p>

      {shown.length > 0 && (
        <ul className="mt-2 flex flex-col gap-1">
          {shown.map((m, i) => (
            <li key={i} className="animate-[pop_0.3s_ease] rounded border border-fuchsia-200 bg-fuchsia-50 px-2 py-1 text-xs font-bold text-purple-700">{m}</li>
          ))}
        </ul>
      )}

      {done && (
        <div className="mt-3 rounded border-2 border-emerald-300 bg-emerald-50 px-3 py-2 text-center">
          <p className="text-sm font-black text-emerald-700">{n1} + {n2} = 100% 💖</p>
          <p className="text-xs font-bold text-emerald-600 mt-1">C'était écrit !</p>
        </div>
      )}

      {!running && !done && (
        <div className="mt-4 flex justify-center">
          <button onClick={launch} className="rounded-full border-2 border-white bg-gradient-to-r from-pink-500 to-fuchsia-500 px-6 py-2 text-sm font-black text-white shadow-[2px_2px_0_rgba(150,110,190,0.5)] active:translate-y-[2px]">
            Lancer le test 💞
          </button>
        </div>
      )}
    </RetroWindow>
  );
}

// ---------- Machine à écrire (poème ou mot d'amour) ----------
export function Typewriter({ onClose, title, content, ctaLabel = "Lire ✍️", endLabel = "💌 Écrit avec amour" }) {
  const snd = useSound();
  const [text, setText] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  const start = () => {
    setStarted(true);
    setText("");
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setText(content.slice(0, i));
      if (i % 2 === 0) snd.type();
      if (i >= content.length) {
        clearInterval(timer);
        setDone(true);
        snd.victory();
      }
    }, 45);
  };

  return (
    <RetroWindow title={title} className="w-full max-w-md" onClose={onClose}>
      <div
        className="min-h-[150px] max-h-[50vh] overflow-auto whitespace-pre-wrap rounded-lg border-2 px-4 py-3 text-sm leading-relaxed text-purple-900"
        style={{ borderColor: "#e9d5ff", background: "linear-gradient(180deg,#fffdf7,#fff4fb)", fontFamily: "'Courier New', monospace" }}
      >
        {text}
        {started && !done && <span className="inline-block w-[2px] animate-[twinkle_0.8s_steps(1)_infinite]">▌</span>}
      </div>

      {!started ? (
        <div className="mt-4 flex justify-center">
          <button onClick={start} className="rounded-full border-2 border-white bg-gradient-to-r from-pink-500 to-fuchsia-500 px-6 py-2 text-sm font-black text-white shadow-[2px_2px_0_rgba(150,110,190,0.5)] active:translate-y-[2px]">
            {ctaLabel}
          </button>
        </div>
      ) : done ? (
        <p className="mt-3 text-center text-xs font-bold text-fuchsia-600">{endLabel}</p>
      ) : null}
    </RetroWindow>
  );
}
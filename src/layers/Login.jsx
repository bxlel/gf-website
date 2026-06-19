import React, { useState } from "react";
import FlipPhoneSVG from "../FlipPhoneSVG.jsx";
import useSound from "../components/useSound.js";
import { CODE } from "../data/content.js";

// Écran de connexion : le téléphone à clapet. Quand le code est bon,
// on appelle onUnlock() pour passer au bureau.
export default function Login({ onUnlock }) {
  const snd = useSound();
  const [entry, setEntry] = useState("");
  const [shake, setShake] = useState(false);
  const [status, setStatus] = useState("TAPE LE CODE 📟");
  const [unlocked, setUnlocked] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const [hint2, setHint2] = useState(false);
  const [quizMsg, setQuizMsg] = useState("");

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
        setTimeout(onUnlock, 1200);
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
    if (correct) { setHint2(true); setQuizMsg("Évidemment 😏 Indice : Regarde notre premier date !"); }
    else { setQuizMsg("Mauvaise réponse, recommence 💅"); snd.error(); }
  };

  return (
    <div className="relative z-20 flex flex-col items-center gap-4 px-3 w-full">
      <p className="text-center text-sm sm:text-base font-bold text-purple-700 bg-white/70 rounded-full px-4 py-1 shadow">
        Indice 1 : Le jour où tout a commencé... 🗓️
      </p>

      <div className={`flex justify-center ${shake ? "animate-[shaker_0.4s_ease]" : ""}`}>
        <FlipPhoneSVG currentEntry={entry.padEnd(4, "•")} statusText={status} onKey={handleKey} />
      </div>

      {!hintOpen ? (
        <button onClick={() => { snd.pop(); setHintOpen(true); }} className="rounded-full border-2 border-white bg-gradient-to-r from-pink-400 to-fuchsia-500 px-5 py-2 text-sm font-bold text-white shadow-[2px_2px_0_rgba(150,110,190,0.5)] active:translate-y-[2px]">
          💡 Besoin d'un second indice ?
        </button>
      ) : (
        <div className="rounded-md border-2 bg-white max-w-xs w-full p-3" style={{ borderColor: "#c9c9d6" }}>
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
        </div>
      )}
    </div>
  );
}
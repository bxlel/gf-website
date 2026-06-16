import React, { useState } from "react";
import useSound from "../components/useSound.js";
import { RetroWindow } from "../components/Ui.jsx";

export default function Layer3({ onComplete }) {
  const snd = useSound();
  const [angry, setAngry] = useState(false);
  const [forced, setForced] = useState(false);

  const sayNo = () => {
    snd.error();
    setAngry(true);
    setTimeout(() => { snd.pop(); setForced(true); setAngry(false); }, 1600);
  };
  const sayYes = () => { snd.victory(); setForced(true); };

  return (
    <div className="relative z-20 flex w-full max-w-lg flex-col items-center gap-4 px-3">
      <RetroWindow title="C:\\Windows\\expo_insolite.exe" className="w-full">
        <div className="flex items-start gap-3">
          <span className="text-3xl">🖼️</span>
          <p className="text-base sm:text-lg font-bold text-purple-800">
            J'ai trouvé une expo incroyable à faire sur Paris, qui nous parlera à tous les 2 tu m'accompagnes ?
          </p>
        </div>

        <div className="mt-5 flex justify-center gap-4">
          <button onClick={sayYes} className={`rounded border-2 px-6 py-2 text-sm font-black transition-all ${forced ? "border-emerald-600 bg-gradient-to-b from-emerald-300 to-emerald-500 text-white ring-4 ring-emerald-300" : "border-gray-400 bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800"}`}>
            {forced ? "☑ Oui" : "Oui"}
          </button>
          <button onClick={sayNo} className="rounded border-2 border-gray-400 bg-gradient-to-b from-gray-100 to-gray-300 px-6 py-2 text-sm font-black text-gray-800">Non</button>
        </div>

        {forced && (
          <div className="mt-5 flex flex-col items-center gap-2">
            <p className="text-center text-sm font-bold text-emerald-700">Excellent choix 😇 C'est un rendez-vous !</p>
            <button onClick={onComplete} className="rounded-full border-2 border-white bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-2 text-sm font-black text-white shadow-[2px_2px_0_rgba(150,110,190,0.5)] active:translate-y-[2px]">Suivant ▶</button>
          </div>
        )}
      </RetroWindow>

      {angry && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/30 px-4">
          <div className="animate-[pop_0.3s_ease] rounded-md border-2 border-red-300 bg-white p-5 text-center shadow-xl">
            <div className="text-5xl">😡</div>
            <p className="mt-2 max-w-[260px] text-sm font-black text-red-600">Tu es sûre de toi ? Je pense que tu t'es trompée...</p>
          </div>
        </div>
      )}
    </div>
  );
}
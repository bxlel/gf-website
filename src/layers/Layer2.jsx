import React, { useState, useRef, useCallback } from "react";
import useSound from "../components/useSound.js";
import { RetroWindow } from "../components/Ui.jsx";

export default function Layer2({ onComplete }) {
  const snd = useSound();
  const areaRef = useRef(null);
  const [yes, setYes] = useState(false);
  const [pos, setPos] = useState({ x: 130, y: 120 });

  const BTN_W = 92;
  const BTN_H = 46;

  const flee = useCallback((clientX, clientY) => {
    const area = areaRef.current;
    if (!area) return;
    const rect = area.getBoundingClientRect();
    const maxX = rect.width - BTN_W;
    const maxY = rect.height - BTN_H;

    let tx = 0, ty = 0, ok = false, tries = 0;
    while (!ok && tries < 30) {
      tries++;
      tx = Math.max(0, Math.min(maxX, Math.random() * maxX));
      ty = Math.max(0, Math.min(maxY, Math.random() * maxY));
      const cx = clientX - rect.left;
      const cy = clientY - rect.top;
      const dCursor = Math.hypot(tx + BTN_W / 2 - cx, ty + BTN_H / 2 - cy);
      if (dCursor > 80) ok = true;
    }
    setPos({ x: tx, y: ty });
    snd.pop();
  }, [snd]);

  return (
    <div className="relative z-20 flex w-full max-w-lg flex-col items-center gap-4 px-3">
      <RetroWindow title="grosse_question.exe" className="w-full">
        <p className="mb-1 text-center text-xl sm:text-2xl font-black text-fuchsia-700" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
          Veux-tu sortir avec moi ce samedi ? 💖
        </p>
        <p className="mb-4 text-center text-xs font-bold text-purple-500">(T'as pas intérêt à dire non)</p>

        <div ref={areaRef} className="relative mx-auto h-56 w-full overflow-hidden rounded-lg border-2 border-pink-200 bg-white/50">
          <button onClick={() => { snd.victory(); setYes(true); }} className="absolute left-1/2 top-6 -translate-x-1/2 rounded-full border-2 border-white bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-3 text-lg font-black text-white shadow-[3px_3px_0_rgba(150,110,190,0.5)] hover:scale-105 active:translate-y-[2px] transition-transform">
            Oui ! 💕
          </button>

          <button
            onMouseEnter={(e) => flee(e.clientX, e.clientY)}
            onMouseMove={(e) => flee(e.clientX, e.clientY)}
            onTouchStart={(e) => { e.preventDefault(); const t = e.touches[0]; flee(t.clientX, t.clientY); }}
            style={{ left: pos.x, top: pos.y, width: BTN_W, height: BTN_H }}
            className="absolute rounded-full border-2 border-gray-300 bg-gradient-to-b from-gray-200 to-gray-400 text-sm font-bold text-gray-700 transition-all duration-150"
          >Non</button>
        </div>

        <div className="mt-4 flex justify-center">
          <button disabled={!yes} onClick={onComplete} className={`rounded-full border-2 px-6 py-2 text-sm font-black transition-all ${yes ? "border-white bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-[2px_2px_0_rgba(150,110,190,0.5)] active:translate-y-[2px]" : "cursor-not-allowed border-gray-300 bg-gray-200 text-gray-400"}`}>
            Suivant ▶
          </button>
        </div>
      </RetroWindow>
    </div>
  );
}
import React, { useRef } from "react";

// ---------- Fenêtre rétro réutilisable ----------
export function RetroWindow({ title, children, className = "", onClose }) {
  return (
    <div
      className={`rounded-md border-2 shadow-[4px_4px_0_rgba(120,90,160,0.4)] ${className}`}
      style={{ borderColor: "#c9c9d6", background: "linear-gradient(180deg,#ffffff 0%,#fdf0ff 55%,#f6e2ff 100%)" }}
    >
      <div className="flex items-center justify-between rounded-t-sm px-2 py-1" style={{ background: "linear-gradient(90deg,#7b2ff7,#d14fff,#ff6ad5)" }}>
        <span className="text-[11px] sm:text-sm font-bold text-white drop-shadow select-none truncate">{title}</span>
        <div className="flex gap-1">
          <span className="grid h-4 w-4 place-items-center rounded-[3px] border border-white/70 bg-[#e6e6ef] text-[9px] font-bold text-gray-700">_</span>
          <span className="grid h-4 w-4 place-items-center rounded-[3px] border border-white/70 bg-[#e6e6ef] text-[9px] font-bold text-gray-700">▢</span>
          <span onClick={onClose} className="grid h-4 w-4 place-items-center rounded-[3px] border border-white/70 bg-[#ffb3c8] text-[9px] font-bold text-gray-800 cursor-pointer">✕</span>
        </div>
      </div>
      <div className="p-3 sm:p-4">{children}</div>
    </div>
  );
}

// ---------- Confettis (final ou mini) ----------
export function Confetti({ run, count = 60, fixed = true }) {
  const pieces = useRef(
    Array.from({ length: count }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 1.2,
      dur: 2.2 + Math.random() * 2.2,
      e: ["❤️", "💖", "💕", "💗", "✨", "💝"][i % 6],
      size: 12 + Math.random() * 16,
    }))
  ).current;
  if (!run) return null;
  return (
    <div className={`pointer-events-none ${fixed ? "fixed" : "absolute"} inset-0 z-30 overflow-hidden`}>
      {pieces.map((p, i) => (
        <span key={i} className="absolute -top-10" style={{ left: `${p.left}%`, fontSize: `${p.size}px`, animation: `fall ${p.dur}s linear ${p.delay}s infinite` }}>
          {p.e}
        </span>
      ))}
    </div>
  );
}
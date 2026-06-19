import React from "react";

// Fenêtre toujours ouverte (en-tête OS + contenu), sans bouton retour.
// Sert à empiler les sections sur la page qui défile.
export default function SectionWindow({ title, children, className = "" }) {
  return (
    <div
      className={`w-full max-w-2xl rounded-md border-2 overflow-hidden shadow-[4px_4px_0_rgba(120,90,160,0.5)] ${className}`}
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
      <div className="p-4">{children}</div>
    </div>
  );
}
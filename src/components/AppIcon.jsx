import React from "react";

// Icône carrée cliquable. Placeholder pour l'instant ;
// plus tard tu passes `img` (un PNG/SVG importé) à la place de `emoji`.
export default function AppIcon({ label, emoji, img, onOpen }) {
  return (
    <button onClick={onOpen} className="flex flex-col items-center gap-1 w-20 group">
      <div
        className="h-16 w-16 rounded-2xl border-2 border-white grid place-items-center shadow-[2px_2px_0_rgba(150,110,190,0.5)] group-active:translate-y-[2px] overflow-hidden"
        style={{ background: img ? "transparent" : "linear-gradient(135deg,#ff8fc7,#d14fff)" }}
      >
        {img ? (
          <img src={img} alt={label} className="h-full w-full object-cover" />
        ) : (
          <span className="text-3xl">{emoji}</span>
        )}
      </div>
      <span className="text-[11px] font-bold text-purple-800 text-center leading-tight">{label}</span>
    </button>
  );
}
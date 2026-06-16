import React, { useState, useEffect } from "react";
import { FIRST_DATE } from "../data/content.js";

// Compteur en direct depuis votre premier date 💕
export default function LoveTimer() {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const start = new Date(FIRST_DATE).getTime();
  let diff = Math.max(0, Math.floor((now - start) / 1000)); // en secondes

  const days = Math.floor(diff / 86400); diff -= days * 86400;
  const hours = Math.floor(diff / 3600); diff -= hours * 3600;
  const mins = Math.floor(diff / 60);
  const secs = diff - mins * 60;

  const Cell = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <span
        className="rounded-lg px-2 py-1 text-lg font-black text-white min-w-[44px] text-center"
        style={{ background: "linear-gradient(180deg,#ff6ad5,#d14fff)", boxShadow: "0 2px 0 rgba(150,90,170,0.5)", fontFamily: "monospace" }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[10px] font-bold text-purple-600">{label}</span>
    </div>
  );

  return (
    <div
      className="flex flex-col items-center gap-2 rounded-2xl border-2 border-white px-4 py-3 shadow-[2px_2px_0_rgba(150,110,190,0.4)]"
      style={{ background: "linear-gradient(180deg,#fff0fb,#fde2f6)" }}
    >
      <p className="text-xs font-black text-fuchsia-600">💞 Je suis apparu depuis...</p>
      <div className="flex items-center gap-2">
        <Cell value={days} label="jours" />
        <Cell value={hours} label="heures" />
        <Cell value={mins} label="min" />
        <Cell value={secs} label="sec" />
      </div>
    </div>
  );
}
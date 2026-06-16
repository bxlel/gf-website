import React, { useState } from "react";
import useSound from "../components/useSound.js";
import { RetroWindow, Confetti } from "../components/Ui.jsx";
import { nextSaturdayISO, buildICS } from "../components/helpers.jsx";

export default function Layer5() {
  const snd = useSound();
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const confirm = () => {
    snd.victory();
    const ics = buildICS();
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Date-avec-l-homme-de-ma-vie.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setConfirmed(true);
  };

  const sat = nextSaturdayISO();
  const dateLabel = sat.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="relative z-20 flex w-full max-w-lg flex-col items-center gap-4 px-3">
      <Confetti run count={60} />
      <h2 className="text-center text-2xl sm:text-3xl font-black text-fuchsia-600 drop-shadow" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
        🏆 Félicitations, tu as gagné un date avec l'homme de ta vie ! ❤️
      </h2>

      <RetroWindow title="confirmation_date.exe" className="w-full">
        <p className="mb-3 text-center text-sm font-bold text-purple-700">
          Date prévu : <span className="text-fuchsia-600">{dateLabel}</span> · 08h00 → 19h00
        </p>
        <label className="block text-xs font-bold text-purple-600 mb-1">Ton adresse mail iCloud</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ana@icloud.com" className="w-full rounded-lg border-2 border-pink-300 bg-white px-3 py-2 text-sm outline-none focus:border-fuchsia-500" />
        <button onClick={confirm} className="mt-4 w-full rounded-full border-2 border-white bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-6 py-3 text-base font-black text-white shadow-[3px_3px_0_rgba(150,110,190,0.5)] active:translate-y-[2px]">
          📅 Confirmer le Date
        </button>

        {confirmed && (
          <p className="mt-3 rounded border-2 border-emerald-300 bg-emerald-50 px-3 py-2 text-center text-xs font-bold text-emerald-700">
            C'est officiel 💖 Le fichier .ics a été téléchargé — ouvre-le pour l'ajouter à ton calendrier !
          </p>
        )}
      </RetroWindow>
    </div>
  );
}
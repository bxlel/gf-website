import React, { useState, useRef } from "react";
import useSound from "../components/useSound.js";
import { RetroWindow, Confetti } from "../components/Ui.jsx";
import { INITIAL_MEN } from "../data/content.js";

export default function Layer4({ onComplete }) {
  const snd = useSound();
  const [list, setList] = useState(INITIAL_MEN);
  const [msg, setMsg] = useState("");
  const [bounceId, setBounceId] = useState(null);
  const [won, setWon] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const dragIndex = useRef(null);

  const enforce = (arr) => {
    const idx = arr.findIndex((m) => m.id === "bilel");
    if (idx !== 0) {
      const copy = [...arr];
      const [b] = copy.splice(idx, 1);
      copy.unshift(b);
      setMsg("Erreur système : Choix factuellement incorrect. Réessaie.");
      snd.error();
      setBounceId("bilel");
      setTimeout(() => setBounceId(null), 500);
      return copy;
    }
    setMsg("");
    return arr;
  };

  const move = (from, to) => {
    if (to < 0 || to >= list.length) return;
    const copy = [...list];
    const [item] = copy.splice(from, 1);
    copy.splice(to, 0, item);
    setList(enforce(copy));
  };

  const onDragStart = (i) => (dragIndex.current = i);
  const onDrop = (i) => {
    if (dragIndex.current === null) return;
    const copy = [...list];
    const [item] = copy.splice(dragIndex.current, 1);
    copy.splice(i, 0, item);
    dragIndex.current = null;
    setList(enforce(copy));
  };

  const validate = () => {
    if (list[0].id === "bilel") {
      setWon(true);
      setCelebrate(true);
      snd.victory();
      setTimeout(onComplete, 1600);
    } else {
      enforce(list);
    }
  };

  return (
    <div className="relative z-20 flex w-full max-w-md flex-col items-center gap-3 px-3">
      <Confetti run={celebrate} count={26} fixed={false} />

      <RetroWindow title="classement_officiel.exe" className="w-full">
        <p className="mb-3 text-center text-sm font-bold text-purple-800">
          Classe les 5 plus beaux hommes de la planète en glissant les noms de chacun (Top 1 → Top 5) 👑
        </p>

        <ul className="flex flex-col gap-2">
          {list.map((m, i) => (
            <li key={m.id} draggable onDragStart={() => onDragStart(i)} onDragOver={(e) => e.preventDefault()} onDrop={() => onDrop(i)}
              className={`flex items-center justify-between rounded-lg border-2 px-3 py-2 cursor-grab active:cursor-grabbing ${bounceId === m.id ? "animate-[spring_0.5s_ease]" : ""}`}
              style={{ borderColor: m.id === "bilel" ? "#facc15" : "#e9d5ff", background: m.id === "bilel" ? "linear-gradient(90deg,#fff7d6,#ffe9a8)" : "linear-gradient(90deg,#ffffff,#f8eaff)" }}>
              <span className="flex items-center gap-2 font-bold text-purple-900">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-fuchsia-500 text-xs font-black text-white">{i + 1}</span>
                {m.name}
              </span>
              <span className="flex flex-col">
                <button onClick={() => move(i, i - 1)} className="text-xs leading-none text-purple-500 hover:text-purple-800">▲</button>
                <button onClick={() => move(i, i + 1)} className="text-xs leading-none text-purple-500 hover:text-purple-800">▼</button>
              </span>
            </li>
          ))}
        </ul>

        {msg && <p className="mt-3 rounded border-2 border-red-300 bg-red-50 px-2 py-1 text-center text-xs font-black text-red-600">⚠ {msg}</p>}

        <div className="mt-4 flex justify-center">
          <button onClick={validate} className="rounded-full border-2 border-white bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-2 text-sm font-black text-white shadow-[2px_2px_0_rgba(150,110,190,0.5)] active:translate-y-[2px]">
            {won ? "Parfait ✅" : "Valider le classement"}
          </button>
        </div>
      </RetroWindow>
    </div>
  );
}
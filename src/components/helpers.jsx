import React from "react";

// ---------- Keyframes globales ----------
export function GlobalStyles() {
  return (
    <style>{`
      @keyframes shine { to { background-position: 200% center; } }
      @keyframes twinkle { 0%,100%{opacity:.2;transform:scale(.7)} 50%{opacity:1;transform:scale(1.2)} }
      @keyframes floaty { 0%,100%{transform:translateY(0) rotate(var(--r,0))} 50%{transform:translateY(-10px)} }
      @keyframes shaker { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }
      @keyframes pop { 0%{transform:scale(.6);opacity:0} 100%{transform:scale(1);opacity:1} }
      @keyframes spring { 0%{transform:translateY(0)} 30%{transform:translateY(-14px)} 55%{transform:translateY(6px)} 75%{transform:translateY(-4px)} 100%{transform:translateY(0)} }
      @keyframes fall { 0%{transform:translateY(-10vh) rotate(0)} 100%{transform:translateY(110vh) rotate(360deg)} }
      @media (prefers-reduced-motion: reduce){ *{animation-duration:.001ms!important;animation-iteration-count:1!important} }
    `}</style>
  );
}

// ---------- Calendrier .ics ----------
export function nextSaturdayISO() {
  const now = new Date();
  const day = now.getDay();
  let add = (6 - day + 7) % 7;
  if (add === 0) add = 7;
  const sat = new Date(now);
  sat.setDate(now.getDate() + add);
  return sat;
}

function pad(n) { return String(n).padStart(2, "0"); }

export function buildICS() {
  const sat = nextSaturdayISO();
  const y = sat.getFullYear();
  const m = pad(sat.getMonth() + 1);
  const d = pad(sat.getDate());
  const dtStart = `${y}${m}${d}T080000`;
  const dtEnd = `${y}${m}${d}T190000`;
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const uid = `bilel-${Date.now()}@anabilel.love`;

  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Ana+Bilel//Date//FR", "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT", `UID:${uid}`, `DTSTAMP:${stamp}`, `DTSTART:${dtStart}`, `DTEND:${dtEnd}`,
    "SUMMARY:Date avec l'homme de ma vie", "DESCRIPTION:Expo à Paris Ana + Bilel = <3", "LOCATION:Paris", "STATUS:CONFIRMED",
    "BEGIN:VALARM", "TRIGGER:-PT2H", "ACTION:DISPLAY", "DESCRIPTION:Prépare-toi pour le date 💖", "END:VALARM",
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
}
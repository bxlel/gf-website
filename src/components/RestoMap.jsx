import React, { useState, useEffect, useRef } from "react";
import useSound from "./useSound.js";
import { RESTOS } from "../data/content.js";

// Carte des restos avec coordonnées DIRECTES (lat/lng dans content.js).
// Les restos sans coordonnées (lat/lng vides ou 0) sont simplement ignorés
// jusqu'à ce que tu les remplisses.
export default function RestoMap() {
  const snd = useSound();
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const [selected, setSelected] = useState(null);

  // Restos qui ont des coordonnées valides
  const placed = RESTOS.filter((r) => typeof r.lat === "number" && typeof r.lng === "number" && r.lat && r.lng);
  const missing = RESTOS.filter((r) => !(typeof r.lat === "number" && typeof r.lng === "number" && r.lat && r.lng));

  useEffect(() => {
    let cancelled = false;

    const loadLeaflet = () =>
      new Promise((resolve) => {
        if (window.L) return resolve(window.L);
        if (!document.getElementById("leaflet-css")) {
          const link = document.createElement("link");
          link.id = "leaflet-css";
          link.rel = "stylesheet";
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
          document.head.appendChild(link);
        }
        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.onload = () => resolve(window.L);
        document.body.appendChild(script);
      });

    const pinSVG = `
      <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 0C6.7 0 0 6.7 0 15c0 10 15 25 15 25s15-15 15-25C30 6.7 23.3 0 15 0z"
          fill="#ff4fa3" stroke="#ffffff" stroke-width="2"/>
        <circle cx="15" cy="15" r="6" fill="#ffffff"/>
      </svg>`;

    loadLeaflet().then((L) => {
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, { scrollWheelZoom: true }).setView([48.7, 2.4], 9);
      mapRef.current = map;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap", maxZoom: 19 }).addTo(map);
      setTimeout(() => map.invalidateSize(), 200);

      const bounds = [];
      placed.forEach((r) => {
        const icon = L.divIcon({
          className: "",
          html: `<div style="filter:drop-shadow(0 2px 2px rgba(0,0,0,.35))">${pinSVG}</div>`,
          iconSize: [30, 40], iconAnchor: [15, 40],
        });
        const marker = L.marker([r.lat, r.lng], { icon }).addTo(map);
        marker.on("click", () => { snd.pop(); setSelected(r); });
        bounds.push([r.lat, r.lng]);
      });

      if (bounds.length > 1) map.fitBounds(bounds, { padding: [40, 40] });
      else if (bounds.length === 1) map.setView(bounds[0], 14);
    });

    return () => {
      cancelled = true;
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, []);

  return (
    <div className="flex flex-col">
      <p className="mb-2 text-center text-sm font-bold text-purple-800">🍽️ Tous nos restos sur la carte</p>

      <div
        ref={containerRef}
        className="w-full rounded-lg border-2 border-pink-300 overflow-hidden"
        style={{ height: "min(65vh, 480px)" }}
      />

      {selected ? (
        <div className="mt-3 rounded border-2 border-fuchsia-300 bg-fuchsia-50 px-3 py-2">
          <p className="text-sm font-black text-fuchsia-700">{selected.emoji} {selected.name}</p>
          <p className="text-xs font-bold text-purple-600">📅 {selected.date}</p>
          {selected.note && <p className="text-xs text-purple-700 mt-1">{selected.note}</p>}
        </div>
      ) : (
        <p className="mt-2 text-center text-xs font-bold text-purple-500">Touche un pin pour voir le resto 💕</p>
      )}

      {missing.length > 0 && (
        <p className="mt-2 text-center text-[11px] text-purple-400">
          À compléter (coordonnées vides) : {missing.map((r) => r.name).join(", ")}
        </p>
      )}
    </div>
  );
}
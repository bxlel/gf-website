import React, { useState, useEffect, useRef } from "react";
import useSound from "./useSound.js";
import { RetroWindow } from "./Ui.jsx";
import { RESTOS } from "../data/content.js";

// Carte interactive des restos.
// Utilise Leaflet (chargé depuis un CDN au moment de l'ouverture).
export default function RestoMap({ onClose }) {
  const snd = useSound();
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let cancelled = false;

    // Charge Leaflet (CSS + JS) une seule fois
    const loadLeaflet = () =>
      new Promise((resolve) => {
        if (window.L) return resolve(window.L);
        // CSS
        if (!document.getElementById("leaflet-css")) {
          const link = document.createElement("link");
          link.id = "leaflet-css";
          link.rel = "stylesheet";
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
          document.head.appendChild(link);
        }
        // JS
        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.onload = () => resolve(window.L);
        document.body.appendChild(script);
      });

    loadLeaflet().then((L) => {
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, { scrollWheelZoom: true }).setView([48.8566, 2.3522], 6);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
        maxZoom: 19,
      }).addTo(map);

      const group = [];
      RESTOS.forEach((r) => {
        const icon = L.divIcon({
          className: "",
          html: `<div style="font-size:26px;filter:drop-shadow(0 2px 2px rgba(0,0,0,.4))">${r.emoji}</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 28],
        });
        const marker = L.marker([r.lat, r.lng], { icon }).addTo(map);
        marker.on("click", () => { snd.pop(); setSelected(r); });
        group.push([r.lat, r.lng]);
      });

      if (group.length > 1) {
        map.fitBounds(group, { padding: [40, 40] });
      }
    });

    return () => {
      cancelled = true;
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, []);

  return (
    <RetroWindow title="carte_des_restos.exe" className="w-full max-w-lg" onClose={onClose}>
      <p className="mb-2 text-center text-sm font-bold text-purple-800">
        🍽️ Tous nos restos sur la carte
      </p>

      <div
        ref={containerRef}
        className="w-full rounded-lg border-2 border-pink-300 overflow-hidden"
        style={{ height: "320px" }}
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
    </RetroWindow>
  );
}
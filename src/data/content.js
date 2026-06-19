import helloKittyImage from "../HelloKitty.png";
import danielImage from "../Daniel.png";

// Code du téléphone à clapet (4 chiffres)
export const CODE = "0412";

// Mot d'amour (machine à écrire "Mot secret")
export const LOVE_LETTER =
  "Ana, Tu illumines tout. Avec toi tout est plus beau, plus drôle, plus doux. J'ai hâte de notre prochain date et de me promener avec toi à nouveau sur Paris. — Bilel 💖";

// Poème (domaine public)
export const POEM =
  "Je fais souvent ce rêve étrange et pénétrant\n" +
  "D'une femme inconnue, et que j'aime, et qui m'aime,\n" +
  "Et qui n'est, chaque fois, ni tout à fait la même\n" +
  "Ni tout à fait une autre, et m'aime et me comprend.\n\n" +
  "— Paul Verlaine, Mon rêve familier (1866)";

export const POEM_SIGNATURE = "🕊️ Paul Verlaine - Mon Rêve Familier";

// Messages du test de compatibilité (s'empilent un par un)
export const COMPAT_MSGS = [
  "💅 Charisme : niveau dangereux",
  "🔥 Beauté : bogosse hors normes tous les 2",
  "😂 Humour : 2 comiques détectés",
  "🧠 Intelligence : très élevée (Ana pas trop)",
  "🍝 Amour de la bouffe : 200% confirmé",
  "💓 Cœurs parfaitement synchronisés",
  "🥹 Recherche de défauts chez Ana : 0 trouvé",
  "🐱 Jiji",
  "✨ Verdict : c'était écrit dans les étoiles",
];

// ============================================================
//  MOODBOARD : chaque 🐱 est un EMPLACEMENT pour une future image.
//  Pour mettre une photo : importe-la en haut du fichier
//     import maPhoto from "../maPhoto.png";
//  puis remplace  { e: "🐱", ... }  par  { img: maPhoto, ... }
//  (les images helloKittyImage et danielImage sont déjà importées
//   en haut, tu peux les réutiliser comme exemple)
// ============================================================
export const STICKERS = [
  { e: "🐱", x: "5%",  y: "14%", r: -8,  s: 2.2 },
  { e: "🐱", x: "84%", y: "12%", r: 7,   s: 2.4 },
  { e: "🐱", x: "3%",  y: "44%", r: -5,  s: 2.6 },
  { e: "🐱", x: "88%", y: "40%", r: 9,   s: 2.2 },
  { e: "🐱", x: "6%",  y: "74%", r: 6,   s: 2.4 },
  { e: "🐱", x: "85%", y: "72%", r: -7,  s: 2.6 },
  { e: "🐱", x: "20%", y: "88%", r: 4,   s: 2.0 },
  { e: "🐱", x: "72%", y: "90%", r: -10, s: 2.2 },
  { e: "🐱", x: "46%", y: "5%",  r: 3,   s: 1.8 },
];

// Classement des "plus beaux hommes" (Bilel doit rester #1)
export const INITIAL_MEN = [
  { id: "bilel", name: "Bilel" },
  { id: "brad", name: "Jacob Elordi" },
  { id: "henry", name: "Henry Cavill" },
  { id: "ryan", name: "Ryan Gosling" },
  { id: "timo", name: "Rauw Alejandro" },
  { id: "bunny", name: "Bad Bunny" },
];

// Date de votre premier date (année, mois, jour) — mois : 0=janvier, donc 11=décembre
export const FIRST_DATE = new Date(2025, 11, 4, 0, 0, 0);

// ============================================================
// ============================================================
//  RESTOS — colle dans data/content.js (remplace l'ancienne liste)
//  J'ai mis les COORDONNÉES (lat/lng) que j'ai trouvées de façon
//  fiable, et en commentaire l'ADRESSE exacte des autres pour que
//  tu finisses vite (Google Maps → clic droit → copier les 2 nombres).
// ============================================================
export const RESTOS = [
  { name: "Kcook (1er date)", date: "1er date", lat: 48.61469, lng: 2.54784, emoji: "🍜", note: "Notre tout premier resto 💕" },
  { name: "Red Sauce", date: "11 déc.", lat: 48.87290, lng: 2.35160, emoji: "🍝", note: "9 Cour des Petites Écuries, Paris 10" },
  { name: "Burger King Étampes", date: "13 déc.", lat: null, lng: null, emoji: "🍔", note: "Étampes" },
  { name: "Costco Villebon", date: "dim. 14 déc.", lat: null, lng: null, emoji: "🛒", note: "Villebon-sur-Yvette" },
  { name: "Elisa", date: "ven. 19 déc.", lat: 48.85820, lng: 2.38520, emoji: "🍽️", note: "149 Bd Voltaire, Paris 11" },
  { name: "Bouche", date: "déc.", lat: 48.86640, lng: 2.37430, emoji: "🍴", note: "85 Rue Jean-Pierre Timbaud, Paris 11" },
  { name: "Love Pizza", date: "jeu. 25 déc.", lat: null, lng: null, emoji: "🍕", note: "35 Rue du Docteur Roux, Choisy-le-Roi" },
  { name: "Kcook Carré Sénart", date: "ven. 26 déc.", lat: 48.61469, lng: 2.54784, emoji: "🍜", note: "" },
  { name: "McDonald's Avrainville", date: "ven. 2 janv.", lat: null, lng: null, emoji: "🍟", note: "Avrainville" },
  { name: "Bises Nouilles", date: "10 janv.", lat: 48.87170, lng: 2.38050, emoji: "🍜", note: "61 Rue de Belleville, Paris 19" },
  { name: "Kokodak", date: "janv.", lat: 48.84300, lng: 2.34880, emoji: "🍗", note: "8 Rue du Pot de Fer, Paris 5" },
  { name: "Mama Kitchen", date: "janv.", lat: null, lng: null, emoji: "🍲", note: "Lieusaint" },
  { name: "Makaré", date: "mar. 20 janv.", lat: 48.61469, lng: 2.54784, emoji: "🍽️", note: "Carré Sénart" },
  { name: "Breizh Café", date: "dim. 25 janv.", lat: null, lng: null, emoji: "🥞", note: "Abbesses, Paris 18" },
  { name: "Häagen-Dazs Collégien", date: "dim. 1er févr.", lat: null, lng: null, emoji: "🍨", note: "Collégien (Bay 2 ?)" },
  { name: "Touille & Koffi", date: "dim. 1er févr.", lat: null, lng: null, emoji: "☕", note: "Paris 1er" },
  { name: "The Monocle Café", date: "dim. 1er févr.", lat: 48.86560, lng: 2.34770, emoji: "☕", note: "16 Rue Bachaumont, Paris 2" },
  { name: "Les Gourmandises (boulangerie)", date: "mar. 3 févr.", lat: null, lng: null, emoji: "🥐", note: "Étampes" },
  { name: "Taste Crousty", date: "ven. 6 févr.", lat: null, lng: null, emoji: "🍗", note: "Étampes" },
  { name: "Quick Étampes", date: "lun. 9 févr.", lat: null, lng: null, emoji: "🍔", note: "Étampes" },
  { name: "La Pardiniera (Vélizy 2)", date: "dim. 15 févr.", lat: null, lng: null, emoji: "🍝", note: "Westfield Vélizy 2" },
  { name: "Pocha (Parly 2)", date: "dim. 15 févr.", lat: null, lng: null, emoji: "🍲", note: "Parly 2, Le Chesnay" },
  { name: "Le Plum", date: "févr.", lat: null, lng: null, emoji: "🍽️", note: "Saint-Cloud" },
  { name: "La Taverne de Zhao", date: "25 févr.", lat: 48.87170, lng: 2.36380, emoji: "🥟", note: "49 Rue des Vinaigriers, Paris 10" },
  { name: "McDonald's Dourdan", date: "lun. 2 mars", lat: null, lng: null, emoji: "🍟", note: "Dourdan" },
  { name: "Fellow Paris", date: "mars", lat: 48.87290, lng: 2.35400, emoji: "☕", note: "84 Rue du Fbg Saint-Denis, Paris 10" },
  { name: "Pon Jin", date: "ven. 6 mars", lat: 48.43360, lng: 2.16190, emoji: "🍜", note: "1 Place du Port, Étampes" },
  { name: "Sainte-Croix", date: "mars", lat: null, lng: null, emoji: "🍽️", note: "Rue Sainte-Croix, Étampes" },
  { name: "Bodrum", date: "mar. 11 mars", lat: null, lng: null, emoji: "🥙", note: "Étampes (grec/kebab)" },
  { name: "New Saveurs d'Asie (Dourdan)", date: "mer. 18 mars", lat: null, lng: null, emoji: "🍜", note: "Dourdan" },
  { name: "Le Pho Ha", date: "ven. 20 mars", lat: null, lng: null, emoji: "🍲", note: "Étampes" },
  { name: "Pon Jin (retour)", date: "lun. 6 avr.", lat: 48.43360, lng: 2.16190, emoji: "🍜", note: "1 Place du Port, Étampes" },
  { name: "Momotaj 2", date: "dim. 19 avr.", lat: null, lng: null, emoji: "🇹🇧", note: "Paris (tibétain)" },
  { name: "Brendy's", date: "jeu. 23 avr.", lat: 48.61469, lng: 2.54784, emoji: "🍔", note: "Carré Sénart" },
  { name: "Restaurant Istanbul", date: "ven. 24 avr.", lat: null, lng: null, emoji: "🥙", note: "Étampes" },
  { name: "Haikara Deep", date: "dim. 26 avr.", lat: null, lng: null, emoji: "🍱", note: "Paris" },
  { name: "Restaurant Istanbul", date: "29 avr.", lat: null, lng: null, emoji: "🥙", note: "Étampes" },
  { name: "Columbus Café (Athis-Mons)", date: "sam. 2 mai", lat: null, lng: null, emoji: "☕", note: "Athis-Mons" },
  { name: "Georgia", date: "dim. 3 mai", lat: null, lng: null, emoji: "🍽️", note: "Paris 10" },
  { name: "Noho des Halles", date: "dim. 3 mai", lat: null, lng: null, emoji: "🍸", note: "Les Halles, Paris 1" },
  { name: "Creamy Daily", date: "dim. 3 mai", lat: null, lng: null, emoji: "🍦", note: "Paris" },
  { name: "Quick Étampes", date: "ven. 8 mai", lat: null, lng: null, emoji: "🍔", note: "Étampes" },
  { name: "L'Orient Palace (Coignières)", date: "dim. 10 mai", lat: null, lng: null, emoji: "🥙", note: "Coignières" },
  { name: "Restaurant Istanbul", date: "lun. 11 mai", lat: null, lng: null, emoji: "🥙", note: "Étampes" },
  { name: "Kcook", date: "jeu. 14 mai", lat: 48.61469, lng: 2.54784, emoji: "🍜", note: "Carré Sénart" },
  { name: "It (italien, Brétigny)", date: "dim. 17 mai", lat: null, lng: null, emoji: "🍝", note: "Brétigny-sur-Orge" },
  { name: "Divo", date: "23 mai", lat: null, lng: null, emoji: "✨", note: "Paris — le gros resto !" },
  { name: "Noho (à nouveau)", date: "25 mai", lat: null, lng: null, emoji: "🍸", note: "Les Halles, Paris 1" },
  { name: "Obrigado (Évry-Courcouronnes)", date: "mai", lat: null, lng: null, emoji: "🍽️", note: "L'Agora, Évry-Courcouronnes" },
  { name: "Kyotorama", date: "lun. 8 juin", lat: 48.43480, lng: 2.16100, emoji: "🍣", note: "40 Rue Sainte-Croix, Étampes" },
  { name: "Le Berlinois", date: "mer. 10 juin", lat: null, lng: null, emoji: "🌭", note: "Étampes (O'Berlinois Kebap)" },
  { name: "Five Guys Lieusaint", date: "dim. 14 juin", lat: null, lng: null, emoji: "🍔", note: "Lieusaint / Carré Sénart" },
];
// ============================================================
//  MOODBOARD : 24 emplacements de photos découpées.
//  img: null = un repère s'affiche. Pour mettre ta photo :
//  importe-la en haut (depuis src/images/) puis  { img: mood1 }
//  Tu peux fixer la place :  { img: mood1, top: 20, left: 12, rot: -8, w: 130 }
// ============================================================
export const MOODBOARD = [
  { img: null }, { img: null }, { img: null }, { img: null },
  { img: null }, { img: null }, { img: null }, { img: null },
  { img: null }, { img: null }, { img: null }, { img: null },
  { img: null }, { img: null }, { img: null }, { img: null },
  { img: null }, { img: null }, { img: null }, { img: null },
  { img: null }, { img: null }, { img: null }, { img: null },
];
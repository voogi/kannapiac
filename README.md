# KannaPiac

Ez egy Next.js alapú webalkalmazás, amely egy térképes helykereső szolgáltatást nyújt. Az alkalmazás a ShivaMap (https://www.shivamap.es/en) oldalhoz hasonló felépítésű, bal oldali sidebar-ral és jobb oldali térképpel.

## Funkciók

- Kategóriák böngészése
- Helyek listázása kategóriák szerint
- OpenStreetMap térkép integráció
- Helyek megjelenítése a térképen
- Részletes információk megjelenítése a kiválasztott helyről
- Reszponzív design

## Technológiák

- Next.js 15
- TypeScript
- Tailwind CSS
- Leaflet és React-Leaflet
- OpenStreetMap

## Telepítés

1. Klónozd a repository-t:
```bash
git clone [repository URL]
cd kannapiac
```

2. Telepítsd a függőségeket:
```bash
npm install
```

3. Indítsd el a fejlesztői szervert:
```bash
npm run dev
```

4. Nyisd meg a böngészőben: [http://localhost:3000](http://localhost:3000)

## Fejlesztés

Az alkalmazás fő komponensei:

- `src/app/page.tsx` - A főoldal, amely tartalmazza a sidebar-t és a térképet
- `src/components/Sidebar.tsx` - A bal oldali sidebar komponens kategóriákkal
- `src/components/Map.tsx` - A Leaflet térkép komponens
- `src/components/LocationDetail.tsx` - A kiválasztott hely részleteit megjelenítő komponens
- `src/data/categories.ts` - A kategóriák adatait tartalmazó fájl
- `src/data/locations.ts` - A helyek adatait tartalmazó fájl

## Leaflet és OpenStreetMap

A projekt Leaflet könyvtárat használ a térképek megjelenítéséhez, OpenStreetMap adatokkal. Ez egy ingyenes és nyílt forráskódú alternatíva a Google Maps helyett, amely nem igényel API kulcsot.

## Licenc

MIT

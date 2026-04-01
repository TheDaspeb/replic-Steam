// Datos y persistencia de juegos
import fs from "node:fs";
import path from "node:path";
const DATA_DIR = path.resolve(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "games.json");
const seedGames = [
    {
        id: 1,
        name: "God of War",
        genre: "Action",
        launch: "2018-04-18",
        multi: false,
        format: "pay"
    },
    {
        id: 2,
        name: "Call of duty",
        genre: "Shooter",
        launch: "2025-11-14",
        multi: false,
        format: "pay"
    },
    {
        id: 3,
        name: "Horizont Zero Dawn",
        genre: "Adventure",
        launch: "2017-02-28",
        multi: false,
        format: "pay"
    },
    {
        id: 4,
        name: "R.E.P.O",
        genre: "Horror",
        launch: "2025-02-26",
        multi: true,
        format: "pay"
    },
    {
        id: 5,
        name: "PUBG",
        genre: "Action",
        launch: "2017-12-20",
        multi: true,
        format: "free-to-play"
    }
];
function ensureDataFile() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(seedGames, null, 2), "utf-8");
    }
}
function loadGames() {
    try {
        ensureDataFile();
        const raw = fs.readFileSync(DATA_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
            return parsed;
        }
        return [...seedGames];
    }
    catch (_a) {
        return [...seedGames];
    }
}
export let Games = loadGames();
export function persistGames() {
    ensureDataFile();
    fs.writeFileSync(DATA_FILE, JSON.stringify(Games, null, 2), "utf-8");
}
//# sourceMappingURL=data.js.map
import { Games, persistGames } from "../data/data.js";
import { emptyToUndefined, parseFormat, parseGenre, parseLaunch, parseMulti, parseName } from "../validators/game.js";
let idCounter = Games.reduce((max, g) => Math.max(max, g.id), 0) + 1;
export function createGame(name, genre, launch, multi, format) {
    const safeName = name.trim();
    if (!safeName) {
        throw new Error("El nombre no puede estar vacio.");
    }
    const normalizedName = safeName.toLowerCase();
    const exists = Games.some((g) => g.name.trim().toLowerCase() === normalizedName);
    if (exists) {
        throw new Error(`El juego "${safeName}" ya existe.`);
    }
    const newGame = {
        id: idCounter++,
        name: safeName,
        genre,
        launch,
        multi,
        format
    };
    Games.push(newGame);
    persistGames();
    return newGame;
}
export function getGames() {
    return Games;
}
export function createGameFromInput(input) {
    const name = parseName(input.name);
    const genre = parseGenre(input.genre);
    const launch = parseLaunch(input.launch);
    const multi = parseMulti(input.multi);
    const format = parseFormat(input.format);
    return createGame(name, genre, launch, multi, format);
}
export function updateGame(id, updates) {
    var _a, _b, _c, _d, _e;
    const idx = Games.findIndex((g) => g.id === id);
    if (idx === -1) {
        throw new Error(`No existe un juego con id ${id}.`);
    }
    const current = Games[idx];
    if (updates.name !== undefined) {
        const normalizedName = updates.name.trim().toLowerCase();
        if (!normalizedName) {
            throw new Error("El nombre no puede estar vacio.");
        }
        const exists = Games.some((g) => g.id !== id &&
            g.name.trim().toLowerCase() === normalizedName);
        if (exists) {
            throw new Error(`El juego "${updates.name}" ya existe.`);
        }
    }
    const updated = {
        id: current.id,
        name: (_a = updates.name) !== null && _a !== void 0 ? _a : current.name,
        genre: (_b = updates.genre) !== null && _b !== void 0 ? _b : current.genre,
        launch: (_c = updates.launch) !== null && _c !== void 0 ? _c : current.launch,
        multi: (_d = updates.multi) !== null && _d !== void 0 ? _d : current.multi,
        format: (_e = updates.format) !== null && _e !== void 0 ? _e : current.format
    };
    Games[idx] = updated;
    persistGames();
    return updated;
}
export function updateGameFromInput(id, input) {
    const updates = {};
    const name = emptyToUndefined(input.name);
    if (name !== undefined) {
        updates.name = parseName(name);
    }
    const genre = emptyToUndefined(input.genre);
    if (genre !== undefined) {
        updates.genre = parseGenre(genre);
    }
    const launch = emptyToUndefined(input.launch);
    if (launch !== undefined) {
        updates.launch = parseLaunch(launch);
    }
    const multi = emptyToUndefined(input.multi);
    if (multi !== undefined) {
        updates.multi = parseMulti(multi);
    }
    const format = emptyToUndefined(input.format);
    if (format !== undefined) {
        updates.format = parseFormat(format);
    }
    return updateGame(id, updates);
}
export function deleteGame(id) {
    const idx = Games.findIndex((g) => g.id === id);
    if (idx === -1) {
        throw new Error(`No existe un juego con id ${id}.`);
    }
    const [removed] = Games.splice(idx, 1);
    persistGames();
    return removed;
}
//# sourceMappingURL=service.js.map
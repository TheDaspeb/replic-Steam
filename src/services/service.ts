// Este contendrá toda la lógica de negocio 
import type { Game } from "../models/interfaces.js";
import type { Format, Genre } from "../models/types.js";
import { Games, persistGames } from "../data/data.js";
import {
    emptyToUndefined,
    parseFormat,
    parseGenre,
    parseLaunch,
    parseMulti,
    parseName
} from "../validators/game.js";

let idCounter = Games.reduce((max, g) => Math.max(max, g.id), 0) + 1;

export function createGame(
    name: string,
    genre: Genre,
    launch: string,
    multi: boolean,
    format: Format
): Game {
    const safeName = name.trim();
    if (!safeName) {
        throw new Error("El nombre no puede estar vacio.");
    }
    const normalizedName = safeName.toLowerCase();
    const exists = Games.some(
        (g) => g.name.trim().toLowerCase() === normalizedName
    );
    if (exists) {
        throw new Error(`El juego "${safeName}" ya existe.`);
    }

    const newGame: Game = {
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

export function getGames(): Game[] {
    return Games;
}

export function createGameFromInput(input: {
    name: string;
    genre: string;
    launch: string;
    multi: string;
    format: string;
}): Game {
    const name = parseName(input.name);
    const genre = parseGenre(input.genre);
    const launch = parseLaunch(input.launch);
    const multi = parseMulti(input.multi);
    const format = parseFormat(input.format);
    return createGame(name, genre, launch, multi, format);
}

export function updateGame(
    id: number,
    updates: Partial<Omit<Game, "id">>
): Game {
    const idx = Games.findIndex((g) => g.id === id);
    if (idx === -1) {
        throw new Error(`No existe un juego con id ${id}.`);
    }

    const current = Games[idx]!;

    if (updates.name !== undefined) {
        const normalizedName = updates.name.trim().toLowerCase();
        if (!normalizedName) {
            throw new Error("El nombre no puede estar vacio.");
        }
        const exists = Games.some(
            (g) =>
                g.id !== id &&
                g.name.trim().toLowerCase() === normalizedName
        );
        if (exists) {
            throw new Error(`El juego "${updates.name}" ya existe.`);
        }
    }

    const updated: Game = {
        id: current.id,
        name: updates.name ?? current.name,
        genre: updates.genre ?? current.genre,
        launch: updates.launch ?? current.launch,
        multi: updates.multi ?? current.multi,
        format: updates.format ?? current.format
    };

    Games[idx] = updated;
    persistGames();
    return updated;
}

export function updateGameFromInput(
    id: number,
    input: {
        name?: string;
        genre?: string;
        launch?: string;
        multi?: string;
        format?: string;
    }
): Game {
    const updates: Partial<Omit<Game, "id">> = {};

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

export function deleteGame(id: number): Game {
    const idx = Games.findIndex((g) => g.id === id);
    if (idx === -1) {
        throw new Error(`No existe un juego con id ${id}.`);
    }
    const [removed] = Games.splice(idx, 1);
    persistGames();
    return removed!;
}

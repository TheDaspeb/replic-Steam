// Este contendrá toda la lógica de negocio 
import type { Game } from "../models/interfaces.js";
import type { Format, Genre } from "../models/types.js";
import { Games } from "../data/data.js";

let idCounter = Games.length + 1;

export function createGame(
    name: string,
    genre: Genre,
    launch: string,
    multi: boolean,
    format: Format
): Game {
    const normalizedName = name.trim().toLowerCase();
    const exists = Games.some(
        (g) => g.name.trim().toLowerCase() === normalizedName
    );
    if (exists) {
        throw new Error(`El juego "${name}" ya existe.`);
    }

    const newGame: Game = {
        id: idCounter++,
        name,
        genre,
        launch,
        multi,
        format
    };
    Games.push(newGame);
    return newGame;
}

export function getGames(): Game[] {
    return Games;
}

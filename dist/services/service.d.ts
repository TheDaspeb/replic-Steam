import type { Game } from "../models/interfaces.js";
import type { Format, Genre } from "../models/types.js";
export declare function createGame(name: string, genre: Genre, launch: string, multi: boolean, format: Format): Game;
export declare function getGames(): Game[];
export declare function createGameFromInput(input: {
    name: string;
    genre: string;
    launch: string;
    multi: string;
    format: string;
}): Game;
export declare function updateGame(id: number, updates: Partial<Omit<Game, "id">>): Game;
export declare function updateGameFromInput(id: number, input: {
    name?: string;
    genre?: string;
    launch?: string;
    multi?: string;
    format?: string;
}): Game;
export declare function deleteGame(id: number): Game;
//# sourceMappingURL=service.d.ts.map
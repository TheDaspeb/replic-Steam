import { Games } from "../data/data.js";
let idCounter = Games.length + 1;
export function createGame(name, genre, launch, multi, format) {
    const normalizedName = name.trim().toLowerCase();
    const exists = Games.some((g) => g.name.trim().toLowerCase() === normalizedName);
    if (exists) {
        throw new Error(`El juego "${name}" ya existe.`);
    }
    const newGame = {
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
export function getGames() {
    return Games;
}
//# sourceMappingURL=service.js.map
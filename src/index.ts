//  Punto de entrada de la aplicación  

import promptSync from "prompt-sync";
import { createGameFromInput, deleteGame, getGames, updateGameFromInput } from "./services/service.js";
import { FORMATS, GENRES } from "./validators/game.js";

const prompt = promptSync({ sigint: true });

function showMenu(): void {
    console.log("\n=== Menu ===");
    console.log("1. Crear juego");
    console.log("2. Ver juegos");
    console.log("3. Actualizar juego");
    console.log("4. Eliminar juego");
    console.log("5. Salir");
}

function askCreateGame(): void {
    const name = prompt("Nombre del juego: ").trim();
    const genreInput = prompt(
        `Genero (${GENRES.join("/")}): `
    ).trim();
    const launch = prompt("Fecha de lanzamiento (YYYY-MM-DD): ").trim();
    const multiInput = prompt("Es multijugador? (si/no): ").trim();
    const formatInput = prompt(`Formato (${FORMATS.join("/")}): `).trim();

    try {
        const game = createGameFromInput({
            name,
            genre: genreInput,
            launch,
            multi: multiInput,
            format: formatInput
        });
        console.log("Juego creado:", game);
    } catch (err) {
        console.log((err as Error).message);
    }
}

function listGames(): void {
    const games = getGames();
    if (games.length === 0) {
        console.log("No hay juegos registrados.");
        return;
    }
    console.table(games);
}

function askUpdateGame(): void {
    const idInput = prompt("ID del juego a actualizar: ").trim();
    const id = Number(idInput);
    if (!Number.isInteger(id) || id <= 0) {
        console.log("ID invalido.");
        return;
    }

    const name = prompt("Nuevo nombre (deja vacio para mantener): ").trim();
    const genreInput = prompt(
        `Nuevo genero (${GENRES.join("/")}, vacio=mantener): `
    ).trim();
    const launch = prompt(
        "Nueva fecha (YYYY-MM-DD, vacio=mantener): "
    ).trim();
    const multiRaw = prompt("Multijugador? (si/no, vacio=mantener): ").trim();
    const formatInput = prompt(
        `Nuevo formato (${FORMATS.join("/")}, vacio=mantener): `
    ).trim();

    try {
        const updated = updateGameFromInput(id, {
            name,
            genre: genreInput,
            launch,
            multi: multiRaw,
            format: formatInput
        });
        console.log("Juego actualizado:", updated);
    } catch (err) {
        console.log((err as Error).message);
    }
}

function askDeleteGame(): void {
    const idInput = prompt("ID del juego a eliminar: ").trim();
    const id = Number(idInput);
    if (!Number.isInteger(id) || id <= 0) {
        console.log("ID invalido.");
        return;
    }

    try {
        const removed = deleteGame(id);
        console.log("Juego eliminado:", removed);
    } catch (err) {
        console.log((err as Error).message);
    }
}

let running = true;
while (running) {
    showMenu();
    const option = prompt("Elige una opcion: ").trim();

    switch (option) {
        case "1":
            askCreateGame();
            break;
        case "2":
            listGames();
            break;
        case "3":
            askUpdateGame();
            break;
        case "4":
            askDeleteGame();
            break;
        case "5":
            running = false;
            console.log("Hasta luego.");
            break;
        default:
            console.log("Opcion invalida.");
    }
}

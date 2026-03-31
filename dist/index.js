//  Punto de entrada de la aplicación  
import promptSync from "prompt-sync";
import { createGame, getGames } from "./services/service.js";
const prompt = promptSync({ sigint: true });
const genres = ["Action", "Shooter", "Coop", "Adventure", "Horror"];
const formats = ["free-to-play", "pay"];
function showMenu() {
    console.log("\n=== Menu ===");
    console.log("1. Crear juego");
    console.log("2. Ver juegos");
    console.log("3. Salir");
}
function askCreateGame() {
    const name = prompt("Nombre del juego: ").trim();
    const genreInput = prompt("Genero (Action/Shooter/Coop/Adventure/Horror): ").trim();
    const launch = prompt("Fecha de lanzamiento (YYYY-MM-DD): ").trim();
    const multiInput = prompt("Es multijugador? (si/no): ")
        .trim()
        .toLowerCase();
    const formatInput = prompt("Formato (free-to-play/pay): ").trim();
    if (!genres.includes(genreInput)) {
        console.log("Genero invalido. Usa uno de:", genres.join(", "));
        return;
    }
    if (!formats.includes(formatInput)) {
        console.log("Formato invalido. Usa uno de:", formats.join(", "));
        return;
    }
    const multi = ["si", "sí", "s", "true", "1", "y", "yes"].includes(multiInput);
    try {
        const game = createGame(name, genreInput, launch, multi, formatInput);
        console.log("Juego creado:", game);
    }
    catch (err) {
        console.log(err.message);
    }
}
function listGames() {
    const games = getGames();
    if (games.length === 0) {
        console.log("No hay juegos registrados.");
        return;
    }
    console.table(games);
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
            running = false;
            console.log("Hasta luego.");
            break;
        default:
            console.log("Opcion invalida.");
    }
}
//# sourceMappingURL=index.js.map
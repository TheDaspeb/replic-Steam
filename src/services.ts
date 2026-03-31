import { games } from "./data";
import { juego } from "./models";
import { rl } from "./interactions";


export const getAllGames = (): juego[] =>{
    return [...games]
}
export const AddGame = (nuevoJuego: juego): void => {
    const existe = games.some(p => p.id === nuevoJuego.id);

    if (existe) {
        console.log("\n=====================================");
        console.log("Este juego ya se encuentra registrado");
        console.log("=====================================\n");
        return;
    }
    games.push(nuevoJuego);
    console.log("\n============================");
    console.log("Se ha agregado coorectamente");
    console.log("============================\n");
}

export const deleteGame = async (id: number): Promise<void> => {
    const index = games.findIndex(juego => juego.id === id);
    if (index !== -1) {
        console.log("\n============================");
        console.log("JUEGO A ELIMINAR:");
        console.log("============================");
        console.table([games[index]]);
        const option: string = await rl.question("¿Estás seguro de eliminar este juego? (si/no): ");
        if (option.toLowerCase() === "si") {
            games.splice(index, 1);
            console.log(`\n============================`);
            console.log(`Juego con id ${id} eliminado`);
            console.log(`============================\n`);
        } else {
            console.log("\n=======================");
            console.log("Eliminación cancelada");
            console.log("=======================\n");
        }
    } else {
        console.log("\n===================");
        console.log("Juego no encontrado");
        console.log("===================\n");
    }
}
import { games } from "../../infrastructure/repositories/data";
import { Game } from "../../domain/entities/models";
import { rl } from "../../infrastructure/ui/interactions";
import { Categoria } from "../../domain/entities/models";
import { Costo } from "../../domain/entities/models";
import { promises } from "node:dns";

export const getAllGames = (): Game[] =>{
    return [...games]
}
export const AddGame = (nuevoJuego: Game): void => {
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

export const infoGame = async (): Promise<Game> => {
     const nuevoJuego: Game = {
          id: Number(await rl.question("ID del juego: ")),
          nombre: await rl.question("Nombre del juego: "),
          categoria: await rl.question("Categoría (Accion/terror/shooter/carreras/coop/aventura/lucha/puzles): ") as Categoria,
          costo: await rl.question("Costo (pago/freetoplay): ") as Costo,
          lanzamiento: await rl.question("Fecha de lanzamiento (YYYY-MM-DD): "),
          descripcion: await rl.question("Descripción (opcional, presiona Enter para saltar): ") || undefined,
          multijugador: (await rl.question("¿Multijugador? (si/no): ")).toLowerCase() === "si",
          restriccion: Number(await rl.question("Restricción de edad: "))
        };
        return nuevoJuego
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

export const updateGame = async (id:number) : Promise<void> => {
    const index = games.findIndex(juego => juego.id === id)
    if(index !== -1){
        const updateInfo = await infoGame()
        games[index] = {
            ...updateInfo,id
        }
            console.log(`\n============================`);
            console.log(`Juego con id ${id} actualizado`);
            console.log(`============================\n`);
    } else{
        console.log("Juego no encontrado")
    }
}
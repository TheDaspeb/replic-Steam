import { rl } from "../../infrastructure/ui/interactions";
import { getAllGames, deleteGame, AddGame,infoGame, updateGame } from "../../application/use-cases/services";

export async function menu() {
  let opcion = "";

  do {
    console.log("\n--- MENÚ ---");
    console.log("1. Ver juegos");
    console.log("2. Agregar juego");
    console.log("3. Eliminar juego");
    console.log("4. Actualizar juego");
    console.log("5. Salir");

    opcion = await rl.question("Elige una opción: ");

    switch (opcion) {
      case "1":
        console.table(getAllGames());
        break;
      case "2":
        console.log("\n======= AGREGAR NUEVO JUEGO =======\n");
        const info = await infoGame()
        await AddGame(info);
        break;
      case "3":
        console.log("\n======= ELIMINAR JUEGO =======\n");
        const idDelete = Number(await rl.question("ID del juego a eliminar: "));
        await deleteGame(idDelete);
        break;
      case "4":
        console.log("\n======= ELIMINAR JUEGO =======\n");
        const idUpdate = Number(await rl.question("ID del juego a actualizar"))
        await updateGame(idUpdate)
    }

  } while (opcion !== "5");

  rl.close();
}
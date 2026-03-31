import { rl } from "./interactions";
import { getAllGames, deleteGame, AddGame} from "./services";
import { juego, Categoria, Costo } from "./models";

export async function menu() {
  let opcion = "";

  do {
    console.log("\n--- MENÚ ---");
    console.log("1. Ver juegos");
    console.log("2. Agregar juego");
    console.log("3. Eliminar juego");
    console.log("4. Salir");

    opcion = await rl.question("Elige una opción: ");

    switch (opcion) {
      case "1":
        console.table(getAllGames());
        break;
      case "2":
        console.log("\n======= AGREGAR NUEVO JUEGO =======\n");
        const nuevoJuego: juego = {
          id: Number(await rl.question("ID del juego: ")),
          nombre: await rl.question("Nombre del juego: "),
          categoria: await rl.question("Categoría (Accion/terror/shooter/carreras/coop/aventura/lucha/puzles): ") as Categoria,
          costo: await rl.question("Costo (pago/freetoplay): ") as Costo,
          lanzamiento: await rl.question("Fecha de lanzamiento (YYYY-MM-DD): "),
          descripcion: await rl.question("Descripción (opcional, presiona Enter para saltar): ") || undefined,
          multijugador: (await rl.question("¿Multijugador? (si/no): ")).toLowerCase() === "si",
          restriccion: Number(await rl.question("Restricción de edad: "))
        };
        AddGame(nuevoJuego);
        break;
      case "3":
        console.log("\n======= ELIMINAR JUEGO =======\n");
        const idEliminar = Number(await rl.question("ID del juego a eliminar: "));
        await deleteGame(idEliminar);
        break;
    }

  } while (opcion !== "4");

  rl.close();
}
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menu = menu;
const interactions_1 = require("../infrastructure/ui/interactions");
const services_1 = require("../application/use-cases/services");
function menu() {
    return __awaiter(this, void 0, void 0, function* () {
        let opcion = "";
        do {
            console.log("\n--- MENÚ ---");
            console.log("1. Ver juegos");
            console.log("2. Agregar juego");
            console.log("3. Eliminar juego");
            console.log("4. Salir");
            opcion = yield interactions_1.rl.question("Elige una opción: ");
            switch (opcion) {
                case "1":
                    console.table((0, services_1.getAllGames)());
                    break;
                case "2":
                    console.log("\n======= AGREGAR NUEVO JUEGO =======\n");
                    const nuevoJuego = {
                        id: Number(yield interactions_1.rl.question("ID del juego: ")),
                        nombre: yield interactions_1.rl.question("Nombre del juego: "),
                        categoria: yield interactions_1.rl.question("Categoría (Accion/terror/shooter/carreras/coop/aventura/lucha/puzles): "),
                        costo: yield interactions_1.rl.question("Costo (pago/freetoplay): "),
                        lanzamiento: yield interactions_1.rl.question("Fecha de lanzamiento (YYYY-MM-DD): "),
                        descripcion: (yield interactions_1.rl.question("Descripción (opcional, presiona Enter para saltar): ")) || undefined,
                        multijugador: (yield interactions_1.rl.question("¿Multijugador? (si/no): ")).toLowerCase() === "si",
                        restriccion: Number(yield interactions_1.rl.question("Restricción de edad: "))
                    };
                    (0, services_1.AddGame)(nuevoJuego);
                    break;
                case "3":
                    console.log("\n======= ELIMINAR JUEGO =======\n");
                    const idEliminar = Number(yield interactions_1.rl.question("ID del juego a eliminar: "));
                    yield (0, services_1.deleteGame)(idEliminar);
                    break;
            }
        } while (opcion !== "4");
        interactions_1.rl.close();
    });
}

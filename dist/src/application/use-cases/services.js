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
exports.deleteGame = exports.AddGame = exports.getAllGames = void 0;
const data_1 = require("../infrastructure/repositories/data");
const interactions_1 = require("../infrastructure/ui/interactions");
const getAllGames = () => {
    return [...data_1.games];
};
exports.getAllGames = getAllGames;
const AddGame = (nuevoJuego) => {
    const existe = data_1.games.some(p => p.id === nuevoJuego.id);
    if (existe) {
        console.log("\n=====================================");
        console.log("Este juego ya se encuentra registrado");
        console.log("=====================================\n");
        return;
    }
    data_1.games.push(nuevoJuego);
    console.log("\n============================");
    console.log("Se ha agregado coorectamente");
    console.log("============================\n");
};
exports.AddGame = AddGame;
const deleteGame = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const index = data_1.games.findIndex(juego => juego.id === id);
    if (index !== -1) {
        console.log("\n============================");
        console.log("JUEGO A ELIMINAR:");
        console.log("============================");
        console.table([data_1.games[index]]);
        const option = yield interactions_1.rl.question("¿Estás seguro de eliminar este juego? (si/no): ");
        if (option.toLowerCase() === "si") {
            data_1.games.splice(index, 1);
            console.log(`\n============================`);
            console.log(`Juego con id ${id} eliminado`);
            console.log(`============================\n`);
        }
        else {
            console.log("\n=======================");
            console.log("Eliminación cancelada");
            console.log("=======================\n");
        }
    }
    else {
        console.log("\n===================");
        console.log("Juego no encontrado");
        console.log("===================\n");
    }
});
exports.deleteGame = deleteGame;

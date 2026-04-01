"use strict";
var Juegos;
(function (Juegos) {
    // 🔹 Datos (mock)
    const games = [];
    // 🔹 Función para agregar juego
    function addGame(game) {
        games.push(game);
        console.log("Juego agregado:", game.nombre);
    }
    Juegos.addGame = addGame;
    // 🔹 Función para mostrar juegos
    function showGames() {
        console.log("Lista de juegos:");
        console.table(games);
    }
    Juegos.showGames = showGames;
})(Juegos || (Juegos = {}));
Juegos.addGame({ id: 1, nombre: "Call of Duty" });
Juegos.addGame({ id: 2, nombre: "FIFA 24" });
Juegos.showGames();

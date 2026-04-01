namespace Juegos {
  export interface Game {
    id: number;
    nombre: string;
  }

  const games: Game[] = [];

  export function addGame(game: Game): void {
    games.push(game);
    console.log("Juegos -> agregado:", game.nombre);
  }

  export function showGames(): void {
    console.log("Juegos:");
    console.table(games);
  }
}

namespace Juegos2 {
  export interface Game {
    id: number;
    nombre: string;
  }

  const games: Game[] = [];

  export function addGame(game: Game): void {
    games.push(game);
    console.log("Juegos2 -> agregado:", game.nombre);
  }

  export function showGames(): void {
    console.log("Juegos2:");
    console.table(games);
  }
}

Juegos.addGame({ id: 1, nombre: "Call of Duty" });
Juegos2.addGame({ id: 2, nombre: "FIFA 24" });

Juegos.showGames();
Juegos2.showGames();




function avisoClase(target: Function) {
    console.log("¡Se creó una nueva clase!");
}

@avisoClase
class Persona {
    constructor(public nombre: string) {}
}


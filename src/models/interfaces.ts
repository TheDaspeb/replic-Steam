//Creacion de modelo a seguir 
import type { Format, Genre } from "./types.js";

export interface Game {
    id: number, 
    name:string,
    genre: Genre,
    launch: string,
    multi: boolean
    format: Format
}
export type Categoria = "Accion" | "terror" | "shooter" | "carreras" | "coop" | "aventura" | "lucha" | "puzles"
export type Costo = "pago" | "freetoplay"

export interface Game {
    id: number
    nombre: string
    categoria: Categoria
    costo: Costo
    lanzamiento: string
    descripcion?: string
    multijugador: boolean
    restriccion: number
}
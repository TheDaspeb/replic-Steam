import type { Format, Genre } from "../models/types.js";

export const GENRES = ["Action", "Shooter", "Coop", "Adventure", "Horror"] as const;
export const FORMATS = ["free-to-play", "pay"] as const;

function matchOption<T extends readonly string[]>(
    options: T,
    input: string
): T[number] | undefined {
    const normalized = input.trim().toLowerCase();
    if (!normalized) {
        return undefined;
    }
    return options.find((o) => o.toLowerCase() === normalized);
}

export function parseName(input: string): string {
    const name = input.trim();
    if (!name) {
        throw new Error("El nombre no puede estar vacio.");
    }
    return name;
}

export function parseGenre(input: string): Genre {
    const match = matchOption(GENRES, input);
    if (!match) {
        throw new Error(`Genero invalido. Usa uno de: ${GENRES.join(", ")}`);
    }
    return match as Genre;
}

export function parseFormat(input: string): Format {
    const match = matchOption(FORMATS, input);
    if (!match) {
        throw new Error(`Formato invalido. Usa uno de: ${FORMATS.join(", ")}`);
    }
    return match as Format;
}

export function parseLaunch(input: string): string {
    const value = input.trim();
    if (!value) {
        throw new Error("La fecha de lanzamiento es obligatoria.");
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        throw new Error("Fecha invalida. Usa el formato YYYY-MM-DD.");
    }
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) {
        throw new Error("Fecha invalida.");
    }
    const [y, m, d] = value.split("-").map(Number);
    if (
        date.getUTCFullYear() !== y ||
        date.getUTCMonth() + 1 !== m ||
        date.getUTCDate() !== d
    ) {
        throw new Error("Fecha invalida.");
    }
    return value;
}

export function parseMulti(input: string): boolean {
    const raw = input.trim().toLowerCase();
    if (["si", "sí", "s", "true", "1", "y", "yes"].includes(raw)) {
        return true;
    }
    if (["no", "n", "false", "0"].includes(raw)) {
        return false;
    }
    throw new Error("Valor invalido para multijugador (si/no).");
}

export function emptyToUndefined(input: string | undefined): string | undefined {
    if (input === undefined) {
        return undefined;
    }
    const trimmed = input.trim();
    return trimmed ? trimmed : undefined;
}

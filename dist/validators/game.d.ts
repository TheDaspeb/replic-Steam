import type { Format, Genre } from "../models/types.js";
export declare const GENRES: readonly ["Action", "Shooter", "Coop", "Adventure", "Horror"];
export declare const FORMATS: readonly ["free-to-play", "pay"];
export declare function parseName(input: string): string;
export declare function parseGenre(input: string): Genre;
export declare function parseFormat(input: string): Format;
export declare function parseLaunch(input: string): string;
export declare function parseMulti(input: string): boolean;
export declare function emptyToUndefined(input: string | undefined): string | undefined;
//# sourceMappingURL=game.d.ts.map
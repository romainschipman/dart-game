/**
 * Checks if the given dart notation represents a bullseye.
 * A bullseye can be:
 * - "B" for a Single Bullseye
 * - "DB" for a Double Bullseye
 *
 * @param dartNotation - The dart notation to check.
 * @returns `true` if the notation is "B" or "DB", otherwise `false`.
 *
 * @example
 * ```ts
 * isBullseye("B"); // true
 * isBullseye("DB"); // true
 * isBullseye("T20"); // false
 * ```
 */
const isBullseye = (dartNotation: string): boolean => (
    dartNotation === "B" || dartNotation === "DB"
);

export { isBullseye };
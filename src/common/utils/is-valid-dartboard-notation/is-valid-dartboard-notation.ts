import { DARTBOARD_REGEX } from "../../regex";

/**
 * Validates if a string matches the dartboard notation.
 * Supported notations include:
 * - Numbers (e.g., "19")
 * - "DB" for Double Bullseye
 * - "B" for Single Bullseye
 * - Notations starting with "T" (Triple) or "D" (Double) followed by digits (e.g., "T20", "D10").
 *
 * @param input - The string to validate.
 * @returns `true` if the string matches the valid dartboard notation, otherwise `false`.
 *
 * @example
 * ```ts
 * console.log(isValidDartboardNotation("T20")) // true
 * console.log(isValidDartboardNotation("D10")) // true
 * console.log(isValidDartboardNotation("19"))  // true
 * console.log(isValidDartboardNotation("DB"))  // true
 * console.log(isValidDartboardNotation("XYZ")) // false
 * ```
 */
const isValidDartboardNotation = (input: string): boolean => {
    if (!isNaN(parseInt(input)) || input === "DB" || input === "B") {
        return true;
    }
    return DARTBOARD_REGEX.test(input);
};

export { isValidDartboardNotation };
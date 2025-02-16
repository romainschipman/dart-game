import { DARTBOARD_REGEX } from "../../../regex";
import { isBullseye, isDartScoreValid } from "../../validations";

/**
 * Validates if a string matches the dartboard notation.
 * Supported notations include:
 * - Numbers (e.g., "19")
 * - "DB" for Double Bullseye
 * - "B" for Single Bullseye
 * - Notations starting with "T" (Triple) or "D" (Double) followed by digits (e.g., "T20", "D10").
 *
 * @param dartboardNotation - The string to validate.
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
const isValidDartboardNotation = (dartboardNotation: string): boolean => {
    const dartboardNotationNumber = parseInt(dartboardNotation);
    if (!isNaN(dartboardNotationNumber)) {
        return isDartScoreValid(dartboardNotationNumber);
    }
    if (isBullseye(dartboardNotation)) {
        return true;
    }
    const multiplierMatch = dartboardNotation.match(DARTBOARD_REGEX);

    if (multiplierMatch) {
        const value = parseInt(multiplierMatch[2]);
        return (!isNaN(value) && isDartScoreValid(value, false));
    }
    return false;
};

export { isValidDartboardNotation };
import { DARTBOARD_REGEX } from "../../../regex";
import { isDartScoreValid } from "../../validations";

/**
 * Maps special dartboard notations to their corresponding points.
 */
const SPECIAL_SCORES: Record<string, number> = {
    DB: 50,
    B: 25,
};

/**
 * Parses a dartboard score notation and calculates its numeric points.
 * @param scoreNotation - The dartboard notation string (e.g., "DB", "T20", "D10", "B").
 * @returns The calculated points based on the notation.
 * @throws An error if the notation is invalid or unsupported.
 */
const calculateDartPoints = (scoreNotation: string): number => {
    if (SPECIAL_SCORES[scoreNotation]) {
        return SPECIAL_SCORES[scoreNotation];
    }

    const value = parseInt(scoreNotation);

    if (!isNaN(value) && !isDartScoreValid(value)) {
        throw new Error(`Invalid dartboard value: ${scoreNotation}`);
    } else if(!isNaN(value)) {
        return value;
    }

    const multiplierMatch = scoreNotation.match(DARTBOARD_REGEX);
    if (multiplierMatch) {
        const [_, multiplier, valueStr] = multiplierMatch;
        const value = parseInt(valueStr);

        if (!isDartScoreValid(value)) {
            throw new Error(`Invalid dartboard value: ${scoreNotation}`);
        }

        return multiplier === "T" ? value * 3 : value * 2;
    }

    throw new Error(`Unsupported dartboard notation: ${scoreNotation}`);
};

export { calculateDartPoints };

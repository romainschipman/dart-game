import { parseFormattedScore } from "../../../common/utils";
import { updatePlayerScoreAndResetHunted } from "../update-player-score-and-reset-hunted/update-player-score-and-reset-hunted";

/**
 * Calculates the total score for each player in the Hunter 301 game mode.
 *
 * @param {string[]} scores - An array of formatted score strings (e.g., `["R1-P1-D1-T20"]`).
 * @returns {Record<string, number>} An object where keys are player identifiers (`p1`, `p2`, etc.) and values are their total scores.
 *
 * @example
 * ```ts
 * const scores = ["R1-P1-D1-T20", "R2-P2-S5", "R3-P1-D10"];
 * const result = calculateHunterScores(scores);
 * console.log(result); // { p1: 70, p2: 5 }
 * ```
 */
const calculateHunterScores = (scores: string[]): Record<string, number> => {
    if (Array.isArray(scores) && scores.length === 0) return {};

    const parsedScores = scores
        .map(parseFormattedScore)
        .filter((entry) => entry !== null);

    return parsedScores.reduce<Record<string, number>>(updatePlayerScoreAndResetHunted, {});
};

export { calculateHunterScores };

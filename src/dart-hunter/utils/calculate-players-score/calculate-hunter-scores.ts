import { parseFormattedScore } from "../../../common/utils";
import { updatePlayerScoreAndResetHunted } from "../update-player-score-and-reset-hunted/update-player-score-and-reset-hunted";

/**
 * Computes the cumulative scores for each player in the Hunter 301 game mode.
 *
 * @param {string[]} scores - An array of formatted score strings (e.g., `["R1-P1-D1-T20"]`).
 * @param {number} targetScore - The target score to reach (e.g., 301) before applying the Hunter 301 rule.
 * @returns An object mapping player identifiers (e.g., "p1", "p2") to their cumulative scores.
 *
 * @example
 * ```ts
 * const scores = ["R1-P1-D1-T20", "R2-P2-S5", "R3-P1-D10"];
 * const result = calculateHunterScores(scores, 301);
 * console.log(result); // { p1: 70, p2: 5 }
 * ```
 */
const calculateHunterScores = (scores: string[], targetScore: number): Record<string, number> => {
    if (Array.isArray(scores) && scores.length === 0) return {};

    const parsedScores = scores
        .map(parseFormattedScore)
        .filter((entry) => entry !== null);

    return parsedScores.reduce<Record<string, number>>((previousValue, currentValue) => (
        updatePlayerScoreAndResetHunted(previousValue, currentValue, targetScore)
    ), {});
};

export { calculateHunterScores };

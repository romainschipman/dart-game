import { calculateDartPoints, getMaxNumbers, parseFormattedScore } from "../../../common/utils";

/**
 * Calculates the total score for each player in the Hunter 301 game mode.
 *
 * @param scores - An array of formatted score strings (e.g., `["R1-P1-D1-T20"]`).
 * @returns An object where keys are player identifiers (`p1`, `p2`, etc.) and values are their total scores.
 *
 * @example
 * ```ts
 * const scores = ["R1-P1-D1-T20", "R1-P2-D1-D10", "R1-P1-D2-D5"];
 * const results = calculateHunterScores(scores);
 * console.log(results); // { p1: 25, p2: 20 }
 * ```
 */
const calculateHunterScores = (scores: string[]): Record<string, number> => {
    if (scores.length === 0) return {};

    const parsedScores = scores.map(parseFormattedScore);
    const totalPlayers = getMaxNumbers(parsedScores, (score) => score.player);

    const playersScores: Record<string, number> = {};

    Array.from({ length: totalPlayers }, (_, playerIndex) => {
        const playerScores = parsedScores.filter(score => score.player === playerIndex + 1);

        playersScores[`p${playerIndex + 1}`] = playerScores.reduce((total, { score }) => {
            return total + calculateDartPoints(score);
        }, 0);
    });

    return playersScores;
};

export { calculateHunterScores };

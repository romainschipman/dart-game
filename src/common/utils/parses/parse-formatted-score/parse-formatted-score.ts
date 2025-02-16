import { FORMAT_SCORE_REGEX } from "../../../regex";

/**
 * Parses a formatted score string into an object containing its components.
 *
 * The formatted score must follow the pattern defined by `FORMAT_SCORE_REGEX`:
 * - `R{round}-P{player}-D{dart}-{score}`
 *   - `R{round}`: The round number, prefixed with "R".
 *   - `P{player}`: The player number, prefixed with "P".
 *   - `D{dart}`: The dart number, prefixed with "D".
 *   - `{score}`: The score, which can be alphanumeric (e.g., "T20", "D10", "25").
 *
 * @param formattedScore - The formatted score string to parse (e.g., "R1-P1-D1-T20").
 * @returns An object containing the parsed components:
 * - `round` (number): The round number.
 * - `player` (number): The player number.
 * - `dart` (number): The dart number.
 * - `score` (string): The dartboard score (e.g., "T20", "D10").
 *
 * @throws {Error} If the `formattedScore` does not match the expected format.
 *
 * @example
 * ```ts
 * const result = parseFormattedScore("R1-P1-D1-T20");
 * console.log(result);
 * // Output:
 * // {
 * //   round: 1,
 * //   player: 1,
 * //   dart: 1,
 * //   score: "T20"
 * // }
 * ```
 */
const parseFormattedScore = (formattedScore: string) => {
    const scoreMatch = formattedScore.match(FORMAT_SCORE_REGEX);
    if (scoreMatch) {
        const round = parseInt(scoreMatch[1].replace("R", ""), 10);
        const player = parseInt(scoreMatch[2].replace("P", ""), 10);
        const dart = parseInt(scoreMatch[3].replace("D", ""), 10);
        const score = scoreMatch[4];

        return { round, player, dart, score };
    }
    throw new Error(`Invalid formatted score: ${formattedScore}`);
};

export { parseFormattedScore };
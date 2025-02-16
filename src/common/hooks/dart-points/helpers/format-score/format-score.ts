/**
 * Formats the score into a standardized string representation.
 *
 * The format follows the pattern: `R{round}-P{player}-D{dart}-{points}`,
 * where:
 * - `R{round}` represents the current round number.
 * - `P{player}` represents the current player number.
 * - `D{dart}` represents the current dart number.
 * - `{points}` represents the points scored.
 *
 * @param round - The current round number (e.g., 1, 2, 3).
 * @param player - The current player number (e.g., 1, 2, 3).
 * @param dart - The current dart number within the turn (e.g., 1, 2, 3).
 * @param points - The points scored for this dart (e.g., "T20", "D10", "B").
 * @returns A formatted string in the pattern `R{round}-P{player}-D{dart}-{points}`.
 *
 * @example
 * ```ts
 * const score = formatScore(2, 1, 3, "T20");
 * console.log(score); // Output: "R2-P1-D3-T20"
 * ```
 */
const formatScore = (round: number, player: number, dart: number, points: string): string => {
    return `R${round}-P${player}-D${dart}-${points}`;
};

export { formatScore };

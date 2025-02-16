/**
 * Regex to validate the format of a dart score string.
 *
 * The format ensures the string matches the following pattern:
 * - `R{round}-P{player}-D{dart}-{points}`
 *   - `R{round}`: The current round number, prefixed with "R", followed by one or more digits.
 *   - `-P{player}`: The player number, prefixed with "P", followed by one or more digits.
 *   - `-D{dart}`: The dart number within the turn, prefixed with "D", followed by one or more digits.
 *   - `-{points}`: The points scored, which can be alphanumeric (e.g., "T20", "D10", "B", or a number like "25").
 *
 * @example
 * // Valid examples:
 * ```ts
 * FORMAT_SCORE_REGEX.test("R10-P4-D1-25"); // true
 * FORMAT_SCORE_REGEX.test("R1-P1-D3-T20"); // true
 * FORMAT_SCORE_REGEX.test("R5-P2-D2-D10"); // true
 * ```
 *
 * @example
 * // Invalid examples:
 * ```ts
 * FORMAT_SCORE_REGEX.test("R10P4D125");    // false (missing separators `-`)
 * FORMAT_SCORE_REGEX.test("R10-P4-D1");    // false (missing points)
 * FORMAT_SCORE_REGEX.test("X10-P4-D1-25"); // false (incorrect prefix)
 * FORMAT_SCORE_REGEX.test("R-P1-D1-25");   // false (missing round number)
 * ```ts
 */
const FORMAT_SCORE_REGEX = /^(R\d+)-(P\d+)-(D\d+)-([A-Za-z0-9]+)$/;

export { FORMAT_SCORE_REGEX };
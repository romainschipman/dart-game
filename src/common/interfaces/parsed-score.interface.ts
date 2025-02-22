/**
 * Represents the parsed components of a formatted dart score.
 */
export interface ParsedScore {
    /**
     * The round number in which the dart was thrown.
     *
     * Example: `1` for the first round.
     */
    round: number;

    /**
     * The player number who threw the dart.
     *
     * Example: `1` for player "p1".
     */
    player: number;

    /**
     * The dart number within the round.
     *
     * Indicates which dart was thrown (first, second, or third).
     * Example: `1` for the first dart.
     */
    dart: number;

    /**
     * The score associated with the dart throw.
     *
     * This can be a standard dartboard value or a modifier:
     * - `"T20"` (Triple 20)
     * - `"D10"` (Double 10)
     * - `"25"` (Outer Bull)
     * - `"50"` (Bullseye)
     */
    score: string;
}

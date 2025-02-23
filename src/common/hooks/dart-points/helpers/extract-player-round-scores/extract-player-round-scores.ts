import { parseFormattedScore } from "../../../../utils";

interface ExtractPlayerRoundScoresParams {
    /**
     * List of all recorded scores in the format `R{round}-P{player}-D{dart}-{points}`.
     */
    scoreHistory: string[];
    /**
     * The total number of players in the game.
     */
    playersCount: number;
    /**
     * The current round number.
     */
    currentRound: number;
}

/**
 * Extracts the latest scores for each player from the score history,
 * prioritizing the current round if available, otherwise using the previous round.
 *
 * @param params.scoreHistory - List of all recorded scores in the format `R{round}-P{player}-D{dart}-{points}`.
 * @param params.playersCount - The total number of players in the game.
 * @param params.currentRound - The current round number.
 * @returns An object mapping player identifiers (`p1`, `p2`, etc.) to their list of scores.
 *
 * @example
 * ```ts
 * const scores = ["R1-P1-D1-T20", "R1-P2-D2-D10", "R2-P1-D1-S5"];
 * const result = extractPlayerRoundScores(scores, 2, 2);
 * console.log(result);
 * // Output: { p1: ["S5"], p2: ["D10"] } (Round 2 for p1, Round 1 for p2)
 * ```
 */
const extractPlayerRoundScores = (params: ExtractPlayerRoundScoresParams) => {
    const { scoreHistory, playersCount, currentRound } = params;
    return Object.fromEntries(
        Array.from({ length: playersCount }, (_, playerIndex) => {
            const playerId = `p${playerIndex + 1}`;
            const playerHistory = scoreHistory.filter(entry => entry.includes(`P${playerIndex + 1}`));

            if (playerHistory.length === 0) {
                return [playerId, []];
            }

            const hasCurrentRoundScore = playerHistory.some(entry => entry.includes(`R${currentRound}`));
            const targetRound = `R${hasCurrentRoundScore ? currentRound : currentRound - 1}`;

            const roundScores = playerHistory
                .filter(entry => entry.includes(targetRound))
                .map(entry => parseFormattedScore(entry)?.score ?? "0");

            return [playerId, roundScores];
        })
    );
};

export { extractPlayerRoundScores };
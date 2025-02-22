
interface IsHuntedPlayerCandidateParams {
    player: string;
    score: number;
    lastPlayerPlayed: string;
    lastPlayerScore: number;
    playersScores: Record<string, number>
}

/**
 * Determines if a player is a candidate to be "hunted" in the Hunter 301 game mode.
 *
 * A player is considered a candidate if:
 * - They are not the last player who played.
 * - They have the same score as the last player who played.
 * - Their score is not zero.
 *
 * @param {IsHuntedPlayerCandidateParams} params - The parameters required to evaluate if a player is hunted.
 * @param {string} params.player - The identifier of the player being evaluated.
 * @param {number} params.score - The score of the player being evaluated.
 * @param {string} params.lastPlayerPlayed - The identifier of the last player who played.
 * @param {number} params.lastPlayerScore - The score of the last player who played.
 * @param {Record<string, number>} params.playersScores - An object mapping player identifiers to their scores.
 * @returns {boolean} `true` if the player is a candidate to be hunted, otherwise `false`.
 *
 * @example
 * ```ts
 * const playersScores = { p1: 50, p2: 50, p3: 30 };
 *
 * const result = isHuntedPlayerCandidate({
 *     player: "p2",
 *     score: 50,
 *     lastPlayerPlayed: "p1",
 *     lastPlayerScore: 50,
 *     playersScores
 * });
 * console.log(result); // true (p2 has the same score as p1 and is not p1)
 * ```
 *
 * @example
 * ```ts
 * const playersScores = { p1: 50, p2: 50, p3: 30 };
 *
 * const result = isHuntedPlayerCandidate({
 *     player: "p3",
 *     score: 30,
 *     lastPlayerPlayed: "p1",
 *     lastPlayerScore: 50,
 *     playersScores
 * });
 * console.log(result); // false (p3 has a different score from p1)
 * ```
 */
const isHuntedPlayerCandidate = (params: IsHuntedPlayerCandidateParams): boolean => {
    const { player, score, lastPlayerPlayed, lastPlayerScore } = params;

    const isDifferentPlayer = player !== lastPlayerPlayed;
    const hasSameScore = score === lastPlayerScore;
    const hasNonZeroScore = score !== 0;

    return isDifferentPlayer && hasSameScore && hasNonZeroScore;
};

export { isHuntedPlayerCandidate };
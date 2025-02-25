import { useMemo } from "react";
import { useDartPoints, UseDartPointsProps, UseDartPointsReturn } from "../../../common/hooks";
import { calculateHunterScores } from "../../utils";

interface UseDartHunterPointsProps extends UseDartPointsProps {
    /** The target score to reach (e.g., 301) before applying the Hunter 301 rule */
    targetScore: number;
}

interface UseDartHunterPointsReturn extends UseDartPointsReturn {
    /** An object mapping player identifiers (e.g., "p1", "p2") to their cumulative scores according to the Hunter 301 rules */
    scoreTotal: Record<string, number>;
}

/**
 * Custom hook that computes and manages the scores for the Hunter 301 game mode.
 *
 * This hook extends the base dart scoring functionality provided by `useDartPoints` by calculating
 * cumulative scores according to the Hunter 301 rules. It returns all the functions and state from
 * `useDartPoints` along with a computed `scoreTotal`.
 *
 * @param {UseDartHunterPointsProps} props - The properties required for dart points calculation, including:
 *   - `playersCount`: Total number of players.
 *   - `roundsCount`: Total number of rounds.
 *   - `targetScore`: The target score to reach (e.g., 301) before applying the Hunter 301 rule.
 * @returns {UseDartHunterPointsReturn} An object containing:
 *   - All properties returned by `useDartPoints` (e.g., `gameState`, `addScore`, `removeLastScore`, `getPlayerRoundScores`, `scoreHistory`).
 *   - `scoreTotal`: An object mapping player identifiers (e.g., "p1", "p2") to their cumulative scores.
 *
 * @example
 * // Example: Using the hook within a functional component
 * import React from "react";
 * import { useDartHunterPoints } from "./hooks/useDartHunterPoints";
 *
 * const Hunter301Game = () => {
 *   const {
 *     gameState,
 *     addScore,
 *     removeLastScore,
 *     getPlayerRoundScores,
 *     scoreHistory,
 *     scoreTotal,
 *   } = useDartHunterPoints({ playersCount: 4, roundsCount: 10, targetScore: 301 });
 *
 *   // Add a score and log the updated history and total scores
 *   addScore("T20");
 *   console.log("Score History:", scoreHistory);
 *   console.log("Total Scores:", scoreTotal);
 *
 *   // Remove the last score and log the updated history
 *   removeLastScore();
 *   console.log("After undo, Score History:", scoreHistory);
 *
 *   return null;
 * };
 *
 * export default Hunter301Game;
 */
const useDartHunterPoints = (
    { targetScore, ...dartPointProps }: UseDartHunterPointsProps
) : UseDartHunterPointsReturn => {
    const { scoreHistory, ...dartPointsProps } = useDartPoints(dartPointProps);

    const scoreTotal = useMemo(() => (
        calculateHunterScores(scoreHistory, targetScore)
    ), [scoreHistory, targetScore]);

    return {
        ...dartPointsProps,
        scoreTotal,
        scoreHistory
    };
};

export { useDartHunterPoints };
import { useState } from "react";
import { config } from "../../config";
import { ERROR_CODES, SUCCESS_CODES } from "../../constants";
import { StatusCode } from "../../interfaces";
import { isValidDartboardNotation } from "../../utils";
import { formatScore, getNextGameState } from "./helpers";

export interface UseDartPointsProps {
    playersCount: number;
    roundsCount: number;
}

/**
 * Custom React hook for managing the state and scoring logic of a dart game.
 *
 * This hook provides functionality to:
 * - Add a score for the current player, dart, and round.
 * - Remove the last score (with a limit on undo actions).
 * - Get the score for the current player.
 * - Track all scores during the game.
 *
 * It also handles game state transitions (e.g., moving to the next player, dart, or round),
 * and validates dartboard notations.
 *
 * @param props - Configuration for the dart game.
 * @param props.playersCount - The total number of players in the game.
 * @param props.roundsCount - The total number of rounds in the game.
 * @returns An object containing functions and state:
 * - `addScore`: Adds a score for the current dart and updates the game state.
 * - `removeLastScore`: Removes the last recorded score, if undo steps are allowed.
 * - `getCurrentPlayerScore`: Retrieves the score of the current player.
 * - `scoreHistory`: A list of all recorded scores in the format `R{round}-P{player}-D{dart}-{points}`.
 *
 * @example
 * ```tsx
 * // Example usage of the hook
 * const { addScore, removeLastScore, getCurrentPlayerScore, scoreHistory } = useDartPoints({ playersCount: 4, roundsCount: 10 });
 *
 * // Add a valid score
 * const result = addScore("T20");
 * if (result.type === "success") {
 *   console.log(result.message); // e.g., "Score added successfully"
 * }
 *
 * // Remove the last score
 * const undoResult = removeLastScore();
 * if (undoResult.type === "success") {
 *   console.log(undoResult.message); // e.g., "Last score removed successfully"
 * }
 *
 * // Get the current player's score
 * const currentPlayerScore = getCurrentPlayerScore();
 * console.log(currentPlayerScore); // e.g., "R1-P1-D1-T20"
 *
 * // View all scores
 * console.log(scoreHistory); // ["R1-P1-D1-T20", "R1-P1-D2-D10", ...]
 * ```
 */
const useDartPoints = (props: UseDartPointsProps) => {
    const [gameState, setGameState] = useState({
        currentRound: 1,
        currentPlayer: 1,
        dartCount: 1,
        undoLimitTracker: 0,
    });
    const [gameOver, setGameOver] = useState(false);
    const [scoreHistory, setScoreHistory] = useState<string[]>([]);

    const updateGameState = (updates: Partial<typeof gameState>) => {
        setGameState(prevState => ({ ...prevState, ...updates }));
    };

    const removeLastScore = () : StatusCode => {
        if (gameOver) {
            return SUCCESS_CODES.GAME_OVER;
        }
        if (gameState.undoLimitTracker >= config.history.maxUndoSteps) {
            return ERROR_CODES.UNDO_LIMIT_REACHED;
        }
        updateGameState({ undoLimitTracker: gameState.undoLimitTracker + 1 });
        setScoreHistory(prevScores => prevScores.slice(0, -1));
        return SUCCESS_CODES.SCORE_REMOVED;
    }

    const addScore = (nbPoints: string) : StatusCode => {
        if (gameOver) {
            return SUCCESS_CODES.GAME_OVER;
        }
        if (!isValidDartboardNotation(nbPoints)) {
            return ERROR_CODES.INVALID_DART_NOTATION;
        }
        const currentScore = formatScore(gameState.currentRound, gameState.currentPlayer, gameState.dartCount, nbPoints);
        setScoreHistory(prevScores => [...prevScores, currentScore]);


        const { isGameOver, dartCount: nextDartCount, playerNumber, roundNumber } = getNextGameState(
            { roundNumber: gameState.currentRound, playerNumber: gameState.currentPlayer, dartCount: gameState.dartCount },
            { roundNumber: props.roundsCount, playerNumber: props.playersCount, dartCount: config.darts.maxPerTurn }
        );

        if (isGameOver) {
            setGameOver(true);
            return SUCCESS_CODES.GAME_OVER;
        }

        updateGameState({ currentRound: roundNumber, currentPlayer: playerNumber, dartCount: nextDartCount });
        return SUCCESS_CODES.SCORE_ADDED;
    }

    const getCurrentPlayerScore = () => {
      return scoreHistory.filter(score => score.includes(`P${gameState.currentPlayer}`));
    };

    return {
        addScore,
        removeLastScore,
        getCurrentPlayerScore,
        scoreHistory
    }
};

export { useDartPoints };
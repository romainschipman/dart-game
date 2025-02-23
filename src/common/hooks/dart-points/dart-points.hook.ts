import { useEffect, useState } from "react";
import { config } from "../../config";
import { ERROR_CODES, SUCCESS_CODES } from "../../constants";
import { StatusCode } from "../../interfaces";
import { isValidDartboardNotation } from "../../utils";
import { extractPlayerRoundScores, formatScore, getNextGameState } from "./helpers";
import { handleGameOver, triggerGameOver } from "../../events";

export interface UseDartPointsProps {
    /** Total number of players in the game. */
    playersCount: number;
    /** Total number of rounds in the game. */
    roundsCount: number;
}

/**
 * Custom React hook for managing the state and scoring logic of a dart game.
 *
 * This hook provides functionality to:
 * - Add a score for the current player, dart, and round.
 * - Remove the last score (with a limit on undo actions).
 * - Retrieve the latest scores for each player in the current or previous round.
 * - Track the overall game progression.
 * - Handle game over events.
 *
 * It also manages transitions between players, darts, and rounds while enforcing validation rules.
 *
 * @param props - Configuration for the dart game.
 * @param props.playersCount - The total number of players in the game.
 * @param props.roundsCount - The total number of rounds in the game.
 * @returns An object containing functions and state:
 * - `gameState`: The current game state including round, player, and dart count.
 * - `addScore`: Adds a score for the current dart and updates the game state.
 * - `removeLastScore`: Removes the last recorded score, if undo steps are allowed.
 * - `getPlayerRoundScores`: Retrieves the latest scores for each player in the current or previous round.
 * - `scoreHistory`: A list of all recorded scores in the format `R{round}-P{player}-D{dart}-{points}`.
 *
 * @example
 * ```tsx
 * const { addScore, removeLastScore, getPlayerRoundScores, scoreHistory } = useDartPoints({ playersCount: 4, roundsCount: 10 });
 *
 * // Add a valid score
 * const result = addScore("T20");
 * if (result.type === "success") {
 *   console.log(result.message); // "Score added successfully"
 * }
 *
 * // Remove the last score
 * const undoResult = removeLastScore();
 * if (undoResult.type === "success") {
 *   console.log(undoResult.message); // "Last score removed successfully"
 * }
 *
 * // Get latest scores for each player
 * const playerScores = getPlayerRoundScores();
 * console.log(playerScores); // { p1: ["T20", "D10"], p2: ["S5"], ... }
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

    const removeLastScore = (): StatusCode => {
        if (gameOver) {
            return SUCCESS_CODES.GAME_OVER;
        }
        if (gameState.undoLimitTracker >= config.history.maxUndoSteps) {
            return ERROR_CODES.UNDO_LIMIT_REACHED;
        }
        updateGameState({ undoLimitTracker: gameState.undoLimitTracker + 1 });
        setScoreHistory(prevScores => prevScores.slice(0, -1));
        return SUCCESS_CODES.SCORE_REMOVED;
    };

    const addScore = (nbPoints: string): StatusCode => {
        if (gameOver) {
            return SUCCESS_CODES.GAME_OVER;
        }
        if (!isValidDartboardNotation(nbPoints)) {
            return ERROR_CODES.INVALID_DART_NOTATION;
        }

        const currentScore = formatScore(gameState.currentRound, gameState.currentPlayer, gameState.dartCount, nbPoints);
        setScoreHistory(prevScores => [...prevScores, currentScore]);

        const { currentRound, dartCount, currentPlayer } = gameState;
        const { isGameOver, dartCount: nextDartCount, playerNumber, roundNumber } = getNextGameState(
            { roundNumber: currentRound, playerNumber: currentPlayer, dartCount: dartCount },
            { roundNumber: props.roundsCount, playerNumber: props.playersCount, dartCount: config.darts.maxPerTurn }
        );

        if (isGameOver) {
            triggerGameOver();
            return SUCCESS_CODES.GAME_OVER;
        }

        updateGameState({ currentRound: roundNumber, currentPlayer: playerNumber, dartCount: nextDartCount });
        return SUCCESS_CODES.SCORE_ADDED;
    };

    const getPlayerRoundScores = (): Record<string, string[]> =>
        extractPlayerRoundScores({ playersCount: props.playersCount, scoreHistory, currentRound: gameState.currentRound});

    useEffect(() => (
        handleGameOver(() => setGameOver(true))
    ), []);

    return {
        gameState,
        addScore,
        removeLastScore,
        getPlayerRoundScores,
        scoreHistory
    };
};

export { useDartPoints };

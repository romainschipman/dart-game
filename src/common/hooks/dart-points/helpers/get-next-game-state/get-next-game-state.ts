import { GameState } from "../../../../interfaces";

interface GetNextGameStateResponse {
    isGameOver: boolean;
    roundNumber: number;
    playerNumber: number;
    dartCount: number;
}
/**
 * Determines the next state of the game based on the current state and the game's maximum constraints.
 *
 * @param currentState - The current state of the game, including the current dart count, round number, and player number.
 * @param maxState - The maximum allowed values for darts, rounds, and players.
 * @returns The updated game state with the next dart, player, or round, or an indication that the game is over.
 *
 * @example
 * ```ts
 * // Example 1: Progress to the next player
 * const currentState = { dartCount: 3, roundNumber: 1, playerNumber: 2 };
 * const maxState = { dartCount: 3, roundNumber: 5, playerNumber: 4 };
 * getNextGameState(currentState, maxState);
 * // Output:
 * // {
 * //   isGameOver: false,
 * //   roundNumber: 1,
 * //   playerNumber: 3,
 * //   dartCount: 1
 * // }
 * ```
 *
 * @example
 * ```ts
 * // Example 2: Progress to the next round
 * const currentState = { dartCount: 3, roundNumber: 1, playerNumber: 4 };
 * const maxState = { dartCount: 3, roundNumber: 5, playerNumber: 4 };
 * getNextGameState(currentState, maxState);
 * // Output:
 * // {
 * //   isGameOver: false,
 * //   roundNumber: 2,
 * //   playerNumber: 1,
 * //   dartCount: 1
 * // }
 * ```
 *
 * @example
 * ```ts
 * // Example 3: End the game
 * const currentState = { dartCount: 3, roundNumber: 5, playerNumber: 4 };
 * const maxState = { dartCount: 3, roundNumber: 5, playerNumber: 4 };
 * getNextGameState(currentState, maxState);
 * // Output:
 * // {
 * //   isGameOver: true
 * // }
 * ```
 */
const getNextGameState = (currentState: GameState, maxState: GameState) : GetNextGameStateResponse => {
    const isLastRound = currentState.roundNumber === maxState.roundNumber;
    const isLastPlayer = currentState.playerNumber === maxState.playerNumber;
    const isLastDart = currentState.dartCount === maxState.dartCount;

    if(isLastRound && isLastPlayer && isLastDart) {
        return { isGameOver: true, ...currentState };
    }

    if(isLastPlayer && isLastDart) {
        return {
            isGameOver: false,
            roundNumber: currentState.roundNumber + 1,
            playerNumber: 1,
            dartCount: 1,
        };
    }

    if (isLastDart) {
        return {
            isGameOver: false,
            roundNumber: currentState.roundNumber,
            playerNumber: currentState.playerNumber + 1,
            dartCount: 1,
        };
    }

    return {
        isGameOver: false,
        roundNumber: currentState.roundNumber,
        playerNumber: currentState.playerNumber,
        dartCount: currentState.dartCount + 1,
    };
};

export { getNextGameState };
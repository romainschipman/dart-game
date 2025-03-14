/**
 * Represents the current or maximum state of a dart game.
 */
export interface GameState {
    /**
     * The current dart count for the player in the current round.
     * Typically between 1 and the maximum allowed dart count.
     */
    dartCount: number;

    /**
     * The current round number of the game.
     * Starts from 1 and increments as rounds progress.
     */
    roundNumber: number;

    /**
     * The current player's number in the game.
     * Typically between 1 and the total number of players.
     */
    playerNumber: number;
}

/**
 * Represents the current or maximum state of a dart game.
 */
export interface CurrentGameState {
    /**
     * The current dart count for the player in the current round.
     * Typically between 1 and the maximum allowed dart count.
     */
    dartCount: number;

    /**
     * The current round number of the game.
     * Starts from 1 and increments as rounds progress.
     */
    currentRound: number;

    /**
     * The current player's number in the game.
     * Typically between 1 and the total number of players.
     */
    currentPlayer: number;

    /**
     * The current undo limit trackers.
     * Typically between 1 and the limit of undo trackers
     */
    undoLimitTracker: number;
}

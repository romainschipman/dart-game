import { StatusCode } from "../../../../interfaces";
import { ERROR_CODES, SUCCESS_CODES } from "../../../../constants";

export const getUndoScoreError = (
    scoreHistory: string[],
    gameOver: boolean,
    undoLimit: number,
    maxUndoSteps: number
): StatusCode | null => {
    const preconditions = new Map<boolean, StatusCode>([
        [scoreHistory.length === 0, ERROR_CODES.NO_SCORES_TO_REMOVE],
        [gameOver, SUCCESS_CODES.GAME_OVER],
        [undoLimit >= maxUndoSteps, ERROR_CODES.UNDO_LIMIT_REACHED]
    ]);

    for (const [condition, error] of preconditions) {
        if (condition) return error;
    }

    return null;
};
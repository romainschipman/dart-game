import { ERROR_CODES, SUCCESS_CODES } from "../../../../constants";
import { getUndoScoreError } from "./get-undo-score-error";

describe("Unit test for getUndoScoreError", () => {
    test("should return NO_SCORES_TO_REMOVE if score history is empty", () => {
        const result = getUndoScoreError([], false, 0, 5);
        expect(result).toBe(ERROR_CODES.NO_SCORES_TO_REMOVE);
    });

    test("should return GAME_OVER if the game is over", () => {
        const result = getUndoScoreError(["T20"], true, 0, 5);
        expect(result).toBe(SUCCESS_CODES.GAME_OVER);
    });

    test("should return UNDO_LIMIT_REACHED if undo limit is reached", () => {
        const result = getUndoScoreError(["T20"], false, 5, 5);
        expect(result).toBe(ERROR_CODES.UNDO_LIMIT_REACHED);
    });

    test("should return null if no error conditions are met", () => {
        const result = getUndoScoreError(["T20"], false, 2, 5);
        expect(result).toBeNull();
    });
});
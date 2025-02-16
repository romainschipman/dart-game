import { StatusCode } from "../../interfaces";

export type SuccessCode = "SCORE_REMOVED" | "GAME_OVER" | "SCORE_ADDED";

const SUCCESS_CODES : Record<SuccessCode, StatusCode> = {
    GAME_OVER: {
        type: "success",
        code: "GAME_OVER",
        message: "Game over",
    },
    SCORE_ADDED: {
        type: "success",
        code: "SCORE_ADDED",
        message: "Score added successfully",
    },
    SCORE_REMOVED: {
        type: "success",
        code: "SCORE_REMOVED",
        message: "Last score removed successfully",
    }
};

export { SUCCESS_CODES };
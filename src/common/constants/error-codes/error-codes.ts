import { StatusCode } from "../../interfaces";

export type ErrorCode = "INVALID_DART_NOTATION" | "UNDO_LIMIT_REACHED" | "UNEXPECTED_ERROR" | "NO_SCORES_TO_REMOVE";

const ERROR_CODES : Record<ErrorCode, StatusCode> = {
    INVALID_DART_NOTATION: {
        type: "error",
        code: "INVALID_DART_NOTATION",
        message: "Invalid dart notation",
    },
    UNDO_LIMIT_REACHED: {
        type: "error",
        code: "UNDO_LIMIT_REACHED",
        message: "Undo limit reached",
    },
    UNEXPECTED_ERROR: {
        type: "error",
        code: "UNEXPECTED_ERROR",
        message: "Unexpected error",
    },
    NO_SCORES_TO_REMOVE: {
        type: "error",
        code: "NO_SCORES_TO_REMOVE",
        message: "No scores to remove"
    }
};

export { ERROR_CODES };
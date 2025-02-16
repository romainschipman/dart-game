import { StatusCode } from "../../interfaces";

export type ErrorCode = "INVALID_DART_NOTATION" | "UNDO_LIMIT_REACHED";

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
};

export { ERROR_CODES };
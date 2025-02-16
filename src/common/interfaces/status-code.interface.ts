/**
 * Represents a general response code, either for success or error.
 */
export interface StatusCode {
    /**
     * The type of the response.
     * Can be either "success" for successful operations or "error" for failed operations.
     */
    type: "success" | "error";
    /**
     * A unique code identifying the response type.
     * For example: "GAME_OVER", "INVALID_DART_NOTATION", "UNDO_LIMIT_REACHED".
     */
    code: string;
    /**
     * A human-readable message describing the response.
     */
    message: string;
}

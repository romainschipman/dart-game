import { renderHook, waitFor } from "@testing-library/react";
import { SUCCESS_CODES, ERROR_CODES } from "../../constants";
import { useDartPoints } from "./dart-points.hook";
import * as gameOverEvents from "../../events";

jest.mock("../../events", () => ({
    handleGameOver: jest.fn(),
    triggerGameOver: jest.fn().mockReturnValue(jest.fn()),
}));

describe("useDartPoints", () => {
    const defaultProps = { playersCount: 4, roundsCount: 10 };
    const unsubscribeMock = jest.fn();
    beforeEach(() => {
        jest.spyOn(gameOverEvents, "handleGameOver").mockReturnValue(unsubscribeMock);
        jest.clearAllMocks();
    });

    test("should initialize with default state", async () => {
        const { result } = renderHook(() => useDartPoints(defaultProps));

        expect(result.current.scoreHistory).toEqual([]);
        expect(result.current.addScore).toBeInstanceOf(Function);
        expect(result.current.removeLastScore).toBeInstanceOf(Function);
        expect(result.current.getCurrentPlayerScore).toBeInstanceOf(Function);
    });

    test("should add a valid score and update the state", async () => {
        const { result } = renderHook(() => useDartPoints(defaultProps));

        await waitFor(() => {
            expect(result.current.addScore("T20")).toEqual(SUCCESS_CODES.SCORE_ADDED);
        });

        await waitFor(() => {
            expect(result.current.scoreHistory).toEqual(["R1-P1-D1-T20"]);
        });
    });

    test("should return an error for an invalid dartboard notation", async () => {
        const { result } = renderHook(() => useDartPoints(defaultProps));

        await waitFor(() => {
            expect(result.current.addScore("INVALID")).toEqual(ERROR_CODES.INVALID_DART_NOTATION);
        });

        await waitFor(() => {
            expect(result.current.scoreHistory).toEqual([]);
        });
    });

    test("should remove the last score", async () => {
        const { result } = renderHook(() => useDartPoints(defaultProps));

        await waitFor(() => {
            result.current.addScore("T20");
        });

        await waitFor(() => {
            result.current.addScore("D10");
        });

        expect(result.current.scoreHistory).toEqual(["R1-P1-D1-T20", "R1-P1-D2-D10"]);

        await waitFor(() => {
            expect(result.current.removeLastScore()).toEqual(SUCCESS_CODES.SCORE_REMOVED);
        });

        await waitFor(() => {
            expect(result.current.scoreHistory).toEqual(["R1-P1-D1-T20"]);
        });
    });

    test("should enforce the undo limit when removing scores", async () => {
        const { result } = renderHook(() => useDartPoints(defaultProps));

        await waitFor(() => {
            result.current.addScore("T20");
        });
        await waitFor(() => {
            result.current.addScore("D10");
        });
        await waitFor(() => {
            result.current.addScore("T15");
        });

        expect(result.current.scoreHistory).toEqual([
            "R1-P1-D1-T20",
            "R1-P1-D2-D10",
            "R1-P1-D3-T15",
        ]);

        await waitFor(() => {
            for (let i = 0; i < 3; i++) {
                result.current.removeLastScore();
            }
        });

        await waitFor(() => {
            expect(result.current.removeLastScore()).toEqual(ERROR_CODES.UNDO_LIMIT_REACHED);
        });

        await waitFor(() => {
            expect(result.current.scoreHistory).toEqual([]);
        });
    });

    test("should handle GAME_OVER event correctly", async () => {
        const triggerGameOverMock = jest.spyOn(gameOverEvents, "triggerGameOver");

        const { result, unmount } = renderHook(() => useDartPoints({ playersCount: 1, roundsCount: 1 }));

        await waitFor(() => {
            result.current.addScore("T20");
        });

        await waitFor(() => {
            result.current.addScore("D10");
        });

        await waitFor(() => {
            result.current.addScore("B");
        });

        await waitFor(() => {
            expect(result.current.addScore("DB")).toEqual(SUCCESS_CODES.GAME_OVER);
        });

        await waitFor(() => {
            expect(triggerGameOverMock).toHaveBeenCalled();
        });

        await waitFor(() => {
            expect(result.current.removeLastScore()).toEqual(ERROR_CODES.UNDO_LIMIT_REACHED);
        });

        unmount();

        expect(unsubscribeMock).toHaveBeenCalledTimes(1);
    });
});

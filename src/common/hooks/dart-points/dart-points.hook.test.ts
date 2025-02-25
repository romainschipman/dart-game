import { renderHook, waitFor } from "@testing-library/react";
import { SUCCESS_CODES, ERROR_CODES } from "../../constants";
import { useDartPoints } from "./dart-points.hook";
import * as gameOverEvents from "../../events";
import * as utils from "../../utils";
import * as helpers from "./helpers"; // Import général des helpers

jest.mock("../../events", () => ({
    handleGameOver: jest.fn(),
    triggerGameOver: jest.fn().mockReturnValue(jest.fn()),
}));

describe("Unit test for useDartPoints", () => {
    const defaultProps = { playersCount: 4, roundsCount: 10 };
    const unsubscribeMock = jest.fn();

    beforeEach(() => {
        jest.restoreAllMocks();
        jest.spyOn(gameOverEvents, "handleGameOver").mockReturnValue(unsubscribeMock);
    });

    test("should initialize with default state", async () => {
        const { result } = renderHook(() => useDartPoints(defaultProps));

        expect(result.current.scoreHistory).toEqual([]);
        expect(result.current.addScore).toBeInstanceOf(Function);
        expect(result.current.removeLastScore).toBeInstanceOf(Function);
        expect(result.current.getPlayerRoundScores).toBeInstanceOf(Function);
    });

    test("should call extractPlayerRoundScores when getPlayerRoundScores is invoked", async () => {
        const extractPlayerRoundScoresMock = jest.spyOn(helpers, "extractPlayerRoundScores").mockReturnValue({
            p1: ["T20"],
            p2: [],
            p3: [],
            p4: [],
        });

        const { result } = renderHook(() => useDartPoints(defaultProps));

        const scores = result.current.getPlayerRoundScores();

        expect(extractPlayerRoundScoresMock).toHaveBeenCalledWith({
            playersCount: 4,
            scoreHistory: [],
            currentRound: 1,
        });

        expect(scores).toEqual({
            p1: ["T20"],
            p2: [],
            p3: [],
            p4: [],
        });
    });

    test("should add a valid score and update the state", async () => {
        const { result } = renderHook(() => useDartPoints(defaultProps));

        await waitFor(() => expect(result.current.addScore("T20")).toEqual(SUCCESS_CODES.SCORE_ADDED));
        await waitFor(() => expect(result.current.scoreHistory).toEqual(["R1-P1-D1-T20"]));
    });

    test("should return an error for an invalid dartboard notation", async () => {
        const { result } = renderHook(() => useDartPoints(defaultProps));

        await waitFor(() => expect(result.current.addScore("INVALID")).toEqual(ERROR_CODES.INVALID_DART_NOTATION));
        await waitFor(() => expect(result.current.scoreHistory).toEqual([]));
    });

    test("should remove the last score", async () => {
        const { result } = renderHook(() => useDartPoints(defaultProps));

        await waitFor(() => result.current.addScore("T20"));
        await waitFor(() => result.current.addScore("D10"));

        await waitFor(() => expect(result.current.scoreHistory).toEqual(["R1-P1-D1-T20", "R1-P1-D2-D10"]));

        await waitFor(() => expect(result.current.removeLastScore()).toEqual(SUCCESS_CODES.SCORE_REMOVED));

        await waitFor(() => expect(result.current.scoreHistory).toEqual(["R1-P1-D1-T20"]));
    });

    test("should enforce the undo limit when removing scores", async () => {
        const { result } = renderHook(() => useDartPoints(defaultProps));

        await waitFor(() => expect(result.current.addScore("T20")).toEqual(SUCCESS_CODES.SCORE_ADDED));
        await waitFor(() => expect(result.current.addScore("D10")).toEqual(SUCCESS_CODES.SCORE_ADDED));
        await waitFor(() => expect(result.current.addScore("T15")).toEqual(SUCCESS_CODES.SCORE_ADDED));

        await waitFor(() => {
            expect(result.current.scoreHistory).toEqual([
                "R1-P1-D1-T20",
                "R1-P1-D2-D10",
                "R1-P1-D3-T15",
            ]);
        });

        await waitFor(() => expect(result.current.removeLastScore()).toEqual(SUCCESS_CODES.SCORE_REMOVED));
        await waitFor(() => expect(result.current.scoreHistory).toEqual([
            "R1-P1-D1-T20",
            "R1-P1-D2-D10",
        ]));

        await waitFor(() => expect(result.current.removeLastScore()).toEqual(SUCCESS_CODES.SCORE_REMOVED));
        await waitFor(() => expect(result.current.scoreHistory).toEqual(["R1-P1-D1-T20"]));

        await waitFor(() => expect(result.current.removeLastScore()).toEqual(SUCCESS_CODES.SCORE_REMOVED));
        await waitFor(() => expect(result.current.scoreHistory).toEqual([]));

        await waitFor(() => expect(result.current.removeLastScore()).toEqual(ERROR_CODES.NO_SCORES_TO_REMOVE));
    });

    test("should handle GAME_OVER event correctly", async () => {
        const triggerGameOverMock = jest.spyOn(gameOverEvents, "triggerGameOver");

        const { result, unmount } = renderHook(() => useDartPoints({ playersCount: 1, roundsCount: 1 }));

        await waitFor(() => expect(result.current.addScore("T20")).toEqual(SUCCESS_CODES.SCORE_ADDED));
        await waitFor(() => expect(result.current.addScore("D10")).toEqual(SUCCESS_CODES.SCORE_ADDED));

        await waitFor(() => expect(result.current.addScore("DB")).toEqual(SUCCESS_CODES.GAME_OVER));

        await waitFor(() => expect(triggerGameOverMock).toHaveBeenCalled());

        await waitFor(() => unmount());
        expect(unsubscribeMock).toHaveBeenCalled();
    });


    test("should handle game over event correctly", async () => {
        const handleGameOverMock = jest.spyOn(gameOverEvents, "handleGameOver").mockImplementation((handler) => {
            setTimeout(handler, 100);
            return () => {};
        });

        const { result } = renderHook(() => useDartPoints({ playersCount: 1, roundsCount: 1 }));

        expect(handleGameOverMock).toHaveBeenCalled();

        await waitFor(() => {
            expect(result.current.removeLastScore()).toEqual(SUCCESS_CODES.GAME_OVER);
        });

        await waitFor(() => {
            expect(result.current.addScore("T20")).toEqual(SUCCESS_CODES.GAME_OVER);
        });
    });

    test("should return UNEXPECTED_ERROR if parsing last score fails", async () => {
        const { result } = renderHook(() => useDartPoints(defaultProps));

        jest.spyOn(utils, "parseFormattedScore").mockReturnValue(null);

        await waitFor(() => expect(result.current.addScore("T20")).toEqual(SUCCESS_CODES.SCORE_ADDED));

        await waitFor(() => {
            expect(result.current.removeLastScore()).toEqual(ERROR_CODES.UNEXPECTED_ERROR);
        });
    });
});

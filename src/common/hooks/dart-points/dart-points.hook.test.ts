import { renderHook, waitFor } from "@testing-library/react";
import { SUCCESS_CODES, ERROR_CODES } from "../../constants";
import { useDartPoints } from "./dart-points.hook";

describe("useDartPoints", () => {
    const defaultProps = { playersCount: 4, roundsCount: 10 };

    test("should initialize with default state", () => {
        const { result } = renderHook(() => useDartPoints(defaultProps));

        expect(result.current.scoreHistory).toEqual([]);
        expect(result.current.addScore).toBeInstanceOf(Function);
        expect(result.current.removeLastScore).toBeInstanceOf(Function);
        expect(result.current.getCurrentPlayerScore).toBeInstanceOf(Function);
    });

    test("should add a valid score and update the state", async () => {
        const { result } = renderHook(() => useDartPoints(defaultProps));

        await waitFor(() => {
            const response = result.current.addScore("T20");
            expect(response).toEqual(SUCCESS_CODES.SCORE_ADDED);
        });

        expect(result.current.scoreHistory).toEqual(["R1-P1-D1-T20"]);
    });

    test("should return an error for an invalid dartboard notation", async () => {
        const { result } = renderHook(() => useDartPoints(defaultProps));

        await waitFor(() => {
            const response = result.current.addScore("INVALID");
            expect(response).toEqual(ERROR_CODES.INVALID_DART_NOTATION);
        });

        expect(result.current.scoreHistory).toEqual([]);
    });

    test("should remove the last score", async () => {
        const { result } = renderHook(() => useDartPoints(defaultProps));

        await waitFor(() => {
            result.current.addScore("T20");
        });

        await waitFor(() => {
            result.current.addScore("D10");
        })

        expect(result.current.scoreHistory).toEqual(["R1-P1-D1-T20", "R1-P1-D2-D10"]);

        await waitFor(() => {
            const response = result.current.removeLastScore();
            expect(response).toEqual(SUCCESS_CODES.SCORE_REMOVED);
        });

        expect(result.current.scoreHistory).toEqual(["R1-P1-D1-T20"]);
    });

    test("should enforce the undo limit when removing scores", async () => {
        const { result } = renderHook(() =>
            useDartPoints({ playersCount: 4, roundsCount: 10 })
        );

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
            const response = result.current.removeLastScore();
            expect(response).toEqual(ERROR_CODES.UNDO_LIMIT_REACHED);
        });

        expect(result.current.scoreHistory).toEqual([]);
    });

    test("should get the current player's score", async () => {
        const { result } = renderHook(() => useDartPoints(defaultProps));

        await waitFor(() => {
            result.current.addScore("T20");
        });
        await waitFor(() => {
            result.current.addScore("D10");
        });
        const currentPlayerScores = result.current.getCurrentPlayerScore();
        expect(currentPlayerScores).toEqual(["R1-P1-D1-T20", "R1-P1-D2-D10"]);
    });

    test("should transition to the next player or round", async () => {
        const { result } = renderHook(() =>
            useDartPoints({ playersCount: 2, roundsCount: 2 })
        );

        await waitFor(() => {
            result.current.addScore("T20");
        });
        await waitFor(() => {
            result.current.addScore("D10");
        });
        await waitFor(() => {
            result.current.addScore("S5");
        });
        await waitFor(() => {
            result.current.addScore("5");
        });
        await waitFor(() => {
            result.current.addScore("DB");
        });


        expect(result.current.scoreHistory).toEqual([
            "R1-P1-D1-T20",
            "R1-P1-D2-D10",
            "R1-P1-D3-5",
            "R1-P2-D1-DB",
        ]);
    });

    test("should return GAME_OVER when the game ends", async () => {
        const { result } = renderHook(() =>
            useDartPoints({ playersCount: 1, roundsCount: 1 })
        );

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
            const response = result.current.addScore("DB");
            expect(response).toEqual(SUCCESS_CODES.GAME_OVER);
        });

        await waitFor(() => {
            const response = result.current.removeLastScore();
            expect(response).toEqual(SUCCESS_CODES.GAME_OVER);
        });

        expect(result.current.scoreHistory).toEqual([
            "R1-P1-D1-T20",
            "R1-P1-D2-D10",
            "R1-P1-D3-B",
        ]);
    });
});

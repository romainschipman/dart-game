import { renderHook } from "@testing-library/react";
import { useDartPoints } from "../../../common/hooks";
import { calculateHunterScores } from "../../utils";
import { useDartHunterPoints } from "./dart-hunter-points.hook";

jest.mock("../../../common/hooks", () => ({
    useDartPoints: jest.fn(),
}));

jest.mock("../../utils", () => ({
    calculateHunterScores: jest.fn(),
}));

describe("Unit test for useDartHunterPoints", () => {
    const mockUseDartPointsReturn = {
        gameState: { currentRound: 1, currentPlayer: 1, dartCount: 1 },
        addScore: jest.fn(),
        removeLastScore: jest.fn(),
        getPlayerRoundScores: jest.fn(),
        scoreHistory: [],
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useDartPoints as jest.Mock).mockReturnValue(mockUseDartPointsReturn);
    });

    it("should initialize with the base dart points properties", () => {
        const { result } = renderHook(() =>
            useDartHunterPoints({ playersCount: 4, roundsCount: 10, targetScore: 301 })
        );

        expect(result.current).toMatchObject({
            gameState: mockUseDartPointsReturn.gameState,
            addScore: expect.any(Function),
            removeLastScore: expect.any(Function),
            getPlayerRoundScores: expect.any(Function),
            scoreHistory: [],
            scoreTotal: {},
        });
    });

    it("should calculate scoreTotal using calculateHunterScores", () => {
        const mockScoreHistory = ["R1-P1-D1-T20", "R1-P2-D2-D10"];
        const mockScoreTotal = { p1: 60, p2: 10 };

        (useDartPoints as jest.Mock).mockReturnValue({
            ...mockUseDartPointsReturn,
            scoreHistory: mockScoreHistory,
        });

        (calculateHunterScores as jest.Mock).mockReturnValue(mockScoreTotal);

        const { result } = renderHook(() =>
            useDartHunterPoints({ playersCount: 2, roundsCount: 10, targetScore: 301 })
        );

        expect(calculateHunterScores).toHaveBeenCalledWith(mockScoreHistory, 301);
        expect(result.current.scoreTotal).toEqual(mockScoreTotal);
    });

    it("should recompute scoreTotal when targetScore changes", () => {
        const mockScoreHistory = ["R1-P1-D1-T20"];
        (useDartPoints as jest.Mock).mockReturnValue({
            ...mockUseDartPointsReturn,
            scoreHistory: mockScoreHistory,
        });

        const { rerender } = renderHook(
            ({ targetScore }) =>
                useDartHunterPoints({ playersCount: 2, roundsCount: 10, targetScore }),
            { initialProps: { targetScore: 301 } }
        );

        expect(calculateHunterScores).toHaveBeenCalledWith(mockScoreHistory, 301);

        // Modifier targetScore
        rerender({ targetScore: 500 });

        expect(calculateHunterScores).toHaveBeenCalledWith(mockScoreHistory, 500);
    });

    it("should not change the reference of other properties from useDartPoints", () => {
        const { result } = renderHook(() =>
            useDartHunterPoints({ playersCount: 2, roundsCount: 10, targetScore: 301 })
        );

        expect(result.current.addScore).toBe(mockUseDartPointsReturn.addScore);
        expect(result.current.removeLastScore).toBe(mockUseDartPointsReturn.removeLastScore);
        expect(result.current.getPlayerRoundScores).toBe(mockUseDartPointsReturn.getPlayerRoundScores);
        expect(result.current.gameState).toBe(mockUseDartPointsReturn.gameState);
        expect(result.current.scoreHistory).toBe(mockUseDartPointsReturn.scoreHistory);
    });
});

import { getNextGameState } from "./get-next-game-state";

describe("Unit test for getNextGameState", () => {
    test.each([
        [
            "should move to the next player",
            { dartCount: 3, roundNumber: 1, playerNumber: 2 },
            { dartCount: 3, roundNumber: 5, playerNumber: 4 },
            { isGameOver: false, roundNumber: 1, playerNumber: 3, dartCount: 1 },
        ],
        [
            "should move to the next round",
            { dartCount: 3, roundNumber: 1, playerNumber: 4 },
            { dartCount: 3, roundNumber: 5, playerNumber: 4 },
            { isGameOver: false, roundNumber: 2, playerNumber: 1, dartCount: 1 },
        ],
        [
            "should end the game when max round, player, and darts are reached",
            { dartCount: 3, roundNumber: 5, playerNumber: 4 },
            { dartCount: 3, roundNumber: 5, playerNumber: 4 },
            { isGameOver: true, roundNumber: 5, playerNumber: 4, dartCount: 3 },
        ],
        [
            "should increment the dart count",
            { dartCount: 1, roundNumber: 3, playerNumber: 2 },
            { dartCount: 3, roundNumber: 5, playerNumber: 4 },
            { isGameOver: false, roundNumber: 3, playerNumber: 2, dartCount: 2 },
        ],
    ])("%s", (description, currentState, maxState, expected) => {
        const result = getNextGameState(currentState, maxState);
        expect(result).toEqual(expected);
    });
});

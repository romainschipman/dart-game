import { handleGameOver, triggerGameOver, clearAllListenersGameOver } from "./game-over.event";

describe("Game Events", () => {
    beforeEach(() => {
        clearAllListenersGameOver();
    });

    test("should call the handler when GAME_OVER event is triggered", () => {
        const handler = jest.fn();

        handleGameOver(handler);
        triggerGameOver();

        expect(handler).toHaveBeenCalledTimes(1);
    });

    test("should not call the handler after unsubscribing", () => {
        const handler = jest.fn();
        const unsubscribe = handleGameOver(handler);

        unsubscribe();
        triggerGameOver();

        expect(handler).not.toHaveBeenCalled();
    });

    test("should call multiple handlers when GAME_OVER event is triggered", () => {
        const handler1 = jest.fn();
        const handler2 = jest.fn();

        handleGameOver(handler1);
        handleGameOver(handler2);
        triggerGameOver();

        expect(handler1).toHaveBeenCalledTimes(1);
        expect(handler2).toHaveBeenCalledTimes(1);
    });

    test("should allow removing a specific handler while keeping others", () => {
        const handler1 = jest.fn();
        const handler2 = jest.fn();

        const unsubscribe1 = handleGameOver(handler1);
        handleGameOver(handler2);

        unsubscribe1();
        triggerGameOver();

        expect(handler1).not.toHaveBeenCalled();
        expect(handler2).toHaveBeenCalledTimes(1);
    });

    test("should remove all listeners with clearAllListenersGameOver", () => {
        const handler1 = jest.fn();
        const handler2 = jest.fn();

        handleGameOver(handler1);
        handleGameOver(handler2);

        clearAllListenersGameOver();
        triggerGameOver();

        expect(handler1).not.toHaveBeenCalled();
        expect(handler2).not.toHaveBeenCalled();
    });
});

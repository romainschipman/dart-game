import mitt from "mitt";
import { GAME_OVER_EVENT, GameEvents } from "./game-over.event.interface";

const emitter = mitt<GameEvents>();

/**
 * Subscribes to the GAME_OVER event.
 *
 * @param handler - Callback function executed when the event is triggered.
 * @returns A function to unsubscribe from the event.
 *
 * @example
 * const unsubscribe = handleGameOver(() => console.log("Game Over!"));
 * unsubscribe(); // Removes the listener
 */
const handleGameOver = (handler: () => void) => {
    emitter.on(GAME_OVER_EVENT.GAME_OVER, handler);
    return () => emitter.off(GAME_OVER_EVENT.GAME_OVER, handler);
};

/**
 * Triggers the GAME_OVER event.
 *
 * @example
 * triggerGameOver(); // Notifies all subscribed listeners
 */
const triggerGameOver = () => {
    emitter.emit(GAME_OVER_EVENT.GAME_OVER);
};

/**
 * Clears all event listeners.
 * Useful for testing or resetting event listeners in some scenarios.
 *
 * @example
 * clearAllListenersGameOver(); // Removes all listeners
 */
const clearAllListenersGameOver = () => {
    emitter.all.clear();
};

export { handleGameOver, triggerGameOver, clearAllListenersGameOver };

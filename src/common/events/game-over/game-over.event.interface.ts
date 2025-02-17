
export const GAME_OVER_EVENT = {
    GAME_OVER: "ON_GAME_OVER",
} as const;

export type GameEvents = {
    [GAME_OVER_EVENT.GAME_OVER]: void;
};
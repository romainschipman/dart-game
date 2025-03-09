import { DOUBLE_LABEL, TRIPLE_LABEL } from "../config";

export interface Config {
    bullseye: {
        single: number;
        double: number;
    };
    score: {
        max: number;
        min: number;
        minForDoublesAndTriples: number;
        buttons: number[];
        specialButtons: { label: typeof DOUBLE_LABEL | typeof TRIPLE_LABEL; color: string }[];
    };
    darts: {
        maxPerTurn: number;
    };
    players: {
        maxPlayers: number;
    };
    rounds: {
        maxRounds: number;
    };
    history: {
        maxUndoSteps: number;
    };
}
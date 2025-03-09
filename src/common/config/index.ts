import { Config } from "../interfaces";

export const DOUBLE_LABEL = "DOUBLE";
export const TRIPLE_LABEL = "TRIPLE";

const config : Config = {
    bullseye: {
        single: 25,
        double: 50,
    },
    score: {
        max: 20,
        min: 0,
        minForDoublesAndTriples: 1,
        buttons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 0],
        specialButtons: [
            { label: DOUBLE_LABEL, color: "#a0c1ff" },
            { label: TRIPLE_LABEL, color: "#dba5ff" }
        ]
    },
    darts: {
        maxPerTurn: 3,
    },
    players: {
        maxPlayers: 4,
    },
    rounds: {
        maxRounds: 10,
    },
    history: {
        maxUndoSteps: 9
    },
};

export { config };

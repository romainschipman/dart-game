import type { Config } from 'jest';

const config: Config = {
    collectCoverage: true,
    coverageDirectory: "coverage",
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [
        'node_modules/(?!(module-to-transform)/)',
    ],
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/dist/",
        "/coverage/",
        "index.ts",
    ],
};

export default config;

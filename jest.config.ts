import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest', // Si tu utilises ts-jest
    testEnvironment: 'node',
    transformIgnorePatterns: [
        'node_modules/(?!(module-to-transform)/)',
    ],
};

export default config;

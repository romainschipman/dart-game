import { getMaxNumbers } from "./get-max-numbers";

describe("Unit test for getMaxNumbers", () => {
    test("should return the maximum value in a number array", () => {
        const numbers = [10, 5, 20, 8];
        expect(getMaxNumbers(numbers)).toBe(20);
    });

    test("should return the maximum computed value from an object array", () => {
        const players = [{ score: 50 }, { score: 80 }, { score: 30 }];
        expect(getMaxNumbers<{ score: number }>(players, (player) => player.score)).toBe(80);
    });

    test("should return 0 for an empty array", () => {
        expect(getMaxNumbers([])).toBe(0);
    });

    test("should return the maximum value when array contains negative numbers", () => {
        const numbers = [-10, -5, -20, -8];
        expect(getMaxNumbers(numbers)).toBe(-5);
    });

    test("should return the maximum computed value with mixed positive and negative numbers", () => {
        const values = [{ value: -10 }, { value: 5 }, { value: 20 }, { value: -2 }];
        expect(getMaxNumbers(values, (item) => item.value)).toBe(20);
    });

    test("should return the maximum when using a custom compute function", () => {
        const words = ["apple", "banana", "cherry"];
        expect(getMaxNumbers(words, word => word.length)).toBe(6); // "banana" has length 6
    });

    test("should return 0 when computeValue is not provided and array contains non-numbers", () => {
        const mixedArray = ["text", {}, []];
        expect(getMaxNumbers(mixedArray as unknown as number[])).toBe(0);
    });

    test("should return the maximum value when array contains only one element", () => {
        expect(getMaxNumbers([42])).toBe(42);
    });

    test("should return the maximum computed value when array contains only one object", () => {
        expect(getMaxNumbers([{ value: 99 }], item => item.value)).toBe(99);
    });

    test("should correctly handle an array where all elements are the same", () => {
        expect(getMaxNumbers([7, 7, 7, 7, 7])).toBe(7);
    });
});

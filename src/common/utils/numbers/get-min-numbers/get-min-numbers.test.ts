import { getMinNumbers } from "./get-min-numbers";

describe("Unit test for getMinNumbers", () => {
    test("should return the minimum value in a number array", () => {
        const numbers = [10, 5, 20, 8];
        expect(getMinNumbers(numbers)).toBe(5);
    });

    test("should return the minimum computed value from an object array", () => {
        const players = [{ score: 50 }, { score: 80 }, { score: 30 }];
        expect(getMinNumbers(players, player => player.score)).toBe(30);
    });

    test("should return 0 for an empty array", () => {
        expect(getMinNumbers([])).toBe(0);
    });

    test("should return the minimum value when array contains negative numbers", () => {
        const numbers = [-10, -5, -20, -8];
        expect(getMinNumbers(numbers)).toBe(-20);
    });

    test("should return the minimum computed value with mixed positive and negative numbers", () => {
        const values = [{ value: -10 }, { value: 5 }, { value: 20 }, { value: -2 }];
        expect(getMinNumbers(values, item => item.value)).toBe(-10);
    });

    test("should return the minimum when using a custom compute function", () => {
        const words = ["apple", "banana", "cherry"];
        expect(getMinNumbers(words, word => word.length)).toBe(5); // "apple" has length 5
    });

    test("should return 0 when computeValue is not provided and array contains non-numbers", () => {
        const mixedArray = ["text", {}, []];
        expect(getMinNumbers(mixedArray as unknown as number[])).toBe(0);
    });

    test("should return the minimum value when array contains only one element", () => {
        expect(getMinNumbers([42])).toBe(42);
    });

    test("should return the minimum computed value when array contains only one object", () => {
        expect(getMinNumbers([{ value: 99 }], item => item.value)).toBe(99);
    });

    test("should correctly handle an array where all elements are the same", () => {
        expect(getMinNumbers([7, 7, 7, 7, 7])).toBe(7);
    });
});

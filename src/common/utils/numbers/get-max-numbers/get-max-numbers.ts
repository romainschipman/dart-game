/**
 * Returns the maximum value from an array of numbers or objects.
 *
 * If `computeValue` is provided, it is used to extract a numerical value from each element.
 * Otherwise, the function assumes the array contains numbers and returns the highest value.
 * If the array is empty, it returns `0` by default.
 *
 * @template T - The type of the elements in the array (defaults to `number`).
 * @param array - The array from which to find the maximum value.
 * @param computeValue - (Optional) A function to extract a numerical value from each element.
 * @returns The maximum numerical value found in the array, or `0` if the array is empty.
 *
 * @example
 * ```ts
 * // Example 1: Finding the max value in a number array
 * const numbers = [10, 5, 20, 8];
 * const max = getMaxNumbers(numbers);
 * console.log(max); // Output: 20
 *
 * // Example 2: Finding the max value in an object array
 * const players = [{ score: 50 }, { score: 80 }, { score: 30 }];
 * const maxScore = getMaxNumbers(players, player => player.score);
 * console.log(maxScore); // Output: 80
 *
 * // Example 3: Handling an empty array
 * const empty = [];
 * console.log(getMaxNumbers(empty)); // Output: 0
 * ```
 */
const getMaxNumbers = <T = number> (array: T[], computeValue?: (item: T) => number) => {
    if(array.length === 0) return 0;

    if(!computeValue) {
        computeValue = (item: T) => ((typeof item === "number") ? item : 0);
    }

    return array.reduce((maxValue, itemValue) => Math.max(maxValue, computeValue(itemValue)), -Infinity);
}

export { getMaxNumbers };
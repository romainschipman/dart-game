/**
 * Returns the minimum value from an array of numbers or objects.
 *
 * If `computeValue` is provided, it extracts a numerical value from each element.
 * Otherwise, the function assumes the array contains numbers and returns the lowest value.
 * If the array is empty, it returns `0` by default.
 *
 * @template T - The type of the elements in the array (defaults to `number`).
 * @param array - The array from which to find the minimum value.
 * @param computeValue - (Optional) A function to extract a numerical value from each element.
 * @returns The minimum numerical value found in the array, or `0` if the array is empty.
 *
 * @example
 * ```ts
 * // Example 1: Finding the min value in a number array
 * const numbers = [10, 5, 20, 8];
 * const min = getMinNumbers(numbers);
 * console.log(min); // Output: 5
 *
 * // Example 2: Finding the min value in an object array
 * const players = [{ score: 50 }, { score: 80 }, { score: 30 }];
 * const minScore = getMinNumbers(players, player => player.score);
 * console.log(minScore); // Output: 30
 *
 * // Example 3: Handling an empty array
 * const empty = [];
 * console.log(getMinNumbers(empty)); // Output: 0
 * ```
 */
const getMinNumbers = <T = number> (array: T[], computeValue?: (item: T) => number) => {
    if(array.length === 0) return 0;

    if(!computeValue) {
        computeValue = (item: T) => ((typeof item === "number") ? item : 0);
    }

    return array.reduce((minValue, itemValue) => Math.min(minValue, computeValue(itemValue)), Infinity);
}

export { getMinNumbers };
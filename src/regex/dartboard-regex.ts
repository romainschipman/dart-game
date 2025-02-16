/**
 * Regular expression to validate dartboard notations.
 *
 * Valid dartboard notations start with either:
 * - 'T' for Triple
 * - 'D' for Double
 * and are followed by one or more digits representing the dartboard value.
 *
 * @constant {RegExp} DARTBOARD_REGEX
 * @example
 * ```ts
 * // Valid examples:
 * DARTBOARD_REGEX.test("T20"); // true (Triple 20)
 * DARTBOARD_REGEX.test("D10"); // true (Double 10)
 * ```
 *
 * @example
 * ```ts
 * // Invalid examples:
 * DARTBOARD_REGEX.test("S20"); // false ('S' is not allowed)
 * DARTBOARD_REGEX.test("T-20"); // false (negative numbers are not allowed)
 * DARTBOARD_REGEX.test("T"); // false (missing dartboard value)
 * ```
 */
const DARTBOARD_REGEX = /^([TD])(\d+)$/;

export { DARTBOARD_REGEX };
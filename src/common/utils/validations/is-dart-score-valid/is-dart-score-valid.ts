/**
 * Checks if the given dart score is valid (between 0 and 20 inclusive).
 *
 * @param dartScore - The score to validate.
 * @param allowZero - Whether a score of 0 (missed shot) is allowed. Defaults to `true`.
 * @returns `true` if the score is valid, otherwise `false`.
 *
 * @example
 * ```ts
 * isDartScoreValid(15); // true
 * isDartScoreValid(21); // false
 * isDartScoreValid(0);  // true (by default, 0 is valid)
 * isDartScoreValid(0, false); // false (0 is not valid if allowZero is false)
 * ```
 */
const isDartScoreValid = (dartScore: number, allowZero = true): boolean => {
    const scoreMinimum = allowZero ? 0 : 1; // 0 is allowed by default unless specified otherwise
    return dartScore >= scoreMinimum && dartScore <= 20;
};

export { isDartScoreValid };

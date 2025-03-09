import { generateTextStyle } from "./generate-text-style";

describe("Unit test for generateTextStyle", () => {
    test('should return disabled style when disabled is true', () => {
        expect(generateTextStyle(false, false, true)).toEqual({ color: "#939393" });
    });

    test('should return special style when isSpecial is true and not selected', () => {
        expect(generateTextStyle(true, false, false)).toEqual({ color: "#aaaaaa", fontWeight: 800 });
    });

    test('should return special selected style when isSpecial and selected are true', () => {
        expect(generateTextStyle(true, true, false)).toEqual({ color: "white", fontWeight: 800 });
    });

    test('should return empty style when all parameters are false or undefined', () => {
        expect(generateTextStyle()).toEqual({});
    });
});
import { generateButtonStyle } from "./generate-button-style";

describe("Unit test for generateButtonStyle", () => {
    test('should return disabled style when disabled is true', () => {
        expect(generateButtonStyle({ buttonSize: 50, disabled: true })).toEqual({
            width: 50,
            height: 50,
            backgroundColor: "#eaeaea"
        });
    });

    test('should return special style when isSpecial is true and not selected', () => {
        expect(generateButtonStyle({ isSpecial: true, buttonSize: 50 })).toEqual({
            width: 110,
            height: 50,
            backgroundColor: "#f8f8f8"
        });
    });

    test('should return special selected style with custom color when isSpecial and selected are true', () => {
        expect(generateButtonStyle({ isSpecial: true, buttonSize: 50, selected: true, color: "#ff0000" })).toEqual({
            width: 110,
            height: 50,
            backgroundColor: "#ff0000"
        });
    });

    test('should return default style when no special or disabled state is set', () => {
        expect(generateButtonStyle({ buttonSize: 50 })).toEqual({
            width: 50,
            height: 50
        });
    });
});


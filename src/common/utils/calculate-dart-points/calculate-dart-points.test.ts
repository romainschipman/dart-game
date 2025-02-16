import { calculateDartPoints } from "./calculate-dart-points";

describe("Unit test for calculateDartPoints", () => {
    it("should throw an error if the score exceeds the allowed limits", () => {
       expect(() => calculateDartPoints("T21")).toThrow("Invalid dartboard value: T21");
    });

    it("should throw an error for unsupported dartboard notation", () => {
        expect(() => calculateDartPoints("S12")).toThrow("Unsupported dartboard notation: S12");
    });

    it("throws an error for negative dartboard values", () => {
        expect(() => calculateDartPoints("T-1")).toThrow("Unsupported dartboard notation: T-1");
    });

    it("throws an error for non-numeric dartboard values", () => {
        expect(() => calculateDartPoints("TNaN")).toThrow("Unsupported dartboard notation: TNaN");
    });

    it.each([
        ["T12", "triple 12", 36],
        ["9", "single 9", 9],
        ["D20", "double 20", 40],
        ["DB", "double bullseye", 50],
        ["B", "bullseye", 25]
    ])("should correctly calculate the points for %s (%s)", (input, _, expected) => {
        expect(calculateDartPoints(input)).toEqual(expected);
    });
});
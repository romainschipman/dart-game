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

    it("should calculate the correct points for a dartboard", () => {
        expect(calculateDartPoints("T12")).toEqual(36);
    });

    it("should calculate the correct points for a dartboard", () => {
        expect(calculateDartPoints("9")).toEqual(9);
    });

    it("should calculate the correct points for a dartboard", () => {
        expect(calculateDartPoints("D20")).toEqual(40);
    });

    it("should calculate the correct points for a dartboard", () => {
        expect(calculateDartPoints("DB")).toEqual(50);
    });

    it("should calculate the correct points for a dartboard", () => {
        expect(calculateDartPoints("B")).toEqual(25);
    });
});
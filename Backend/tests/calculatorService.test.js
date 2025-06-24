const calculatorService = require("../services/calculatorService");

describe("CalculatorService", () => {
  describe("calculate", () => {
    test("should add two numbers", () => {
      expect(calculatorService.calculate(5, 3, "add")).toBe(8);
      expect(calculatorService.calculate(5, 3, "+")).toBe(8);
    });

    test("should subtract two numbers", () => {
      expect(calculatorService.calculate(5, 3, "subtract")).toBe(2);
      expect(calculatorService.calculate(5, 3, "-")).toBe(2);
    });

    test("should multiply two numbers", () => {
      expect(calculatorService.calculate(5, 3, "multiply")).toBe(15);
      expect(calculatorService.calculate(5, 3, "*")).toBe(15);
    });

    test("should divide two numbers", () => {
      expect(calculatorService.calculate(6, 2, "divide")).toBe(3);
      expect(calculatorService.calculate(6, 2, "/")).toBe(3);
    });

    test("should throw error for division by zero", () => {
      expect(() => calculatorService.calculate(5, 0, "divide")).toThrow(
        "Cannot divide by zero"
      );
      expect(() => calculatorService.calculate(5, 0, "/")).toThrow(
        "Cannot divide by zero"
      );
    });

    test("should throw error for unsupported operation", () => {
      expect(() => calculatorService.calculate(5, 3, "power")).toThrow(
        "Unsupported operation: power"
      );
    });

    test("should handle decimal numbers", () => {
      expect(calculatorService.calculate(5.5, 2.5, "add")).toBe(8);
      expect(calculatorService.calculate(10, 3, "divide")).toBeCloseTo(
        3.333,
        3
      );
    });
  });
});

/**
 * Calculator Service - Express.js equivalent of Spring Boot CalculatorService
 * Provides the same calculation logic as the original Java implementation
 */
class CalculatorService {
  /**
   * Performs calculation based on the provided operation
   * @param {number} num1 - First number
   * @param {number} num2 - Second number
   * @param {string} operation - Operation to perform (add, subtract, multiply, divide, +, -, *, /)
   * @returns {number} - Result of the calculation
   * @throws {Error} - If operation is unsupported or division by zero
   */
  calculate(num1, num2, operation) {
    const op = operation.toLowerCase();

    switch (op) {
      case "add":
      case "+":
        return num1 + num2;
      case "subtract":
      case "-":
        return num1 - num2;
      case "multiply":
      case "*":
        return num1 * num2;
      case "divide":
      case "/":
        if (num2 === 0) {
          throw new Error("Cannot divide by zero");
        }

        return num1 / num2;
      default:
        throw new Error(`Unsupported operation: ${operation}`);
    }
  }
}

module.exports = new CalculatorService();

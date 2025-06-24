const express = require("express");
const router = express.Router();
const calculatorService = require("../services/calculatorService");

/**
 * POST /api/calculator/calculate
 * Performs calculation based on request body
 * Same logic as Spring Boot CalculatorController.calculate()
 */
router.post("/calculate", (req, res) => {
  try {
    const { num1, num2, operation } = req.body;

    // Validate input
    if (num1 === undefined || num2 === undefined || !operation) {
      return res.status(400).json({
        result: 0.0,
        message: "Missing required fields: num1, num2, operation",
      });
    }

    // Validate numbers
    if (typeof num1 !== "number" || typeof num2 !== "number") {
      return res.status(400).json({
        result: 0.0,
        message: "num1 and num2 must be numbers",
      });
    }

    // Perform calculation using the same service logic
    const result = calculatorService.calculate(num1, num2, operation);

    // Return success response - same structure as CalculationResponse
    res.json({
      result: result,
      message: "Success",
    });
  } catch (error) {
    // Handle specific errors
    if (
      error.message.includes("Cannot divide by zero") ||
      error.message.includes("Unsupported operation")
    ) {
      return res.status(400).json({
        result: 0.0,
        message: error.message,
      });
    }

    // Handle general errors
    console.error("Calculation error:", error);
    res.status(500).json({
      result: 0.0,
      message: "An error occurred",
    });
  }
});

module.exports = router;

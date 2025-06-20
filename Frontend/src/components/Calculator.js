import React, { useState } from "react";
import axios from "axios";
import "./Calculator.css";

const Calculator = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("+");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get API URL from environment variable or use default
  const API_BASE_URL =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

  const operations = [
    { symbol: "+", name: "add" },
    { symbol: "-", name: "subtract" },
    { symbol: "*", name: "multiply" },
    { symbol: "/", name: "divide" },
  ];

  const handleCalculate = async () => {
    if (!num1 || !num2) {
      setError("Please enter both numbers");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/calculator/calculate`,
        {
          num1: parseFloat(num1),
          num2: parseFloat(num2),
          operation: operation,
        }
      );

      setResult(response.data.result);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(
          `Failed to connect to backend at ${API_BASE_URL}. Make sure the Spring Boot server is running.`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setNum1("");
    setNum2("");
    setOperation("+");
    setResult("");
    setError("");
  };

  return (
    <div className="calculator">
      <div className="calculator-container">
        <h2>Calculator</h2>

        <div className="input-group">
          <label htmlFor="num1">First Number:</label>
          <input
            type="number"
            id="num1"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="Enter first number"
            className="number-input"
          />
        </div>

        <div className="operation-selector">
          <label>Operation:</label>
          <div className="operation-buttons">
            {operations.map((op) => (
              <button
                key={op.symbol}
                onClick={() => setOperation(op.symbol)}
                className={`operation-btn ${
                  operation === op.symbol ? "active" : ""
                }`}
              >
                {op.symbol}
              </button>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="num2">Second Number:</label>
          <input
            type="number"
            id="num2"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="Enter second number"
            className="number-input"
          />
        </div>

        <div className="button-group">
          <button
            onClick={handleCalculate}
            disabled={loading}
            className="calculate-btn"
          >
            {loading ? "Calculating..." : "Calculate"}
          </button>
          <button onClick={handleClear} className="clear-btn">
            Clear
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {result !== "" && !error && (
          <div className="result">
            <h3>Result:</h3>
            <div className="result-value">{result}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;

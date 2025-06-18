import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Calculator from "./Calculator";

// Mock axios
jest.mock("axios");
const axios = require("axios");

describe("Calculator Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders calculator form", () => {
    render(<Calculator />);

    expect(screen.getByText("Calculator")).toBeInTheDocument();
    expect(screen.getByLabelText("First Number:")).toBeInTheDocument();
    expect(screen.getByLabelText("Second Number:")).toBeInTheDocument();
    expect(screen.getByText("Calculate")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  test("displays error when numbers are not entered", async () => {
    render(<Calculator />);

    const calculateButton = screen.getByText("Calculate");
    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(screen.getByText("Please enter both numbers")).toBeInTheDocument();
    });
  });

  test("performs calculation successfully", async () => {
    const mockResponse = { data: { result: 15.0, message: "Success" } };
    axios.post.mockResolvedValue(mockResponse);

    render(<Calculator />);

    const num1Input = screen.getByLabelText("First Number:");
    const num2Input = screen.getByLabelText("Second Number:");
    const calculateButton = screen.getByText("Calculate");

    fireEvent.change(num1Input, { target: { value: "10" } });
    fireEvent.change(num2Input, { target: { value: "5" } });
    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(screen.getByText("Result:")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("15")).toBeInTheDocument();
    });
  });

  test("clears form when clear button is clicked", () => {
    render(<Calculator />);

    const num1Input = screen.getByLabelText("First Number:");
    const num2Input = screen.getByLabelText("Second Number:");
    const clearButton = screen.getByText("Clear");

    fireEvent.change(num1Input, { target: { value: "10" } });
    fireEvent.change(num2Input, { target: { value: "5" } });

    expect(num1Input.value).toBe("10");
    expect(num2Input.value).toBe("5");

    fireEvent.click(clearButton);

    expect(num1Input.value).toBe("");
    expect(num2Input.value).toBe("");
  });
});

package com.eventspark.calculator.service;

import org.springframework.stereotype.Service;

@Service
public class CalculatorService {

    public double calculate(double num1, double num2, String operation) {
        switch (operation.toLowerCase()) {
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
                if (num2 == 0) {
                    throw new IllegalArgumentException("Cannot divide by zero");
                }
                return num1 / num2;
            default:
                throw new IllegalArgumentException("Unsupported operation: " + operation);
        }
    }
} 
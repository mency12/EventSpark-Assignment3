package com.eventspark.calculator.model;

public class CalculationResponse {
    private double result;
    private String message;

    public CalculationResponse() {}

    public CalculationResponse(double result, String message) {
        this.result = result;
        this.message = message;
    }

    public double getResult() {
        return result;
    }

    public void setResult(double result) {
        this.result = result;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
} 
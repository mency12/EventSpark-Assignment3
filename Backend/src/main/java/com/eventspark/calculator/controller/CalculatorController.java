package com.eventspark.calculator.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventspark.calculator.model.CalculationRequest;
import com.eventspark.calculator.model.CalculationResponse;
import com.eventspark.calculator.service.CalculatorService;

@RestController
@RequestMapping("/api/calculator")
public class CalculatorController {

    @Autowired
    private CalculatorService calculatorService;

    @PostMapping("/calculate")
    public ResponseEntity<CalculationResponse> calculate(@RequestBody CalculationRequest request) {
        try {
            double result = calculatorService.calculate(request.getNum1(), request.getNum2(), request.getOperation());
            return ResponseEntity.ok(new CalculationResponse(result, "Success"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new CalculationResponse(0.0, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new CalculationResponse(0.0, "An error occurred"));
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Calculator Backend is running!");
    }
} 

package com.eventspark.calculator.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class CalculatorServiceTest {

    private CalculatorService calculatorService;
    //Test
    @BeforeEach
    void setUp() {
        calculatorService = new CalculatorService();
    }

    @Test
    void testAddition() {
        double result = calculatorService.calculate(5.0, 3.0, "+");
        assertEquals(8.0, result);
    }

    @Test
    void testSubtraction() {
        double result = calculatorService.calculate(10.0, 4.0, "-");
        assertEquals(6.0, result);
    }

    @Test
    void testMultiplication() {
        double result = calculatorService.calculate(6.0, 7.0, "*");
        assertEquals(42.0, result);
    }

    @Test
    void testDivision() {
        double result = calculatorService.calculate(15.0, 3.0, "/");
        assertEquals(5.0, result);
    }

    @Test
    void testDivisionByZero() {
        assertThrows(IllegalArgumentException.class, () -> {
            calculatorService.calculate(10.0, 0.0, "/");
        });
    }

    @Test
    void testInvalidOperation() {
        assertThrows(IllegalArgumentException.class, () -> {
            calculatorService.calculate(10.0, 5.0, "invalid");
        });
    }
} 

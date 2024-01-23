package com.example.deterministicmodelslotsizing.main;

import com.example.deterministicmodelslotsizing.controller.WagnerWhitinController;
import com.example.deterministicmodelslotsizing.wagnerwhitin.WagnerWhitinRequest;
import com.example.deterministicmodelslotsizing.wagnerwhitin.WagnerWhitinResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class WagnerWhitinControllerTest {

    private WagnerWhitinController controller;
    private WagnerWhitinRequest request;
    private WagnerWhitinResponse response;

    @BeforeEach
    void setUp() {
        // Initialisierung des Controllers
        controller = new WagnerWhitinController();

        // Initialisierung der Request-Daten
        int[] demands = {20, 50, 10, 50, 50, 10, 20, 40, 20, 30};
        int holdingCostPerUnitPerPeriod = 1;
        int orderCost = 100;
        request = new WagnerWhitinRequest();
        request.setDemands(demands);
        request.setHoldingCostPerUnitPerPeriod(holdingCostPerUnitPerPeriod);
        request.setOrderCost(orderCost);

        // Erzeugen der Response
        response = controller.calculate(request).getBody();
        assertNotNull(response, "Die Antwort sollte nicht null sein.");
    }

    @Test
    void validateTotalCost() {
        System.out.println("Überprüfe TotalCost...");
        String expectedTotalCost = "[100, 150, 170, 270, 320, 340, 400, 480, 520, 580]";
        assertEquals(expectedTotalCost, response.getTotalCostString(), "TotalCost sollte korrekt sein.");
    }

    @Test
    void validateOrderSchedule() {
        System.out.println("Überprüfe OrderSchedule...");
        String expectedOrderSchedule = "[0, 0, 0, 3, 3, 3, 3, 6, 6, 7]";
        assertEquals(expectedOrderSchedule, response.getOrderScheduleString(), "OrderSchedule sollte korrekt sein.");
    }

    @Test
    void validateCostMatrix() {
        System.out.println("Überprüfe CostMatrix...");
        String expectedCostMatrix = "[[100, 150, 170, 320, 0, 0, 0, 0, 0, 0], [0, 200, 210, 310, 0, 0, 0, 0, 0, 0], [0, 0, 250, 300, 0, 0, 0, 0, 0, 0], [0, 0, 0, 270, 320, 340, 400, 560, 0, 0], [0, 0, 0, 0, 370, 380, 420, 540, 0, 0], [0, 0, 0, 0, 0, 420, 440, 520, 0, 0], [0, 0, 0, 0, 0, 0, 440, 480, 0, 0], [0, 0, 0, 0, 0, 0, 0, 500, 520, 580], [0, 0, 0, 0, 0, 0, 0, 0, 580, 610], [0, 0, 0, 0, 0, 0, 0, 0, 0, 620]]";
        assertEquals(expectedCostMatrix, response.getCostMatrixString(), "CostMatrix sollte korrekt sein.");
    }
}

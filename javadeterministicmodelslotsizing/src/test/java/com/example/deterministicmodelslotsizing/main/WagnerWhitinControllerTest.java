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
        // Initializing the controller
        controller = new WagnerWhitinController();

        // Initializing the request
        int[] demands = {20, 50, 10, 50, 50, 10, 20, 40, 20, 30};
        int holdingCostPerUnitPerPeriod = 1;
        int orderCost = 100;
        request = new WagnerWhitinRequest();
        request.setDemands(demands);
        request.setHoldingCostPerUnitPerPeriod(holdingCostPerUnitPerPeriod);
        request.setOrderCost(orderCost);

        // Initializing the response
        response = controller.calculate(request).getBody();
        assertNotNull(response, "Answer shouldn't be null");
    }

    @Test
    void validateTotalCost() {
        System.out.println("Testing TotalCost...");
        String expectedTotalCost = "[100, 150, 170, 270, 320, 340, 400, 480, 520, 580]";
        assertEquals(expectedTotalCost, response.getTotalCostString(), "TotalCost is correct.");
    }

    @Test
    void validateOrderSchedule() {
        System.out.println("Testing OrderSchedule...");
        String expectedOrderSchedule = "[0, 0, 0, 3, 3, 3, 3, 6, 6, 7]";
        assertEquals(expectedOrderSchedule, response.getOrderScheduleString(), "OrderSchedule is correct.");
    }

    @Test
    void validateCostMatrix() {
        System.out.println("Testing CostMatrix...");
        String expectedCostMatrix = "[[100, 150, 170, 320, 0, 0, 0, 0, 0, 0], [0, 200, 210, 310, 0, 0, 0, 0, 0, 0], [0, 0, 250, 300, 0, 0, 0, 0, 0, 0], [0, 0, 0, 270, 320, 340, 400, 560, 0, 0], [0, 0, 0, 0, 370, 380, 420, 540, 0, 0], [0, 0, 0, 0, 0, 420, 440, 520, 0, 0], [0, 0, 0, 0, 0, 0, 440, 480, 0, 0], [0, 0, 0, 0, 0, 0, 0, 500, 520, 580], [0, 0, 0, 0, 0, 0, 0, 0, 580, 610], [0, 0, 0, 0, 0, 0, 0, 0, 0, 620]]";
        assertEquals(expectedCostMatrix, response.getCostMatrixString(), "CostMatrix is correct");
    }
}

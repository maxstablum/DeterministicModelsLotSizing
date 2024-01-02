package com.example.deterministicmodelslotsizing.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.deterministicmodelslotsizing.wagnerwhitin.WagnerWhitinAlgorithm;

@RestController
public class WagnerWhitinController {

    @PostMapping("/wagner_whitin/calculation")
    public WagnerWhitinResponse calculate(@RequestBody WagnerWhitinRequest request) {
        WagnerWhitinAlgorithm algorithm = new WagnerWhitinAlgorithm(
                request.getDemands(),
                request.getHoldingCostPerUnitPerPeriod(),
                request.getOrderCost()
        );
        algorithm.calculate();

        return new WagnerWhitinResponse(
                algorithm.getTotalCost(),
                algorithm.getOrderSchedule(),
                algorithm.getCostMatrix()
        );
    }
}

class WagnerWhitinRequest {
    private int[] demands;
    private int holdingCostPerUnitPerPeriod;
    private int orderCost;

    // Getters
    public int[] getDemands() {
        return demands;
    }

    public int getHoldingCostPerUnitPerPeriod() {
        return holdingCostPerUnitPerPeriod;
    }

    public int getOrderCost() {
        return orderCost;
    }

    // Setters
    public void setDemands(int[] demands) {
        this.demands = demands;
    }

    public void setHoldingCostPerUnitPerPeriod(int holdingCostPerUnitPerPeriod) {
        this.holdingCostPerUnitPerPeriod = holdingCostPerUnitPerPeriod;
    }

    public void setOrderCost(int orderCost) {
        this.orderCost = orderCost;
    }
}

class WagnerWhitinResponse {
    private int[] totalCost;
    private int[] orderSchedule;
    private int[][] costMatrix;

    // Constructor
    public WagnerWhitinResponse(int[] totalCost, int[] orderSchedule, int[][] costMatrix) {
        this.totalCost = totalCost;
        this.orderSchedule = orderSchedule;
        this.costMatrix = costMatrix;
    }

}

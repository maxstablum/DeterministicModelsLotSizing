package com.example.deterministicmodelslotsizing.wagnerwhitin;
/**
 * Class to handle request for the communication between the frontend and the backend
 * @Author Tamino Gaub & Maximilian Stablum
 */
public class WagnerWhitinRequest {

    // Attributes
    private int[] demands;
    private int holdingCostPerUnitPerPeriod;
    private int orderCost;

    // Getters (Necessary for application/json)
    public int[] getDemands() {
        return demands;
    }

    public int getHoldingCostPerUnitPerPeriod() {
        return holdingCostPerUnitPerPeriod;
    }

    public int getOrderCost() {
        return orderCost;
    }

    // Setters (Necessary for application/json)
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

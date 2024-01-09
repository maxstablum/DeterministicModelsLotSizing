package com.example.deterministicmodelslotsizing.wagnerwhitin;

import java.util.Arrays;
/**
 * Class to handle response for the communication between the frontend and the backend
 * @Author Tamino Gaub & Maximilian Stablum
 */
@SuppressWarnings("unused")
public class WagnerWhitinResponse {

    // Attributes
    private int[] totalCost;
    private int[] orderSchedule;
    private int[][] costMatrix;
    private int[] productionPeriods;

    // Constructor
    public WagnerWhitinResponse(int[] totalCost, int[] orderSchedule, int[][] costMatrix, int[] productionPeriods) {
        this.totalCost = totalCost;
        this.orderSchedule = orderSchedule;
        this.costMatrix = costMatrix;
        this.productionPeriods = productionPeriods;
    }

    // Getters (Necessary for application/json)
    public int[] getTotalCost() {
        return totalCost;
    }

    public int[] getOrderSchedule() {
        return orderSchedule;
    }

    public int[][] getCostMatrix() {
        return costMatrix;
    }

    // Setters (Necessary for application/json)
    public void setTotalCost(int[] totalCost) {
        this.totalCost = totalCost;
    }

    public void setOrderSchedule(int[] orderSchedule) {
        this.orderSchedule = orderSchedule;
    }

    public void setCostMatrix(int[][] costMatrix) {
        this.costMatrix = costMatrix;
    }

    public int[] getProductionPeriods() {
        return productionPeriods;
    }

    public void setProductionPeriods(int[] productionPeriods) {
        this.productionPeriods = productionPeriods;
    }

    // toString method
    @Override
    public String toString() {
        String totalCostStr = Arrays.toString(totalCost);
        String orderScheduleStr = Arrays.toString(orderSchedule);
        String costMatrixStr = Arrays.deepToString(costMatrix);

        // Constructing the final string
        return "WagnerWhitinResponse{" +
                "totalCost=" + totalCostStr +
                ", orderSchedule=" + orderScheduleStr +
                ", costMatrix=" + costMatrixStr +
                '}';
    }

}

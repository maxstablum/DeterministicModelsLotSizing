package com.example.deterministicmodelslotsizing.wagnerwhitin;

import java.util.Arrays;

public class WagnerWhitinResponse {
    private int[] totalCost;
    private int[] orderSchedule;
    private int[][] costMatrix;

    // Constructor
    public WagnerWhitinResponse(int[] totalCost, int[] orderSchedule, int[][] costMatrix) {
        this.totalCost = totalCost;
        this.orderSchedule = orderSchedule;
        this.costMatrix = costMatrix;
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

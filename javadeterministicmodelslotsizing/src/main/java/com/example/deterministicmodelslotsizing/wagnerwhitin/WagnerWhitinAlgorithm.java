package com.example.deterministicmodelslotsizing.wagnerwhitin;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Class to calculate thr Wagner-Whitin algorithm
 * @author    Tamino Gaub & Maximilian Stablum
 */
public class WagnerWhitinAlgorithm {

    private int[] demands;
    private int holdingCostPerUnitPerPeriod;
    private int orderCost;
    private int[] totalCost;
    private int[] orderSchedule;
    private int[][] costMatrix;
    private int[] productionPeriods;


    public WagnerWhitinAlgorithm(int[] demands, int holdingCostPerUnitPerPeriod, int orderCost) {
        this.holdingCostPerUnitPerPeriod = holdingCostPerUnitPerPeriod;
        this.orderCost = orderCost;
        this.demands = demands.clone();
        this.totalCost = new int[demands.length];
        this.orderSchedule = new int[demands.length];
        this.costMatrix = new int[demands.length][demands.length];
    }
    public void calculate() {
        // Set every value in totalCost array to the largest number an integer can have.
        // This is done to later identify the minimum costs effectively.
        Arrays.fill(totalCost, Integer.MAX_VALUE);

        // Set every value in orderSchedule array to -1, indicating that no production schedule has been set.
        Arrays.fill(orderSchedule, -1);

        // Fill the first row of the cost matrix with the cost of starting production in the first week
        // and carrying inventory for all following weeks.

        for (int j = 0; j < demands.length; j++) {
            // If it's the very first cell, it's just the order cost. Otherwise, it's the cost of the previous cell
            // plus the holding cost for the current demand.
            costMatrix[0][j] = (j == 0 ? orderCost : costMatrix[0][j - 1]) + demands[j] * holdingCostPerUnitPerPeriod * j;
            // Update total cost for the week with the value from the cost matrix.
            totalCost[j] = costMatrix[0][j];
            // Set the production start week to 0 as we're considering production starts in the first week.
            orderSchedule[j] = 0;
        }
        for (int z = 0;z< demands.length;z++){

        }

        // Check each period, starting from week 1 onwards, to see if it's cheaper to start production there.
        for (int startWeek = 1; startWeek < demands.length; startWeek++) {
            // For each starting week, we consider ending weeks up to the end of the demand array.
            for (int endWeek = startWeek; endWeek < demands.length; endWeek++) {
                int holdingCost = 0;
                // Calculate holding costs for all products held from the start week to the current end week.
                for (int week = startWeek; week <= endWeek; week++) {
                    holdingCost += demands[week] * holdingCostPerUnitPerPeriod * (week - startWeek);
                }
                // The cost for this order is the sum of ordering cost and the holding cost calculated above.
                int costForThisOrder = orderCost + holdingCost;
                // Update the cost matrix with the total cost if we start production in startWeek.
                costMatrix[startWeek][endWeek] = costForThisOrder + (startWeek > 0 ? totalCost[startWeek - 1] : 0);

                // If the newly calculated cost is cheaper than the current total cost for the endWeek,
                // update the total cost and the order schedule.
                if (totalCost[endWeek] > costMatrix[startWeek][endWeek]) {
                    totalCost[endWeek] = costMatrix[startWeek][endWeek];
                    orderSchedule[endWeek] = startWeek;
                }
            }
        }

        // Print the cost matrix and the order schedule.
        printCostMatrix();
    }

    /**public void calculate() {
        Arrays.fill(totalCost, Integer.MAX_VALUE);
        Arrays.fill(orderSchedule, -1);

        for (int j = 0; j < demands.length; j++) {
            costMatrix[0][j] = (j == 0 ? orderCost : costMatrix[0][j - 1]) + demands[j] * holdingCostPerUnitPerPeriod * j;
            totalCost[j] = costMatrix[0][j];
            orderSchedule[j] = 0;
        }

        for (int startWeek = 1; startWeek < demands.length; startWeek++) {
            for (int endWeek = startWeek; endWeek < demands.length; endWeek++) {
                int holdingCost = 0;
                for (int week = startWeek; week <= endWeek; week++) {
                    holdingCost += demands[week] * holdingCostPerUnitPerPeriod * (week - startWeek);
                }
                int costForThisOrder = orderCost + holdingCost;
                costMatrix[startWeek][endWeek] = costForThisOrder + (startWeek > 0 ? totalCost[startWeek - 1] : 0);

                if (totalCost[endWeek] > costMatrix[startWeek][endWeek]) {
                    totalCost[endWeek] = costMatrix[startWeek][endWeek];
                    orderSchedule[endWeek] = startWeek;
                }
            }
        }

        // Post-calculation adjustment of the cost matrix
        for (int currentPeriod = 1; currentPeriod < demands.length; currentPeriod++) {
            // Check if production occurs in the current period and it's not the first one
            System.out.println("Currently checking: " + currentPeriod);
            if (orderSchedule[currentPeriod] == currentPeriod) {
                // Set costs to zero for all following periods until the next production period
                int nextProductionPeriod = currentPeriod + 1;
                System.out.println("Checking: " + orderSchedule[currentPeriod]);
                while (nextProductionPeriod < demands.length && orderSchedule[nextProductionPeriod] != nextProductionPeriod) {
                    nextProductionPeriod++;
                }

                for (int j = currentPeriod + 1; j < nextProductionPeriod; j++) {
                    for (int i = 0; i < currentPeriod; i++) {
                        costMatrix[i][j] = 0;
                        System.out.println("Savas: " + costMatrix[i][j]);

                    }
                }
            }
        }

        // Print the cost matrix and the order schedule.
        printCostMatrix();
    }*/




    private void printCostMatrix() {
        // Print an empty space to align the header of the table.
        System.out.printf("%-16s", "          ");

        // Print the header row with the planning horizon numbers (1 to the number of demands).
        for (int t = 1; t <= demands.length; t++) {
            System.out.printf("%-5d", t);
        }
        System.out.println(); // Move to the next line.

        // Go through each 'last week with production' (i.e., each row in the cost matrix).
        for (int i = 0; i < demands.length; i++) {
            // Print the 'last week with production' number, starting at 1.
            System.out.printf("%-16d", i + 1);
            // Print the cost for fulfilling demand from 'last week with production' until each week in the horizon.
            for (int j = 0; j < demands.length; j++) {
                // If we haven't reached the 'last week with production' yet, print 0; otherwise, print the cost.
                System.out.printf("%-5d", (j < i) ? 0 : costMatrix[i][j]);
            }
            System.out.println(); // Move to the next line after printing all costs for the row.
        }

        // Print the minimum total costs (Z*_t) after all calculations are done.
        System.out.printf("%-16s", "Z*_t");
        for (int cost : totalCost) {
            System.out.printf("%-5d", cost);
        }
        System.out.println(); // Move to the next line.

        // Print the best 'last week with production' (J*_t) for each week in the planning horizon.
        System.out.printf("%-16s", "J*_t");
        for (int j : orderSchedule) {
            // The week numbers are 0-indexed internally, so add 1 to display them in a 1-indexed fashion.
            System.out.printf("%-5d", j + 1);
        }
        System.out.println(); // Move to the next line after printing the entire row.
    }

    // Getters
    public int[] getTotalCost() {
        return totalCost;
    }

    public int[] getOrderSchedule() {
        return orderSchedule;
    }

    public int[][] getCostMatrix() {
        return costMatrix;
    }
}

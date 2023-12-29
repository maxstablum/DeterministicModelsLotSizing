package com.example.deterministicmodelslotsizing.eoq;
public class EOQ {

    double weeklyDemand;
    int weeksPerYear;
    double D;
    int A;
    int h;
    double optimalQ;


public double eoqMethod(double setWeeklyDemand, int setWeeksPerYear, int setA, int setH){
    weeklyDemand = setWeeklyDemand;
    weeksPerYear = setWeeksPerYear;
    A = setA;
    h = setH;
    D = weeklyDemand * weeksPerYear;
    System.out.println("Anual demand D: " + D);
    optimalQ = Math.sqrt((2*A*D)/h);
    System.out.println("economic order quantity EOQ is: " + optimalQ);
    return optimalQ;
}
//Different option: mange via setters


    public void setD(double d) {
        D = d;
    }

    public double getOptimalQ() {
        return optimalQ;
    }

    //Idea: Check first all three values (demand, A, h) and check afterwards for the most sensitive one
    public String sensitivityAnalysis(){
    EOQ sensitivityCalculator = new EOQ();
    String message = "Error";
    if (optimalQ == 0.0){
        message = "EOQ has not yet been calculated. Please insert values.";
    }
    else {
        sensitivityCalculator.eoqMethod(weeklyDemand, weeksPerYear, A, h);
        sensitivityCalculator.setD(D+1);
        if (optimalQ/sensitivityCalculator.getOptimalQ() < 1) {
            message = "The demand is the most sensitive parameter. If the demand increase Q decrease.";
            System.out.println("Demand Sens:" + sensitivityCalculator.getOptimalQ());
        } else if (sensitivityCalculator.eoqMethod(weeklyDemand, weeksPerYear, A+1, h)/optimalQ < 1) {
            message = "The set-up costs are the most sensitive parameter. If the set-up costs increase Q decrease.";
            System.out.println("set-up sens:" + sensitivityCalculator.getOptimalQ());
        } else if (sensitivityCalculator.eoqMethod(weeklyDemand, weeksPerYear, A, h+1) / optimalQ < 1) {
            message = "The holding costs are the most sensitive parameter. If the holding cost increase Q decrease.";
            System.out.println("holding sens" + sensitivityCalculator.getOptimalQ());
        }
    }

    return message;
    }

}

package com.example.deterministicmodelslotsizing.eoq;

    /*
    * Class to calculate the EOQ
    * @Author Tamino Gaub & Maximilian Stablum
    */
public class EOQ {

    //Attributes:
    double weeklyDemand;
    int weeksPerYear;
    double D;
    int aSetup;
    int h;
    double optimalQ;

    //Constructor 
    public double eoqMethod(double setWeeklyDemand, int setWeeksPerYear, int setA, int setH){
        weeklyDemand = setWeeklyDemand;
        weeksPerYear = setWeeksPerYear;
        aSetup = setA;
        h = setH;
        D = weeklyDemand * weeksPerYear;
        System.out.println("Anual demand D: " + D);
        optimalQ = Math.sqrt((2* aSetup *D)/h);
        System.out.println("economic order quantity EOQ is: " + optimalQ);
        return optimalQ;
    }
    //Different option: mange via setters and getters
        //Getters & Setters:
        public void setD(double d) {
            D = d;
        }

        //Setters
        public void setWeeklyDemand(double weeklyDemand) {
            this.weeklyDemand = weeklyDemand;
        }

        public void setWeeksPerYear(int weeksPerYear) {
            this.weeksPerYear = weeksPerYear;
        }

        public void setaSetup(int aSetup) {
            this.aSetup = aSetup;
        }

        public void setH(int h) {
            this.h = h;
        }

        public void setOptimalQ(double optimalQ) {
            this.optimalQ = optimalQ;
        }

        //Getters
        public double getOptimalQ() {
            return optimalQ;
        }

        public double getWeeklyDemand() {
            return weeklyDemand;
        }

        public int getWeeksPerYear() {
            return weeksPerYear;
        }

        public double getD() {
            return D;
        }

        public int getH() {
            return h;
        }

        public int getaSetup() {
            return aSetup;
        }

        //Idea: Check first all three values (demand, A, h) and check afterwards for the most sensitive one
        public String sensitivityAnalysis(){
            EOQ sensitivityCalculator = new EOQ();
            String message = "Error";
            if (optimalQ == 0.0){
                message = "EOQ has not yet been calculated. Please insert values.";
            }
            else {
                sensitivityCalculator.eoqMethod(weeklyDemand, weeksPerYear, aSetup, h);
                sensitivityCalculator.setD(D+1);
                    // Demand sens
                if (optimalQ/sensitivityCalculator.getOptimalQ() < 1) {
                    message = "The demand is the most sensitive parameter. If the demand increase Q decrease.";
                    System.out.println("Demand Sens:" + sensitivityCalculator.getOptimalQ());
                    // Set-up sens
                } else if (sensitivityCalculator.eoqMethod(weeklyDemand, weeksPerYear, aSetup +1, h)/optimalQ < 1) {
                    message = "The set-up costs are the most sensitive parameter. If the set-up costs increase Q decrease.";
                    System.out.println("set-up sens:" + sensitivityCalculator.getOptimalQ());
                    // Holding send
                } else if (sensitivityCalculator.eoqMethod(weeklyDemand, weeksPerYear, aSetup, h+1) / optimalQ < 1) {
                    message = "The holding costs are the most sensitive parameter. If the holding cost increase Q decrease.";
                    System.out.println("holding sens" + sensitivityCalculator.getOptimalQ());
                }
            }

            return message;
        }

}

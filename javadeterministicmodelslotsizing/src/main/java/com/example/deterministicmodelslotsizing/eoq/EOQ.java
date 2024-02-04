package com.example.deterministicmodelslotsizing.eoq;

    /*
    * Class to calculate the EOQ
    * @Author Tamino Gaub & Maximilian Stablum
    */
public class EOQ {

    //Attributes:
    double averageDemand;
    double aSetup;
    double h;
    double optimalQ;

    //Method to calculate the EOQ
    public long eoqMethod(double setDemand, double setA, double setH){
        averageDemand = setDemand;
        aSetup = setA;
        h = setH;
        optimalQ = Math.sqrt((2* aSetup * averageDemand)/h);
        System.out.println("Economic order quantity EOQ is: " + optimalQ);
        return Math.round(optimalQ);
    }
        //Getters & Setters:
        public void setAverageDemand(double averageDemand) {
            this.averageDemand = averageDemand;
        }

        //Setters
        public void setaSetup(double aSetup) {
            this.aSetup = aSetup;
        }

        public void setH(double h) {
            this.h = h;
        }

        public void setOptimalQ(double optimalQ) {
            this.optimalQ = optimalQ;
        }

        //Getters
        public double getOptimalQ() {
            return optimalQ;
        }

        public double getAverageDemand() {
            return averageDemand;
        }

        public double getH() {
            return h;
        }

        public double getaSetup() {
            return aSetup;
        }

}

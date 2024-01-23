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

    //Constructor 
    public long eoqMethod(double setDemand, double setA, double setH){
        averageDemand = setDemand;
        aSetup = setA;
        h = setH;
        System.out.println("Anual demand D: " + averageDemand);
        optimalQ = Math.sqrt((2* aSetup * averageDemand)/h);
        System.out.println("Economic order quantity EOQ is: " + optimalQ);
        System.out.println("Rounded economic order quantity EOQ is: " + Math.round(optimalQ));
        return Math.round(optimalQ);
    }
    //Different option: mange via setters and getters
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

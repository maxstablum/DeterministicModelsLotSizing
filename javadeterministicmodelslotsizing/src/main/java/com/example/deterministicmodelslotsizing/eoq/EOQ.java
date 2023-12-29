package com.example.deterministicmodelslotsizing.eoq;

import java.util.Scanner;
public class EOQ {

public void eoqMethod(){

    Scanner Ob1 = new Scanner(System.in);

    System.out.println("Enter weekly demand:");
    double weeklyDemand = Ob1.nextInt();

    System.out.println("Working weeks per year (usually: 52):");
    int weeksPerYear = Ob1.nextInt();

    double D = weeklyDemand * weeksPerYear;

    System.out.println("Anual demand D:" + D);


    System.out.println("Enter set up cost A:");
    int A = Ob1.nextInt();

    System.out.println("Enter holding cost h:");
    int h = Ob1.nextInt();

    double optimalQ = Math.sqrt((2*A*D)/h);;

    System.out.println("economic order quantity EOQ is: " + optimalQ);

}

}

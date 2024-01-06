package com.example.deterministicmodelslotsizing.controller;

import com.example.deterministicmodelslotsizing.eoq.EOQ;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Class to handle the communication between the frontend and the backend for the EOQ algorithm
 * @author    Tamino Gaub & Maximilian Stablum
 */
@RestController
public class EOQController {
    // Method to handle the POST request for the EOQ algorithm
        @PostMapping("eoq/calculation")
        public double calculate(@RequestBody EOQ request) {
            // Response generation based on the RequestBody
            System.out.println("getA: " + request.getaSetup());
            // Calculate the EOQ with help of the algorithm
            EOQ eoq = new EOQ();
            double result = eoq.eoqMethod(
                    request.getWeeklyDemand(),
                    request.getWeeksPerYear(),
                    request.getaSetup(),
                    request.getH()
            );
            // Return the response to the console
            System.out.println("This is the calculated result: " + result);
            return result;
        }
    }

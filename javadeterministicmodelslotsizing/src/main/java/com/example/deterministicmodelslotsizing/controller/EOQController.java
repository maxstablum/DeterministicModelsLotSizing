package com.example.deterministicmodelslotsizing.controller;

import com.example.deterministicmodelslotsizing.eoq.EOQ;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Class to handle the communication between the frontend and the backend for the EOQ algorithm
 *
 * @author    Tamino Gaub & Maximilian Stablum
 */
@RestController
public class EOQController {
    // Method to handle the POST request for the EOQ algorithm
        @PostMapping("eoq/calculation")
        public ResponseEntity<Double> calculate(@RequestBody EOQ request) {
            // Response generation based on the RequestBody
            System.out.println("getA: " + request.getaSetup());
            System.out.println("getD: " + request.getAverageDemand());
            System.out.println("getH: " + request.getH());

            // Check if any of the values is <= 0
            if (request.getaSetup() <= 0 || request.getAverageDemand() <= 0 || request.getH() <= 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }

            // Calculate the EOQ with help of the algorithm
            EOQ eoq = new EOQ();
            double result = eoq.eoqMethod(
                    request.getAverageDemand(),
                    request.getaSetup(),
                    request.getH()
            );
            // Return the response to the console
            System.out.println("Rounded result for frontend: " + result);

            // Return the result with HTTP Status 200 (OK)
            return ResponseEntity.ok(result);
        }
    }

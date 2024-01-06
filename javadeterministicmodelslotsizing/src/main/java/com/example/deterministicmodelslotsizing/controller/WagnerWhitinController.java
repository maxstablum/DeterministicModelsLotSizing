package com.example.deterministicmodelslotsizing.controller;

import com.example.deterministicmodelslotsizing.wagnerwhitin.WagnerWhitinRequest;
import com.example.deterministicmodelslotsizing.wagnerwhitin.WagnerWhitinResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.example.deterministicmodelslotsizing.wagnerwhitin.WagnerWhitinAlgorithm;
import org.springframework.http.ResponseEntity;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Class to handle the communication between the frontend and the backend for the Wagner Whitin algorithm
 * @author    Tamino Gaub & Maximilian Stablum
 */
@RestController
public class WagnerWhitinController {
    // Logger for the class
    private static final Logger log = LoggerFactory.getLogger(WagnerWhitinController.class);

    // Method to handle the POST request for the Wagner Whitin algorithm
    @PostMapping(path = "/wagner_whitin/calculation", consumes = "application/json", produces = "application/json")
    public ResponseEntity<WagnerWhitinResponse> calculate(@RequestBody WagnerWhitinRequest request) {
        try {
            // Response generation based on the RequestBody
            WagnerWhitinAlgorithm algorithm = new WagnerWhitinAlgorithm(
                    request.getDemands(),
                    request.getHoldingCostPerUnitPerPeriod(),
                    request.getOrderCost()
            );
            // Calculate the Wagner Whitin with help of the algorithm
            algorithm.calculate();
            // Map the values into the response format
            WagnerWhitinResponse response = new WagnerWhitinResponse(
                    algorithm.getTotalCost(),
                    algorithm.getOrderSchedule(),
                    algorithm.getCostMatrix(),
                    algorithm.getProductionPeriods()
            );
            // Return the response
            log.info("Calculation successful for request: {}", response);
            // Return the response with the status code 201
            ResponseEntity responseEntity = new ResponseEntity<>(response, HttpStatus.CREATED);
            return responseEntity;
        } catch (Exception e) {
            // Return the response with the status code 500
            log.error("Error during calculation: ", e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}



package com.example.deterministicmodelslotsizing.controller;

import com.example.deterministicmodelslotsizing.wagnerwhitin.WagnerWhitinRequest;
import com.example.deterministicmodelslotsizing.wagnerwhitin.WagnerWhitinResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.example.deterministicmodelslotsizing.wagnerwhitin.WagnerWhitinAlgorithm;
import org.springframework.http.ResponseEntity;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class WagnerWhitinController {
    private static final Logger log = LoggerFactory.getLogger(WagnerWhitinController.class);

    @PostMapping(path = "/wagner_whitin/calculation", consumes = "application/json", produces = "application/json")
    public ResponseEntity<WagnerWhitinResponse> calculate(@RequestBody WagnerWhitinRequest request) {
        try {
            // Response generation based on the RequestBody
            WagnerWhitinAlgorithm algorithm = new WagnerWhitinAlgorithm(
                    request.getDemands(),
                    request.getHoldingCostPerUnitPerPeriod(),
                    request.getOrderCost()
            );
            // Calculate the Wagner Whitin
            algorithm.calculate();
            // Map the values into the response format
            WagnerWhitinResponse response = new WagnerWhitinResponse(
                    algorithm.getTotalCost(),
                    algorithm.getOrderSchedule(),
                    algorithm.getCostMatrix()
            );
            log.info("Calculation successful for request: {}", response);
            ResponseEntity responseEntity = new ResponseEntity<>(response, HttpStatus.CREATED);
            log.info(String.valueOf(responseEntity));
            return responseEntity;
        } catch (Exception e) {
            log.error("Error during calculation: ", e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}



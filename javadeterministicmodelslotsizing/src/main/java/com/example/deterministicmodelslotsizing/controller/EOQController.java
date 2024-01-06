package com.example.deterministicmodelslotsizing.controller;

import com.example.deterministicmodelslotsizing.eoq.EOQ;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class EOQController {
        @PostMapping("eoq/calculation")
        public double calculate(@RequestBody EOQ request) {
            System.out.println("getA: " + request.getaSetup());
            EOQ eoq = new EOQ();
            double result = eoq.eoqMethod(
                    request.getWeeklyDemand(),
                    request.getWeeksPerYear(),
                    request.getaSetup(),
                    request.getH()
            );
            System.out.println("This is the calculated result: " + result);
            //return new EOQ().eoqMethod(19, 52, 45, 15);
            return result;
        }
    }

package com.example.deterministicmodelslotsizing.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class NumberController {
    @GetMapping("/calculation/{num1}/{num2}")
    public int basicCalculation(@PathVariable("num1") int num1, @PathVariable("num2") int num2){
        return num1*num2;
    }

    @RequestMapping("/servus")
    public String helloWorld(){
        return "Hello World";
    }
}

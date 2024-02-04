package com.example.deterministicmodelslotsizing.main;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.fasterxml.jackson.databind.ObjectMapper;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.deterministicmodelslotsizing.eoq.EOQ;
import com.example.deterministicmodelslotsizing.controller.EOQController;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

/**
 * A simple testing class for all EOQ related classes and methods.
 *
 * @author   Tamino Gaub & Maximilian Stablum
 *
 */

@SpringBootTest
@AutoConfigureMockMvc
public class EOQControllerTest {

    @MockBean
    private EOQController eoqController;

    @Autowired
    private MockMvc mvc;

    private EOQ eoq;

    //Creates a new EOQ element before each test will start.
    @BeforeEach
    void setUp() throws Exception {
        // Calculate the EOQ with help of the algorithm
        eoq = new EOQ();

    }

    @Test
    void testCreateEOQ() throws Exception {
        this.eoq.eoqMethod(988, 45, 15);
        given(eoqController.calculate(any(EOQ.class))).willReturn(ResponseEntity.ok(77.0));

        // When/Then
        this.mvc.perform(post("/eoq/calculation")
                        .content(new ObjectMapper().writeValueAsString(eoq))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("77.0"));
    }

    @Test
    void testInvalidInput() throws Exception {
        given(eoqController.calculate(any(EOQ.class))).willReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null));

        // When/Then
        this.mvc.perform(post("/eoq/calculation")
                        .content(new ObjectMapper().writeValueAsString(eoq))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCalculateEoq() throws Exception {
        // Some simple calculation methods
        assertEquals(77, this.eoq.eoqMethod(988, 45, 15), "Calculation 1 is correct.");
        assertEquals(28, this.eoq.eoqMethod(1000, 2, 5), "Calculation 2 is correct.");
        assertEquals(1, eoq.eoqMethod(1, 1, 1),"Calculation 3 is correct.");
    }
}

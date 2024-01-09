package com.example.deterministicmodelslotsizing;
import java.util.Arrays;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import com.example.deterministicmodelslotsizing.wagnerwhitin.WagnerWhitinAlgorithm;
import com.example.deterministicmodelslotsizing.eoq.EOQ;

/**
 * Main class of the application
 * @Author Tamino Gaub & Maximilian Stablum
 */
@SpringBootApplication
public class DeterministicModelsLotSizingApplication {

    // Main method
    public static void main(String[] args) {
        SpringApplication.run(DeterministicModelsLotSizingApplication.class, args);
        // Testing values for the Wagner Whitin
        int[] demands = {20,50,10,50,50,10,20,40,20,30}; // Ein Array von Integers mit spezifischen Werten
        int holdingCost = 1; // Kosten pro Einheit pro Periode
        int orderCost = 100; // Kosten pro Bestellung
        // Testing values for the EOQ
        WagnerWhitinAlgorithm wwa = new WagnerWhitinAlgorithm(demands, holdingCost, orderCost);
        wwa.calculate();

        // Calculate the EOQ with help of the algorithm
        EOQ eoq1 = new EOQ();
        System.out.println(eoq1.eoqMethod(19, 52, 45, 15));
        System.out.println(eoq1.sensitivityAnalysis());

    }

    // CORS configuration for the frontend
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Apply CORS settings to all endpoints ("/**")
                registry.addMapping("/**").allowedOrigins("http://localhost:3000");
            }
        };
    }

}


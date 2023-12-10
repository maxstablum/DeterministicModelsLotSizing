package com.example.deterministicmodelslotsizing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class DeterministicModelsLotSizingApplication {

    public static void main(String[] args) {
        SpringApplication.run(DeterministicModelsLotSizingApplication.class, args);
    }

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


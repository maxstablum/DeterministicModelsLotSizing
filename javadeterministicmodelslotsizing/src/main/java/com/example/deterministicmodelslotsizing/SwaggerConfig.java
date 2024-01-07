package com.example.deterministicmodelslotsizing;

import org.springframework.boot.autoconfigure.AutoConfiguration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import org.springframework.context.annotation.Bean;

import java.util.Collections;

@Configuration
public class SwaggerConfig {
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build()
                //.pathMapping("/swagger-ui.html")
                .apiInfo(apiInfo());
    }

    private ApiInfo apiInfo() {
        return new ApiInfo(
                "Student REST API",
                "The brand new se2 student api",
                "API TOS",
                "Terms of service",
                new Contact("Stephan Schiffner", "cs.hm.edu", "stephan.schiffner@hm.edu"),
                "License of API", "API license URL", Collections.emptyList());
    }
}
/**
 *
 import org.springframework.context.annotation.Bean;
 import org.springframework.context.annotation.Configuration;
 import org.springframework.context.annotation.Import;
 import org.springframework.context.annotation.PropertySource;
 import org.springframework.web.servlet.config.annotation.EnableWebMvc;
 import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
 import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
 import springfox.bean.validators.configuration.BeanValidatorPluginsConfiguration;
 import springfox.documentation.builders.ApiInfoBuilder;
 import springfox.documentation.builders.PathSelectors;
 import springfox.documentation.builders.RequestHandlerSelectors;
 import springfox.documentation.service.ApiInfo;
 import springfox.documentation.spi.DocumentationType;
 import springfox.documentation.spring.web.plugins.Docket;
 import springfox.documentation.swagger2.annotations.EnableSwagger2;

 @EnableWebMvc
 @EnableSwagger2
 public class SwaggerConfig implements WebMvcConfigurer {

 @Override
 public void addResourceHandlers(ResourceHandlerRegistry registry) {

 registry
 .addResourceHandler("swagger-ui.html")
 .addResourceLocations("classpath:/META-INF/resources/");

 registry
 .addResourceHandler("/webjars/**")
 .addResourceLocations("classpath:/META-INF/resources/webjars/");
 }

 @Bean
 public Docket apiDocket() {

 return new Docket(DocumentationType.SWAGGER_2)
 .apiInfo(getApiInfo())
 .select()
 .apis(RequestHandlerSelectors.basePackage("com.example.springbootswagger.controller"))
 .paths(PathSelectors.any())
 .build();
 }

 private ApiInfo getApiInfo() {

 return new ApiInfoBuilder()
 .title("Swagger API Doc")
 .description("More description about the API")
 .version("1.0.0")
 .build();
 }
 }
*/
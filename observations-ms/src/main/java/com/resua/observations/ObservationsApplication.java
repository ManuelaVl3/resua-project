package com.resua.observations;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class ObservationsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ObservationsApplication.class, args);
	}

}

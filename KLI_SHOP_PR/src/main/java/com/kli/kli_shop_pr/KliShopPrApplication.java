package com.kli.kli_shop_pr;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@SpringBootApplication

@OpenAPIDefinition(
		info = @Info(
		title = "Kli Shop API Documentation",
				version = "1.0.0",
				description = "Documentation of specific api endpoints included in our project"
		),
		servers = @Server(
				url = "http://localhost:8080",
				description = "Default localhost server"
		)
)
public class KliShopPrApplication {

	public static void main(String[] args) {
		SpringApplication.run(KliShopPrApplication.class, args);
	}

}

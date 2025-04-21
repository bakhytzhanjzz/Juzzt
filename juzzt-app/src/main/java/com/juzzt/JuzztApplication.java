package com.juzzt;

import com.juzzt.service.RecordUpdaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class JuzztApplication implements CommandLineRunner {

	@Autowired
	private RecordUpdaterService updaterService;

	public static void main(String[] args) {
		SpringApplication.run(JuzztApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		updaterService.updateMissingImagesAndIds();
	}
}

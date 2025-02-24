package com.juzzt.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.juzzt.model.Record;
import com.juzzt.repository.RecordRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.io.File;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;

@Component
public class DataSeeder implements CommandLineRunner {
    private final RecordRepository recordRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Value("${data.seeder.enabled}")
    private boolean seederEnabled;

    public DataSeeder(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (!seederEnabled) {
            System.out.println("⚡ DataSeeder is disabled. Skipping seeding.");
            return;
        }

        System.out.println("⚠️ Deleting all records...");
        recordRepository.deleteAll();

        System.out.println("🔄 Resetting ID sequence...");
        entityManager.createNativeQuery("ALTER SEQUENCE records_id_seq RESTART WITH 1").executeUpdate();

        System.out.println("📂 Loading records from JSON...");
        ObjectMapper objectMapper = new ObjectMapper();
        File file = new ClassPathResource("records.json").getFile();
        List<Record> records = objectMapper.readValue(file, objectMapper.getTypeFactory().constructCollectionType(List.class, Record.class));

        recordRepository.saveAll(records);
        System.out.println("✅ Inserted 100 jazz records with correct IDs!");
    }
}

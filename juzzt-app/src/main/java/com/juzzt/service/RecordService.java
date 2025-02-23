package com.juzzt.service;

import com.juzzt.model.Record;
import com.juzzt.repository.RecordRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.CacheEvict;

import java.util.List;
import java.util.Optional;

@Service
public class RecordService {
    private final RecordRepository recordRepository;

    public RecordService(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    @Cacheable(value = "records")
    public List<Record> getAllRecords() {
        System.out.println("Fetching records from database...");  // To confirm cache is working
        return recordRepository.findAll();
    }

    @Cacheable(value = "records", key = "#id")
    public Optional<Record> getRecordById(Long id) {
        return recordRepository.findById(id);
    }

    @CacheEvict(value = "records", allEntries = true)
    public Record createRecord(Record record) {
        return recordRepository.save(record);
    }
}

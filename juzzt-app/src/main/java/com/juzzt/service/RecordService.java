package com.juzzt.service;

import com.juzzt.model.Record;
import com.juzzt.repository.RecordRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RecordService {
    private final RecordRepository recordRepository;

    public RecordService(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    public List<Record> getAllRecords() {
        return recordRepository.findAll();
    }

    public Optional<Record> getRecordById(Long id) {
        return recordRepository.findById(id);
    }

    public Record createRecord(Record record) {
        return recordRepository.save(record);
    }
}

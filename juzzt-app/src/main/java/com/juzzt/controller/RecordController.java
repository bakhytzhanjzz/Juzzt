package com.juzzt.controller;

import com.juzzt.model.Record;
import com.juzzt.service.RecordService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/records")
public class RecordController {
    private final RecordService recordService;

    public RecordController(RecordService recordService) {
        this.recordService = recordService;
    }

    @GetMapping
    public List<Record> getAllRecords() {
        return recordService.getAllRecords();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Record> getRecordById(@PathVariable Long id) {
        return recordService.getRecordById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Record createRecord(@RequestBody Record record) {
        return recordService.createRecord(record);
    }
}

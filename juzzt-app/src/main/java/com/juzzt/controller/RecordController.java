package com.juzzt.controller;

import com.juzzt.model.Record;
import com.juzzt.service.RecordService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/records")
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
        Optional<Record> record = recordService.getRecordById(id);
        return record.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Record> createRecord(
            @RequestParam("title") String title,
            @RequestParam("artist") String artist,
            @RequestParam("genre") String genre,
            @RequestParam("price") Double price,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            Record record = new Record(title, artist, genre, price, null, null);
            Record savedRecord = recordService.createRecord(record, file);
            return ResponseEntity.ok(savedRecord);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<Record> updateRecord(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam("artist") String artist,
            @RequestParam("genre") String genre,
            @RequestParam("price") Double price,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            Record recordDetails = new Record(id, title, artist, genre, price, null, null);
            Record updatedRecord = recordService.updateRecord(id, recordDetails, file);
            return ResponseEntity.ok(updatedRecord);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/update-all")
    public ResponseEntity<String> updateAllRecords() {
        recordService.updateAllRecordsWithMusicBrainz();
        return ResponseEntity.ok("All records updated with MusicBrainz IDs and album covers.");
    }

}

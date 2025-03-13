package com.juzzt.service;

import com.juzzt.model.Record;
import com.juzzt.repository.RecordRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class RecordService {
    private final RecordRepository recordRepository;
    private final ImageUploadService imageUploadService; // Inject ImageUploadService

    public RecordService(RecordRepository recordRepository, ImageUploadService imageUploadService) {
        this.recordRepository = recordRepository;
        this.imageUploadService = imageUploadService;
    }

    @Cacheable(value = "records")
    public List<Record> getAllRecords() {
        System.out.println("Fetching records from database...");
        return recordRepository.findAll();
    }

    @Cacheable(value = "records", key = "#id")
    public Optional<Record> getRecordById(Long id) {
        return recordRepository.findById(id);
    }

    @CacheEvict(value = "records", allEntries = true)
    public Record createRecord(Record record, MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            String imageUrl = imageUploadService.uploadImage(file); // Upload to Cloudinary
            record.setImageUrl(imageUrl);
        }
        return recordRepository.save(record);
    }

    @CacheEvict(value = "records", allEntries = true)
    public Record updateRecord(Long id, Record recordDetails, MultipartFile file) throws IOException {
        return recordRepository.findById(id)
                .map(record -> {
                    record.setTitle(recordDetails.getTitle());
                    record.setArtist(recordDetails.getArtist());
                    record.setGenre(recordDetails.getGenre());
                    record.setPrice(recordDetails.getPrice());
                    if (file != null && !file.isEmpty()) {
                        try {
                            String imageUrl = imageUploadService.uploadImage(file);
                            record.setImageUrl(imageUrl);
                        } catch (IOException e) {
                            throw new RuntimeException("Failed to upload image", e);
                        }
                    }
                    return recordRepository.save(record);
                })
                .orElseThrow(() -> new RuntimeException("Record not found"));
    }
}

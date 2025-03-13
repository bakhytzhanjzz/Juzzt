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
    private final MusicBrainzService musicBrainzService;
    private final AlbumCoverService albumCoverService;
    private final ImageUploadService imageUploadService; // Cloudinary upload

    public RecordService(RecordRepository recordRepository,
                         MusicBrainzService musicBrainzService,
                         AlbumCoverService albumCoverService,
                         ImageUploadService imageUploadService) {
        this.recordRepository = recordRepository;
        this.musicBrainzService = musicBrainzService;
        this.albumCoverService = albumCoverService;
        this.imageUploadService = imageUploadService;
    }

    @Cacheable(value = "records")
    public List<Record> getAllRecords() {
        return recordRepository.findAllByImageUrlFirst();
    }

    @Cacheable(value = "records", key = "#id")
    public Optional<Record> getRecordById(Long id) {
        return recordRepository.findById(id);
    }

    @CacheEvict(value = "records", allEntries = true)
    public Record createRecord(Record record, MultipartFile file) throws IOException {
        // Fetch MusicBrainz ID if not provided
        if (record.getMusicbrainzId() == null) {
            String musicbrainzId = musicBrainzService.getMusicBrainzId(record.getArtist(), record.getTitle());
            record.setMusicbrainzId(musicbrainzId);
        }

        // Fetch album cover from Cover Art Archive
        if (record.getImageUrl() == null || record.getImageUrl().isEmpty()) {
            String albumCover = albumCoverService.getAlbumCover(record.getMusicbrainzId());
            if (albumCover != null) {
                record.setImageUrl(albumCover);
            } else if (file != null && !file.isEmpty()) {
                // If no cover is found, allow manual upload to Cloudinary
                String cloudinaryUrl = imageUploadService.uploadImage(file);
                record.setImageUrl(cloudinaryUrl);
            }
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

    @CacheEvict(value = "records", allEntries = true)
    public void updateMissingMusicBrainzIds() {
        List<Record> recordsWithoutId = recordRepository.findByMusicbrainzIdIsNull();

        for (Record record : recordsWithoutId) {
            String musicbrainzId = musicBrainzService.getMusicBrainzId(record.getArtist(), record.getTitle());

            if (musicbrainzId != null) {
                record.setMusicbrainzId(musicbrainzId);

                // Fetch cover image if missing
                if (record.getImageUrl() == null || record.getImageUrl().isEmpty()) {
                    String albumCover = albumCoverService.getAlbumCover(musicbrainzId);
                    if (albumCover != null) {
                        record.setImageUrl(albumCover);
                    }
                }

                recordRepository.save(record); // Save the updated record
            }
        }
    }
    @CacheEvict(value = "records", allEntries = true)
    public void updateAllRecordsWithMusicBrainz() {
        List<Record> records = recordRepository.findAll();

        for (Record record : records) {
            boolean updated = false;

            // Fetch and update MusicBrainz ID if missing
            if (record.getMusicbrainzId() == null || record.getMusicbrainzId().isEmpty()) {
                String musicbrainzId = musicBrainzService.getMusicBrainzId(record.getArtist(), record.getTitle());
                if (musicbrainzId != null) {
                    record.setMusicbrainzId(musicbrainzId);
                    updated = true;
                }
            }

            // Fetch and update album cover if missing
            if ((record.getImageUrl() == null || record.getImageUrl().isEmpty()) && record.getMusicbrainzId() != null) {
                String albumCover = albumCoverService.getAlbumCover(record.getMusicbrainzId());
                if (albumCover != null) {
                    record.setImageUrl(albumCover);
                    updated = true;
                }
            }

            // Save the record only if it was updated
            if (updated) {
                recordRepository.save(record);
                System.out.println("Updated: " + record.getTitle() + " (" + record.getArtist() + ")");
            }
        }
    }

}

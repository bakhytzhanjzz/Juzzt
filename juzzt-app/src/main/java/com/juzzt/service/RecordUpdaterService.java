package com.juzzt.service;

import com.juzzt.model.Record;
import com.juzzt.repository.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class RecordUpdaterService {

    @Autowired
    private RecordRepository recordRepository;

    @Autowired
    private MusicBrainzService musicBrainzService;  // Injecting the MusicBrainzService

    private final RestTemplate restTemplate = new RestTemplate();

    private final String COVER_ART_URL = "https://coverartarchive.org/release-group/%s";

    @Transactional
    public void updateMissingImagesAndIds() {
        List<Record> records = recordRepository.findAll();

        System.out.println("Starting to update records...");

        for (Record record : records) {
            // Log each record that is being processed
            System.out.println("Checking record: " + record.getTitle() + " - " + record.getArtist());

            if (record.getImageUrl() == null || record.getMusicbrainzId() == null) {
                System.out.println("Updating: " + record.getTitle() + " - " + record.getArtist());

                // Fetch MusicBrainz ID
                String mbId = musicBrainzService.getMusicBrainzId(record.getArtist(), record.getTitle());

                if (mbId != null) {
                    record.setMusicbrainzId(mbId);

                    try {
                        String url = String.format(COVER_ART_URL, mbId);
                        Map response = restTemplate.getForObject(url, Map.class);

                        if (response != null && response.containsKey("images")) {
                            List<Map<String, Object>> images = (List<Map<String, Object>>) response.get("images");
                            if (!images.isEmpty()) {
                                String imageUrl = (String) images.get(0).get("image");
                                record.setImageUrl(imageUrl);
                            }
                        }

                    } catch (Exception e) {
                        System.out.println("No cover art found for " + mbId);
                    }

                    recordRepository.save(record);
                    System.out.println("Updated record: " + record.getTitle() + " with image and MBID");
                }
            }
        }
        System.out.println("Finished updating records.");
    }
}

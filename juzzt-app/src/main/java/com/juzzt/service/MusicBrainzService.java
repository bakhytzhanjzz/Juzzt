package com.juzzt.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;

@Service
public class MusicBrainzService {
    private final String MUSICBRAINZ_API = "https://musicbrainz.org/ws/2/release-group?query=artist:\"%s\" AND release:\"%s\"&fmt=json";

    public String getMusicBrainzId(String artist, String album) {
        String url = String.format(MUSICBRAINZ_API, artist, album);
        RestTemplate restTemplate = new RestTemplate();

        try {
            Map response = restTemplate.getForObject(url, Map.class);
            if (response != null && response.containsKey("release-groups")) {
                List<Map<String, Object>> releases = (List<Map<String, Object>>) response.get("release-groups");
                if (!releases.isEmpty()) {
                    return (String) releases.get(0).get("id");
                }
            }
        } catch (Exception e) {
            System.out.println("Error fetching MusicBrainz ID: " + e.getMessage());
        }
        return null; // Return null if no match found
    }
}

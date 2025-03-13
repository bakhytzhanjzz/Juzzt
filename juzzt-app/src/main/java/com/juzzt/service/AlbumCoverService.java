package com.juzzt.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AlbumCoverService {
    private final String COVER_ART_API = "https://coverartarchive.org/release-group/";

    public String getAlbumCover(String musicbrainzId) {
        if (musicbrainzId == null) return null;

        String coverUrl = COVER_ART_API + musicbrainzId + "/front";
        try {
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.headForHeaders(coverUrl); // Check if the image exists
            return coverUrl;
        } catch (Exception e) {
            return null; // No image found
        }
    }
}

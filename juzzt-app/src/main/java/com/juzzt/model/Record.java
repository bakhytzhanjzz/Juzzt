package com.juzzt.model;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "records")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Record implements Serializable { // Make Record serializable
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String artist;
    private String genre;
    private Double price;
    private String imageUrl;
    private String musicbrainzId;

    public Record(String title, String artist, String genre, Double price, String imageUrl, String musicbrainzId) {
        this.title = title;
        this.artist = artist;
        this.genre = genre;
        this.price = price;
        this.imageUrl = imageUrl;
        this.musicbrainzId = musicbrainzId;
    }

}

package com.juzzt.repository;

import com.juzzt.model.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Long> {
    @Query("SELECT r FROM Record r ORDER BY (CASE WHEN r.imageUrl IS NULL OR r.imageUrl = '' THEN 1 ELSE 0 END) ASC, r.id ASC")
    List<Record> findAllByImageUrlFirst();
    List<Record> findByGenre(String genre);

    List<Record> findByMusicbrainzIdIsNull();
}

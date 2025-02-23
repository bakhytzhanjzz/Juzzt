package com.juzzt.repository;

import com.juzzt.model.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Long> {
    List<Record> findByGenre(String genre);
}

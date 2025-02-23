package com.juzzt.service;

import com.juzzt.model.Recommendation;
import com.juzzt.model.User;
import com.juzzt.model.Record;
import com.juzzt.repository.RecommendationRepository;
import com.juzzt.repository.UserRepository;
import com.juzzt.repository.RecordRepository;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.Cacheable;

import java.util.List;
import java.util.Optional;

@Service
public class RecommendationService {
    private final RecommendationRepository recommendationRepository;
    private final UserRepository userRepository;
    private final RecordRepository recordRepository;

    public RecommendationService(RecommendationRepository recommendationRepository, UserRepository userRepository, RecordRepository recordRepository) {
        this.recommendationRepository = recommendationRepository;
        this.userRepository = userRepository;
        this.recordRepository = recordRepository;
    }

    public List<Recommendation> getRecommendationsForUser(Long userId) {
        return recommendationRepository.findByUserId(userId);
    }

    public Recommendation saveRecommendation(Long userId, Long recordId, Double score) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Record> record = recordRepository.findById(recordId);

        if (user.isPresent() && record.isPresent()) {
            Recommendation recommendation = new Recommendation();
            recommendation.setUser(user.get());
            recommendation.setRecord(record.get());
            recommendation.setScore(score);
            return recommendationRepository.save(recommendation);
        } else {
            throw new RuntimeException("User or Record not found");
        }
    }
}

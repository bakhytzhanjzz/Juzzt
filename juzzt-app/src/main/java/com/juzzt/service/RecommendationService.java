package com.juzzt.service;

import com.juzzt.model.Order;
import com.juzzt.model.OrderItem;
import com.juzzt.model.Record;
import com.juzzt.model.User;
import com.juzzt.repository.OrderRepository;
import com.juzzt.repository.RecordRepository;
import com.juzzt.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecommendationService {
    private final OrderRepository orderRepository;
    private final RecordRepository recordRepository;
    private final UserRepository userRepository;

    public RecommendationService(OrderRepository orderRepository, RecordRepository recordRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.recordRepository = recordRepository;
        this.userRepository = userRepository;
    }

    /**
     * Generate hybrid recommendations for a user based on both
     * collaborative filtering and content-based filtering.
     */
    public List<Record> getRecommendationsForUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        // Get records the user has bought
        Set<Record> userPurchasedRecords = getUserPurchasedRecords(userId);

        // 1️⃣ Collaborative Filtering: Find similar users and get their favorite records
        Set<Record> collaborativeRecommendations = getCollaborativeRecommendations(userId, userPurchasedRecords);

        // 2️⃣ Content-Based Filtering: Find similar records based on genre/artist
        Set<Record> contentBasedRecommendations = getContentBasedRecommendations(userPurchasedRecords);

        // Merge both recommendation lists (Hybrid approach)
        Set<Record> combinedRecommendations = new HashSet<>();
        combinedRecommendations.addAll(collaborativeRecommendations);
        combinedRecommendations.addAll(contentBasedRecommendations);

        // Convert to list and return top 10 recommendations
        return new ArrayList<>(combinedRecommendations).stream().limit(10).collect(Collectors.toList());
    }

    /**
     * Get records that the user has already purchased.
     */
    private Set<Record> getUserPurchasedRecords(Long userId) {
        List<Order> userOrders = orderRepository.findByUserId(userId);
        return userOrders.stream()
                .flatMap(order -> order.getOrderItems().stream())
                .map(OrderItem::getRecord)
                .collect(Collectors.toSet());
    }

    /**
     * Collaborative Filtering: Find records purchased by similar users.
     */
    private Set<Record> getCollaborativeRecommendations(Long userId, Set<Record> userPurchasedRecords) {
        List<Order> allOrders = orderRepository.findAll();
        Set<Record> recommendedRecords = new HashSet<>();

        for (Order order : allOrders) {
            if (!order.getUser().getId().equals(userId)) { // Avoid recommending to self
                for (OrderItem item : order.getOrderItems()) {
                    if (userPurchasedRecords.contains(item.getRecord())) {
                        recommendedRecords.addAll(order.getOrderItems().stream()
                                .map(OrderItem::getRecord)
                                .collect(Collectors.toSet()));
                    }
                }
            }
        }

        // Remove records the user already purchased
        recommendedRecords.removeAll(userPurchasedRecords);
        return recommendedRecords;
    }

    /**
     * Content-Based Filtering: Find records similar to purchased ones.
     */
    private Set<Record> getContentBasedRecommendations(Set<Record> userPurchasedRecords) {
        List<Record> allRecords = recordRepository.findAll();
        Set<Record> recommendedRecords = new HashSet<>();

        for (Record purchasedRecord : userPurchasedRecords) {
            for (Record record : allRecords) {
                if (!userPurchasedRecords.contains(record)) {
                    if (record.getGenre().equalsIgnoreCase(purchasedRecord.getGenre()) ||
                            record.getArtist().equalsIgnoreCase(purchasedRecord.getArtist())) {
                        recommendedRecords.add(record);
                    }
                }
            }
        }

        return recommendedRecords;
    }
}

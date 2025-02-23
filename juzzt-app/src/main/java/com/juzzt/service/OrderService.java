package com.juzzt.service;

import com.juzzt.model.Order;
import com.juzzt.model.User;
import com.juzzt.repository.OrderRepository;
import com.juzzt.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findAll().stream()
                .filter(order -> order.getUser().getId().equals(userId))
                .toList();
    }

    public Order createOrder(Long userId, Double totalPrice) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            Order order = new Order();
            order.setUser(user.get());
            order.setTotalPrice(totalPrice);
            return orderRepository.save(order);
        } else {
            throw new RuntimeException("User not found");
        }
    }
}

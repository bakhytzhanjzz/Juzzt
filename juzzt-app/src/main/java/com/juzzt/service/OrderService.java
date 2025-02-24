package com.juzzt.service;

import com.juzzt.model.Order;
import com.juzzt.model.OrderItem;
import com.juzzt.model.Record;
import com.juzzt.model.User;
import com.juzzt.repository.OrderRepository;
import com.juzzt.repository.RecordRepository;
import com.juzzt.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final RecordRepository recordRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository, RecordRepository recordRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.recordRepository = recordRepository;
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public Order placeOrder(Long userId, List<Long> recordIds) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) throw new RuntimeException("User not found");

        List<Record> records = recordRepository.findAllById(recordIds);
        if (records.isEmpty()) throw new RuntimeException("No valid records found");

        Order order = new Order();
        order.setUser(user.get());
        order.setOrderDate(LocalDateTime.now());
        order.setTotalPrice(records.stream().mapToDouble(Record::getPrice).sum());

        List<OrderItem> orderItems = records.stream().map(record ->
                new OrderItem(null, order, record, 1, record.getPrice())
        ).toList();

        order.setOrderItems(orderItems);
        return orderRepository.save(order);
    }
}

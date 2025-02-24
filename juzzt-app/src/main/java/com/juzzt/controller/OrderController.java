package com.juzzt.controller;

import com.juzzt.model.Order;
import com.juzzt.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable Long userId) {
        return orderService.getOrdersByUserId(userId);
    }

    @PostMapping("/place/{userId}")
    public ResponseEntity<Order> placeOrder(@PathVariable Long userId, @RequestBody List<Long> recordIds) {
        return ResponseEntity.ok(orderService.placeOrder(userId, recordIds));
    }
}

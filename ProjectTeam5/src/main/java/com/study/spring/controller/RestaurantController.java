package com.study.spring.controller;

import com.study.spring.domain.Restaurant;
import com.study.spring.repository.RestaurantRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantRepository restaurantRepository;

    // 맛집 목록 가져오기
    @GetMapping
    public List<Restaurant> getRestaurants() {
        return restaurantRepository.findAll();
    }

    // 맛집에 좋아요 추가
    @PostMapping("/{restaurantId}/like")
    public ResponseEntity<String> addLike(@PathVariable Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow(() -> new IllegalArgumentException("음식점을 찾을 수 없습니다."));
        
        // 좋아요 수 증가
        restaurant.setLikeCount(restaurant.getLikeCount() + 1);
        restaurantRepository.save(restaurant);
        
        return ResponseEntity.ok("좋아요!");
    }
}

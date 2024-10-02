package com.study.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.study.spring.domain.Favorite;
import com.study.spring.service.FavoriteService;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    // 찜하기 추가 API
    @PostMapping("/add")
    public ResponseEntity<Void> addFavorite(
        @RequestParam String memId,  
        @RequestParam Long restaurantId,
        @RequestParam String name,
        @RequestParam String address,
        @RequestParam String foodType,
        @RequestParam Double latitude,
        @RequestParam Double longitude,
        @RequestParam(required = false) String telNo) {
        favoriteService.addFavorite(memId, restaurantId, name, address, foodType, latitude, longitude, telNo);
        return ResponseEntity.ok().build(); // 응답 상태를 OK로 설정
    }

    // 찜 리스트 조회 API (최신순으로 정렬)
    @GetMapping("/list")
    public ResponseEntity<List<Favorite>> getFavorites(@RequestParam String memId) {
        List<Favorite> favorites = favoriteService.getFavorites(memId);
        return ResponseEntity.ok(favorites);
    }

    // 찜 삭제 API
    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteFavorite(@RequestParam String memId, @RequestParam Long restaurantId) {
        favoriteService.deleteFavorite(memId, restaurantId);
        return ResponseEntity.noContent().build();
    }

}

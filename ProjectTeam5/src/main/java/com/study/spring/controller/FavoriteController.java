package com.study.spring.controller;

import com.study.spring.domain.Favorite;
import com.study.spring.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    // 찜하기 추가 API
    @PostMapping("/add")
    public void addFavorite(@RequestParam String nickname, @RequestParam Long restaurantId) {
        favoriteService.addFavorite(nickname, restaurantId);
    }

    // 찜 리스트 조회 API
    @GetMapping("/list")
    public List<Favorite> getFavorites(@RequestParam String nickname) {
        return favoriteService.getFavorites(nickname);
    }
}

package com.study.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
    public void addFavorite(@RequestParam String nickname, @RequestParam Long restaurantId) {
        favoriteService.addFavorite(nickname, restaurantId);
    }

    // 찜 리스트 조회 API
    @GetMapping("/list")
    public List<Favorite> getFavorites(@RequestParam String nickname) {
        return favoriteService.getFavorites(nickname);
    }
}

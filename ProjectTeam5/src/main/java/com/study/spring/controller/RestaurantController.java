package com.study.spring.controller;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.study.spring.service.PoiService;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {
	
    private final PoiService poiService;

   public RestaurantController(PoiService poiService) {
        this.poiService = poiService;
    }

    // 음식점 검색
    @GetMapping("/search")
    public String searchRestaurants(@RequestParam String keyword, @RequestParam int page) {
        return poiService.getRestaurants(keyword, page);
    }

    // 음식점 순위
    @GetMapping("/rankings")
    public String getRestaurantRankings(@RequestParam String area, @RequestParam String foodType) {
        return poiService.getRestaurantRankings(area, foodType);
    }
}

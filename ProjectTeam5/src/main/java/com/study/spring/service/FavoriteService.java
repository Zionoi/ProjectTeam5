package com.study.spring.service;

import com.study.spring.domain.Favorite;
import com.study.spring.domain.Member;
import com.study.spring.domain.Restaurant;
import com.study.spring.repository.FavoriteRepository;
import com.study.spring.repository.MemberRepository;
import com.study.spring.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    // 찜하기 추가
    public void addFavorite(String nickname, Long restaurantId) {
        Member member = memberRepository.findByNickname(nickname);
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow(()  
        						-> new IllegalArgumentException("Restaurant not found"));
        
        Favorite favorite = new Favorite();
        favorite.setMember(member);
        favorite.setRestaurant(restaurant);
        favorite.setFavoriteDate(LocalDateTime.now());
        favoriteRepository.save(favorite);
    }

    // 특정 멤버의 찜 리스트 가져오기
    public List<Favorite> getFavorites(String nickname) {
        Member member = memberRepository.findByNickname(nickname);
        return favoriteRepository.findByMember(member);
    }
}

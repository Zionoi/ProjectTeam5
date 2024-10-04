package com.study.spring.service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.study.spring.domain.Favorite;
import com.study.spring.domain.Member;
import com.study.spring.domain.Restaurant;
import com.study.spring.repository.FavoriteRepository;
import com.study.spring.repository.MemberRepository;
import com.study.spring.repository.RestaurantRepository;

import org.springframework.transaction.annotation.Transactional;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    // 특정 멤버의 찜 리스트 가져오기
    public List<Favorite> getFavorites(String memId) {
        Member member = memberRepository.findByMemId(memId)
            .orElseThrow(() -> new IllegalArgumentException("Member not found with memId: " + memId));
        // 최신순으로 정렬된 찜 목록을 반환
        return favoriteRepository.findByMemberOrderByFavoriteDateDesc(member);
    }

    // 찜하기 추가 로직 수정
    public void addFavorite(String memId, Long restaurantId, String name, String address, String foodType, Double latitude, Double longitude, String telNo) {
        // 사용자 확인
        Member member = memberRepository.findByMemId(memId)
            .orElseThrow(() -> new IllegalArgumentException("Member not found: " + memId));

        // 음식점이 DB에 존재하는지 확인
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
            .orElseGet(() -> {
                // DB에 없으면 새로운 Restaurant 생성 후 저장
                Restaurant newRestaurant = new Restaurant();
                newRestaurant.setRNum(restaurantId);  // API에서 제공한 ID 사용
                newRestaurant.setRName(name);
                newRestaurant.setRAddress(address);
                newRestaurant.setCategory(foodType);
                newRestaurant.setLatitude(latitude);  // 위도
                newRestaurant.setLongitude(longitude);  // 경도
                newRestaurant.setTelNo(telNo);  // 전화번호 저장
                newRestaurant.setRating(0.0);  // 평점은 임시로 0으로 설정
                return restaurantRepository.save(newRestaurant);
            });

        // 찜하기 로직
        Favorite favorite = new Favorite();
        favorite.setMember(member);
        favorite.setRestaurant(restaurant);
        favorite.setFavoriteDate(LocalDateTime.now());
        favoriteRepository.save(favorite);
    }

    // 찜 삭제 기능
    @Transactional
    public void deleteFavorite(String memId, Long restaurantId) {
        Member member = memberRepository.findByMemId(memId)
            .orElseThrow(() -> new IllegalArgumentException("Member not found: " + memId));

        Restaurant restaurant = restaurantRepository.findById(restaurantId)
            .orElseThrow(() -> new IllegalArgumentException("Restaurant not found: " + restaurantId));

        favoriteRepository.deleteByMemberAndRestaurant(member, restaurant);
    }
}

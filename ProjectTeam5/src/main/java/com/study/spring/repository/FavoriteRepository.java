package com.study.spring.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.study.spring.domain.Favorite;
import com.study.spring.domain.Member;
import com.study.spring.domain.Restaurant;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

	// 특정 회원(Member)의 찜한 음식점 목록을 최신순으로 가져오기
    List<Favorite> findByMemberOrderByFavoriteDateDesc(Member member);

    // 특정 회원의 특정 음식점 찜 삭제
    void deleteByMemberAndRestaurant(Member member, Restaurant restaurant);
    
   
}

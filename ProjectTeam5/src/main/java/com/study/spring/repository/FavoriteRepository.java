package com.study.spring.repository;
import com.study.spring.domain.Favorite;
import com.study.spring.domain.Member;
import com.study.spring.domain.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    // 특정 멤버의 찜 목록을 최신순으로 가져오기
    List<Favorite> findByMemberOrderByFavoriteDateDesc(Member member);

    // 멤버와 레스토랑을 통해 찜 삭제
    void deleteByMemberAndRestaurant(Member member, Restaurant restaurant);
    
    // 특정 멤버와 음식점으로 찜이 존재하는지 확인
    boolean existsByMemberAndRestaurant(Member member, Restaurant restaurant);
}

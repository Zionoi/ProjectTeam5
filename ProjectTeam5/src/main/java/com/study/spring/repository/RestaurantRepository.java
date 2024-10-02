package com.study.spring.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.spring.domain.Restaurant;
@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
	
	// rname 필드로 음식점 조회 (필드 이름에 맞게 수정)
    Optional<Restaurant> findByRname(String rname);
	
}

package com.study.spring.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.study.spring.domain.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
}

package com.study.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.spring.domain.Fortune;

@Repository
public interface FortuneRepository extends JpaRepository<Fortune, Long> {
	
}

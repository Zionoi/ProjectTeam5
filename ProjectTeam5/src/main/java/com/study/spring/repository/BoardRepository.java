package com.study.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.spring.domain.Board;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
	
}

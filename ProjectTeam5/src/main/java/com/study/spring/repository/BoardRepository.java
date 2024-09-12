package com.study.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.spring.domain.Board;
import com.study.spring.domain.Member;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

	List<Board> findByMember(Member member);
	
}

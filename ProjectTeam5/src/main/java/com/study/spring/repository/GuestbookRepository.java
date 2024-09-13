package com.study.spring.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.spring.domain.Guestbook;

@Repository
public interface GuestbookRepository extends JpaRepository<Guestbook, Long> {

	Page<Guestbook> findByMemIdOrderByCreateDateDesc(String memId, Pageable pageable);
	
}

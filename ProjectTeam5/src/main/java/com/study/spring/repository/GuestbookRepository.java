package com.study.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.spring.domain.Guestbook;

@Repository
public interface GuestbookRepository extends JpaRepository<Guestbook, Long> {
	
}

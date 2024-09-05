package com.study.spring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.spring.domain.Guestbook;
import com.study.spring.repository.GuestbookRepository;

@Service
public class GuestbookService {
	@Autowired
	private GuestbookRepository guestbookRepository;

	public void write(Guestbook guestbook) {
		guestbookRepository.save(guestbook);
	}

	public List<Guestbook> totalGuestbook() {
	
		return guestbookRepository.findAll();
	}

	public Optional<Guestbook> detailGuestbook(Long gNum) {
		
		return guestbookRepository.findById(gNum);
	}
}

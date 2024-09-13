package com.study.spring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    // 특정 페이지의 방명록을 페이징만큼 가져옴
	public Page<Guestbook> getGuestbookPage(int page, int size, String memId) {
	    Pageable pageable = PageRequest.of(page, size);
	    return guestbookRepository.findByMemIdOrderByCreateDateDesc(memId, pageable);
	}


	public Optional<Guestbook> detailGuestbook(Long gNum) {
		
		return guestbookRepository.findById(gNum);
	}
	
    public void deleteGuestbookEntry(Long gbNum) {
        guestbookRepository.deleteById(gbNum);
    }

	public void updateGuestbook(Long gbNum, Guestbook updatedGuestbook) {
		Guestbook guestbook =  guestbookRepository.findById(gbNum).get();
		
		guestbook.setGbContent(updatedGuestbook.getGbContent());
		
		guestbookRepository.save(guestbook);
	}
}

package com.study.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.study.spring.domain.Diary;
import com.study.spring.domain.Friends;
import com.study.spring.domain.Guestbook;
import com.study.spring.service.GuestbookService;

@RestController
@RequestMapping("/guestbook")
public class GuestbookController {
	@Autowired
	private GuestbookService guestbookService;
	
	// 방명록 하나를 db에 작성
	@PostMapping("/write")
	public String write(Guestbook guestbook) {
		
		guestbookService.write(guestbook);
		
		return "작성완료";
	}
	
	//모든 방명록을 가져옴
	@GetMapping("/total")
	public List<Guestbook> totalBoard(){
		List<Guestbook> list = guestbookService.totalGuestbook();
		return list;
	}
	
	//한개의 방명록 가져오기
	@GetMapping("/detail")
	public Guestbook detailDiary(@RequestParam("gnum") Long gNum)
	{
		return guestbookService.detailGuestbook(gNum).get();
	}
	
}

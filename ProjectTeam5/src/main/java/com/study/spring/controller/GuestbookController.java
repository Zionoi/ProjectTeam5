package com.study.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	@PostMapping("/add")
	public String write(@RequestBody Guestbook guestbook) {
		
		System.out.println(guestbook);
		guestbookService.write(guestbook);
		
		return "success";
	}
	
	//모든 방명록을 가져옴
	@GetMapping("/total")
	public Page<Guestbook> getGuestbookEntries(@RequestParam(defaultValue = "0") int page, 
	                                           @RequestParam(defaultValue = "10") int size,
	                                           @RequestParam("memId") String memId) {
	    return guestbookService.getGuestbookPage(page, size, memId);
	}
	
	//한개의 방명록 가져오기
	@GetMapping("/detail")
	public Guestbook detailDiary(@RequestParam("gnum") Long gNum)
	{
		return guestbookService.detailGuestbook(gNum).get();
	}
	
    // 방명록 삭제 기능
    @DeleteMapping("/delete/{gbNum}")
    public String deleteGuestbookEntry(@PathVariable Long gbNum) {

        guestbookService.deleteGuestbookEntry(gbNum);
        return "success";  // 성공적으로 삭제되면 success 반환
 
    }
    
    //방명록을 업데이트 하는 기능
    @PutMapping("/update/{gbNum}")
    public String updateGuestbook(@PathVariable Long gbNum, @RequestBody Guestbook updatedGuestbook) {
        guestbookService.updateGuestbook(gbNum, updatedGuestbook);
        return "success";
    }
	
}

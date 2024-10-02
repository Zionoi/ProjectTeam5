package com.study.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.study.spring.domain.Fortune;
import com.study.spring.service.FortuneService;
import com.study.spring.service.MemberService;

@RestController
@RequestMapping("/fortune")
public class FortuneController {
	@Autowired
	FortuneService fortuneService;
	
	 @Autowired
	    private MemberService memberService;
	
	@GetMapping("/today")
    public String getTodayFortune(@RequestParam String memId) {
        // 오늘 운세를 뽑을 수 있는지 확인
        boolean canDraw = memberService.canDrawFortune(memId);
        
        if (canDraw) {
            // 운세를 뽑을 수 있는 경우, 운세를 반환
            return "오늘의 운세는 ..."; // 여기서 운세를 생성하는 로직 추가
        } else {
            return "오늘은 이미 운세를 뽑았습니다.";
        }
    }
}

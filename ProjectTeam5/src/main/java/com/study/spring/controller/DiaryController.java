package com.study.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.study.spring.domain.Diary;
import com.study.spring.service.DiaryService;

@RestController
@RequestMapping("/Diary")
public class DiaryController {
	@Autowired
	private DiaryService diaryService;
	
	
	// 다이어리 하나를 db에 작성
	@PostMapping("/write")
	public String write(Diary diary) {
		
		diaryService.write(diary);
		
		return "작성완료";
	}
	
	//모든 다이어리를 가져옴
	@GetMapping("/total")
	public List<Diary> totalBoard(){
		List<Diary> list = diaryService.totalBoard();
		return list;
	}
	
	//한개의 다이어리 가져오기
	@GetMapping("/detail")
	public Diary detailDiary(@RequestParam("dnum") Long dNum)
	{
		return diaryService.detailDiary(dNum).get();
	}
}

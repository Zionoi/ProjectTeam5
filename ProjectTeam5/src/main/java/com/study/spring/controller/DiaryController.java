package com.study.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.study.spring.domain.Diary;
import com.study.spring.service.DiaryService;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/events")
public class DiaryController {

    @Autowired
    private DiaryService diaryService;
    
    //해당 아이디의 다이어리 리스트 불러오기
    @GetMapping("/all/{memId}")
    public List<Diary> findByMemId(@PathVariable String memId) {
        return diaryService.findByMemId(memId);
    }

    @PostMapping("/add")
    public Diary addEvent(@RequestBody Diary event) {
    	System.out.println("전체 불러오기");
    	System.out.println("event"+event);
        return diaryService.createEvent(event);
    }

    @GetMapping("/getDiary/{dnum}/{hostId}")
    public Diary getDiary(@PathVariable Long dnum, @PathVariable String hostId) {
       
       System.out.println("겟다이어리 : "+diaryService.findByDnumAndMemId(dnum, hostId));
        return diaryService.findByDnumAndMemId(dnum, hostId);
    }


    @DeleteMapping("/delete/{dnum}")
    public void deleteEvent(@PathVariable Long dnum) {
        diaryService.deleteEvent(dnum);
    }
}

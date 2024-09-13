package com.study.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.study.spring.domain.Fortune;
import com.study.spring.service.FortuneService;

@RestController
@RequestMapping("/fortune")
public class FortuneController {
	@Autowired
	FortuneService fortuneService;
	
    @GetMapping("/today")
    public Fortune getTodayFortune() {
        return fortuneService.getRandomFortune();
    }
}

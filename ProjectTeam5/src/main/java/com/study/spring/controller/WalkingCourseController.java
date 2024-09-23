package com.study.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.study.spring.domain.WalkingCourse;
import com.study.spring.service.WalkingCourseService;

@RestController
@RequestMapping("/api/walking")
public class WalkingCourseController {
	
	@Autowired
	WalkingCourseService walkingCourseService;
	
	@GetMapping("/all")
	public List<WalkingCourse> totalWalkingCourse(){
		System.out.println("산책로컨트롤러 모든 항목 호출 서비스시작 전" );
		List<WalkingCourse> list = walkingCourseService.totalWalkingCourse();
		System.out.println("산책로컨트롤러 모든 항목 호출 서비스실행 후: " + list);
		return list;
	}
}

package com.study.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	 // 지역에 따른 소속 지역 목록을 가져옴
    @GetMapping("/subregions/{region}")
    public List<String> getSubRegions(@PathVariable String region) {
        return walkingCourseService.getSubRegionsByRegion(region);
    }

    // 소속 지역에 따른 산책로 목록을 가져옴
    @GetMapping("/courses")
    public List<WalkingCourse> getWalkingCourses(@RequestParam("subRegion") String subRegion) {
        return walkingCourseService.getWalkingCoursesBySubRegion(subRegion);
    }
    
    // 선택한 산책경로 정보 가져옴
    @GetMapping("/courses/{courseId}")
    public WalkingCourse findById(@PathVariable("courseId") String esntlId) {
    	return walkingCourseService.findById(esntlId).get();
    }
    
}

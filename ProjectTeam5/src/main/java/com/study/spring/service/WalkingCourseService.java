package com.study.spring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.spring.domain.WalkingCourse;
import com.study.spring.repository.WalkingCourseRepository;

@Service
public class WalkingCourseService {
	
	@Autowired
	WalkingCourseRepository walkingCourseRepository;

	public List<WalkingCourse> totalWalkingCourse() {
			
		return walkingCourseRepository.findAll();
	}
	
	 // 지역에 따른 소속 지역 목록을 반환
	  // 지역에 따른 소속 지역 목록을 반환
    public List<String> getSubRegionsByRegion(String region) {
        return walkingCourseRepository.findSubRegionsByRegion(region);
    }

    // 소속 지역에 따른 산책로 목록을 반환
    public List<WalkingCourse> getWalkingCoursesBySubRegion(String subRegion) {
        return walkingCourseRepository.findWalkingCoursesBySubRegion(subRegion);
    }

	public Optional<WalkingCourse> findById(String esntlId) {
		return walkingCourseRepository.findById(esntlId);
	}

}

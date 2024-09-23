package com.study.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.spring.domain.WalkingCourse;
import com.study.spring.repository.WalkingCourseRepository;

@Service
public class WalkingCourseService {
	
	@Autowired
	WalkingCourseRepository walkingCourseRepository;

	public static List<WalkingCourse> totalWalkingCourse() {
			walkingCourseRepository.
		return null;
	}

}

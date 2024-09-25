package com.study.spring.service;

import com.study.spring.domain.Vote;
import com.study.spring.domain.WalkingCourse;
import com.study.spring.repository.VoteRepository;
import com.study.spring.repository.WalkingCourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private WalkingCourseRepository walkingCourseRepository;

	
   
}

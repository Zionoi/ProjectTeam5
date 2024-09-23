package com.study.spring.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.spring.domain.WalkingCourse;

@Repository
public interface WalkingCourseRepository extends JpaRepository<WalkingCourse, String> {

}
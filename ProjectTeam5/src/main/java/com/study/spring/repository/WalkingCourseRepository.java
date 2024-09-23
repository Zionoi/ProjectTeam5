package com.study.spring.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.study.spring.domain.WalkingCourse;

@Repository
public interface WalkingCourseRepository extends JpaRepository<WalkingCourse, String> {
	 // 지역에 따른 소속 지역 목록 조회
    @Query("SELECT DISTINCT w.signguName FROM WalkingCourse w WHERE w.signguName LIKE %:region%")
    List<String> findSubRegionsByRegion(@Param("region") String region);

    // 소속 지역에 따른 산책로 목록 조회
    @Query("SELECT w FROM WalkingCourse w WHERE w.signguName = :subRegion")
    List<WalkingCourse> findWalkingCoursesBySubRegion(@Param("subRegion") String subRegion);
}
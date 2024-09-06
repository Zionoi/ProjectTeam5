package com.study.spring.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.spring.domain.Diary;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long>{
	Optional<Diary> findBydNum(Long dNum);
}

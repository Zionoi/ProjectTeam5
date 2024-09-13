package com.study.spring.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.spring.domain.Diary;
import com.study.spring.domain.Member;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {
    Optional<Diary> findByDnumAndMemId(Long dnum, String memId);

    List<Diary> findByMemId(String memId);

	void deleteByDnumAndMemId(Long dnum, String hostId);
}

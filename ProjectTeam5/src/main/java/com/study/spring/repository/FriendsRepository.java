package com.study.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.spring.domain.Friends;

@Repository
public interface FriendsRepository extends JpaRepository<Friends, Long> {
    // Member의 memId로 친구 목록 조회
    List<Friends> findByMember_MemId(String memId);
}

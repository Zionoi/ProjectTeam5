package com.study.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.spring.domain.Friends;

//친구 요청에 대한 쿼리를 작성할 Repository
@Repository
public interface FriendsRepository extends JpaRepository<Friends, Long> {
	 // 특정 사용자(memId)의 친구 요청 상태가 특정 상태일 때 조회
	 List<Friends> findByMemberMemIdAndStatus(String memId, String status);
	
	 // 친구 요청을 받은 사용자(friendId)의 친구 요청 상태가 특정 상태일 때 조회
	 List<Friends> findByFriendIdAndStatus(String friendId, String status);
}


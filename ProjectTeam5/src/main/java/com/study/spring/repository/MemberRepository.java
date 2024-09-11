package com.study.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.spring.domain.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, String>{
	List<Member> findByNicknameContaining(String keyword);
	
	List<Member> findByNameAndBirthdayAndPhone(String name, String birthday, String phone);

	List<Member> findByMemIdAndNameAndBirthdayAndPhone(String userId, String name, String birthday, String phone);
}

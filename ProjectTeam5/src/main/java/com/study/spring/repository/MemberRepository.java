package com.study.spring.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.spring.domain.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, String>{
	List<Member> findByNicknameContaining(String keyword);
	

	// 아이디 존재 여부 확인 메서드
    boolean existsByMemId(String memId);

	List<Member> findByNameAndBirthdayAndPhone(String name, String birthday, String phone);

	List<Member> findByMemIdAndNameAndBirthdayAndPhone(String userId, String name, String birthday, String phone);

	// 찜기능 아이디 가져오기
	Optional<Member> findByMemId(String memId);
}

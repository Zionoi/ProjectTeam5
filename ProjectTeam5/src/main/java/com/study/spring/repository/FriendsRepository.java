package com.study.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.spring.domain.Friends;

@Repository
public interface FriendsRepository extends JpaRepository<Friends, Long> {

}

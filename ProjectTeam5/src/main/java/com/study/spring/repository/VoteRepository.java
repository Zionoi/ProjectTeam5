package com.study.spring.repository;

import com.study.spring.domain.Vote;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

    @Query("SELECT v FROM Vote v WHERE :memId IN elements(v.participantIds) AND v.isEnded = :isEnded AND v.participantIds IS NOT EMPTY")
    List<Vote> findActiveInvitedVotes(@Param("memId") String memId, @Param("isEnded") boolean isEnded);

    List<Vote> findByMemIdAndIsEnded(String memId, boolean b);
}

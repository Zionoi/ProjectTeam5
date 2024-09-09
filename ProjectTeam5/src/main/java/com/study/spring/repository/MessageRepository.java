package com.study.spring.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Sort;

import com.study.spring.domain.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    // 특정 사용자가 받은 모든 메시지 조회 (정렬)
    List<Message> findByFriendId(String friendId, Sort sort);

    // 메시지 읽음 처리
    @Modifying
    @Query("UPDATE Message m SET m.isReading = 0 WHERE m.mNum = :mNum")
    void markMessageAsRead(@Param("mNum") Long mNum);

    // 메시지 삭제
    void deleteById(Long mNum);
}

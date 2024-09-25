package com.study.spring.domain;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // 투표 고유 ID

    @Column(nullable = false)
    private String title;  // 투표 제목

    @Column(nullable = false)
    private boolean isOpenToAllFriends;  // 전체 친구 참여 여부

    private LocalDateTime endTime;  // 투표 종료 시점 (선택적)

    @Column(nullable = false)
    private String creatorId;  // 투표 생성자 ID (외래키 설정 X)

    private List<String> participantIds;  // 투표 참여 가능한 친구 ID 목록 (외래키 설정 X)

    @Column(nullable = false)
    private boolean isEnded;  // 투표 종료 여부

}

package com.study.spring.domain;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Entity
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Vote {

    @Id
    @SequenceGenerator(
        name = "voteSEQ",
        sequenceName = "voteSEQ",
        allocationSize = 1
    )
    @GeneratedValue(generator = "voteSEQ")
    private Long voteId;  // 투표 고유 ID

    @Column(nullable = false)
    private String voteTitle;  // 투표 제목

    @Column(nullable = false)
    private String memId;  // 투표 생성자 ID

    @Column(nullable = false)
    private boolean isOpenToAllFriends;  // 전체 친구 참여 여부

    private LocalDateTime endTime;  // 투표 종료 시점 (선택적)

    private boolean isAnonymous; // 익명 투표 여부

    @Column(nullable = false)
    private boolean isEnded;  // 투표 종료 여부

    // 투표 생성 시 권한을 받은 유저 ID 목록 (기존 컬럼)
    @ElementCollection(fetch = FetchType.EAGER)
    @Column(nullable = false)
    private List<String> participantIds = new ArrayList<>(); // 투표 권한을 받은 유저 ID 목록

    // 실제로 투표를 진행한 유저 ID 목록 (빈 배열로 초기화)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "vote_participants", joinColumns = @JoinColumn(name = "vote_id"))
    @Column(name = "voted_user_id")
    private List<String> votedUserIds = new ArrayList<>(); // 투표를 진행한 유저 ID 목록

 // 유저가 선택한 코스 ID 목록 (유저 ID와 일대일 대응)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "vote_participants_course", joinColumns = @JoinColumn(name = "vote_id"))
    @MapKeyColumn(name = "voted_user_id") // 키는 유저 ID
    @Column(name = "selected_course_id")
    private Map<String, String> userSelectedCourseIds = new HashMap<>(); // 유저 ID와 선택한 코스 ID 매핑

    @ElementCollection(fetch = FetchType.EAGER)
    @Column(nullable = false)
    private List<String> voteEsntlId = new ArrayList<>(); // 산책 코스 리스트

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "vote_course_count", joinColumns = @JoinColumn(name = "vote_id"))
    @MapKeyColumn(name = "walking_course_esntl_id")
    @Column(name = "vote_count")
    private Map<String, Integer> walkingCourseVoteCounts = new HashMap<>();  // 산책로 ID와 투표 수를 매핑
}

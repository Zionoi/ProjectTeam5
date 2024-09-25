package com.study.spring.domain;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Vote {

	@Id
	@SequenceGenerator (
			name="voteSEQ",
			sequenceName = "voteSEQ",
			allocationSize = 1
			)	
	@GeneratedValue(generator="voteSEQ")
    private Long voteId;  // 투표 고유 ID

    @Column(nullable = false)
    private String voteTitle;  // 투표 제목
    
    @Column(nullable = false)
    private String walkCourseName; // 산책 코스 이름
    
    @Column(nullable = false)
    private String memId;  // 투표 생성자 ID

    @Column(nullable = false)
    private boolean isOpenToAllFriends;  // 전체 친구 참여 여부

    private LocalDateTime endTime;  // 투표 종료 시점 (선택적)
    
    private boolean isAnonymous; // 익명 투표 여부

    @Column(nullable = false)
    private boolean isEnded;  // 투표 종료 여부
    
    @ElementCollection
    private List<String> participantIds; // 참여자 ID 목록

    @ElementCollection
    private List<Long> walkingCourseIds; // 산책로 ID 목록

    // 산책로별 투표 수를 관리하는 필드
    @ElementCollection
    @CollectionTable(name = "vote_course_count", joinColumns = @JoinColumn(name = "vote_id"))
    @MapKeyColumn(name = "walking_course_esntl_id")
    @Column(name = "vote_count")
    private Map<Long, Integer> walkingCourseVoteCounts;  // 산책로 ID와 투표 수를 매핑
}

package com.study.spring.domain;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VoteDTO {
    
	
	private Long voteId;
    private String voteTitle;
    private String memId;
    private boolean isOpenToAllFriends;
    private LocalDateTime endTime;
    private boolean isAnonymous;
    private boolean isEnded;
    private List<String> participantIds;
    private List<String> voteEsntlId; // 산책 코스 리스트
    private Map<Long, Integer> walkingCourseVoteCounts;
    
    // Getters and Setters

}

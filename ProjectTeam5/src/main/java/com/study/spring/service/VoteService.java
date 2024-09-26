package com.study.spring.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.study.spring.domain.Friends;
import com.study.spring.domain.Vote;
import com.study.spring.domain.WalkingCourse;
import com.study.spring.repository.FriendsRepository;
import com.study.spring.repository.VoteRepository;
import com.study.spring.repository.WalkingCourseRepository;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private WalkingCourseRepository walkingCourseRepository;
    
    @Autowired
    private FriendsRepository friendsRepository;  // 친구 리포지토리
    
    @Autowired
    private MessageService messageService;  // 쪽지 서비스

    // 투표 생성하기
    public Vote createVote(Vote vote) {
    	
    	// 받은 데이터 확인을 위한 로그 출력
        System.out.println("서비스 레이어에서 받은 투표 데이터: " + vote.toString());
        
        // 산책로 투표 수 초기화
        Map<String, Integer> walkingCourseVoteCounts = vote.getVoteEsntlId().stream()
                .collect(Collectors.toMap(courseId -> courseId, courseId -> 0));  // 투표 수를 0으로 초기화

        vote.setWalkingCourseVoteCounts(walkingCourseVoteCounts);  // 산책로별 투표 수 설정
        
        // 투표 저장
        Vote savedVote = voteRepository.save(vote);

        // 참여자들에게 메시지 전송
        sendVoteCreatedMessages(vote, savedVote.getVoteId());

        return savedVote; // 저장된 투표 객체 반환
    }
    
    // 투표 쪽지보내기
    private void sendVoteCreatedMessages(Vote vote, Long voteId) {
        String voteUrl = "/votes/" + voteId + "/vote";
        String messageContent = String.format(
            "투표 '%s'이(가) 생성되었습니다. 마감기한은 %s입니다.\n 투표하러 가기: %s",
            vote.getVoteTitle(), vote.getEndTime(), voteUrl
        );

        // 모든 참여자에게 메시지 전송
        List<String> recipientIds = vote.isOpenToAllFriends() ? getAllFriendIds(vote.getMemId()) : vote.getParticipantIds();
        for (String recipientId : recipientIds) {
            messageService.sendMessage(vote.getMemId(), recipientId, messageContent);
        }
    }
    
    // 친구 목록을 가져오는 메서드 (status가 '친구'인 관계만 가져옴)
    private List<String> getAllFriendIds(String memId) {
        List<Friends> friends = friendsRepository.findByMemberMemIdAndStatus(memId, "친구");
        return friends.stream()
                      .map(Friends::getFriendId)
                      .collect(Collectors.toList());
    }

    // 모든 산책로 가져오기
    public List<WalkingCourse> getAllWalkingCourses() {
        return walkingCourseRepository.findAll();
    }

    // 모든 친구 가져오기
    public List<Friends> getAllFriends() {
        return friendsRepository.findAll();
    }

    // 모든 투표 조회
    public List<Vote> getAllVotes() {
        return voteRepository.findAll();
    }

    // 특정 투표 조회
    public Optional<Vote> getVoteById(Long voteId) {
        return voteRepository.findById(voteId);
    }

    // 투표 종료
    public Vote endVote(Long voteId) {
        Optional<Vote> optionalVote = voteRepository.findById(voteId);
        if (optionalVote.isPresent()) {
            Vote vote = optionalVote.get();
            vote.setEnded(true);  // 투표 종료 상태로 변경
            return voteRepository.save(vote);
        }
        throw new RuntimeException("투표를 찾을 수 없습니다.");
    }
	
   
    // 투표하기
    public Map<String, Integer> vote(Long voteId, String courseId, String userId) {
        Optional<Vote> vote = getVoteById(voteId);
        Map<String, Integer> voteCount = new HashMap<>();

        if (vote.get().isEnded()) {
            throw new RuntimeException("Vote has ended");
        }

        // 투표 수 업데이트 로직
        // 여기에서 투표 수를 업데이트할 수 있는 로직을 추가합니다.
        // 예: voteCount.put(courseId, currentCount + 1);

        return voteCount;
    }
    
    @Transactional(readOnly = true)
    public List<Vote> getListMyVote(String memId) {
    	System.out.println("보트 서비스 내 투표 리스트 memId : "+ memId);
    	System.out.println("보트 서비스 내 투표 리스트 voteRepository.findByMemIdAndIsEnded(memId, false : "+ voteRepository.findByMemId(memId));
        List<Vote> votes = voteRepository.findByMemId(memId);
        // Force initialization of participantIds collection
        votes.forEach(vote -> vote.getParticipantIds().size());
        return votes;
    }
    
//	public List<Vote> getListMyVote(String memId) {
//		
//		return voteRepository.findByMemId(memId);
//	}
	
	public List<Vote> getListEndedMyVote(String memId){
		return voteRepository.findByMemId(memId);
	}
	
	public List<Vote> getListInvitedVote(String memId){
		
		return voteRepository.findActiveInvitedVotes(memId, false);
	}
	
	public List<Vote> getListEndedInvitedVote(String memId){
		return voteRepository.findActiveInvitedVotes(memId, true);
	}

    
}

package com.study.spring.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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

    // 투표 생성
   

    // 투표 생성하기
    public Vote createVote(Vote vote) {
        return voteRepository.save(vote);
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
    @Transactional
    public Optional<Vote> getVoteById(Long voteId) {
        return voteRepository.findById(voteId);
    }

    // 투표 종료
    @Transactional
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
    @Transactional
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
    @Transactional
	public List<Vote> getListEndedMyVote(String memId){
		return voteRepository.findByMemId(memId);
	}
    @Transactional
	public List<Vote> getListInvitedVote(String memId){
		
		return voteRepository.findActiveInvitedVotes(memId, false);
	}
    @Transactional
	public List<Vote> getListEndedInvitedVote(String memId){
		return voteRepository.findActiveInvitedVotes(memId, true);
	}

    
}

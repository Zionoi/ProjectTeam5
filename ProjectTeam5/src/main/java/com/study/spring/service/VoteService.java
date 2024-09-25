package com.study.spring.service;

import com.study.spring.domain.Friends;
import com.study.spring.domain.Vote;
import com.study.spring.domain.WalkingCourse;
import com.study.spring.repository.FriendsRepository;
import com.study.spring.repository.VoteRepository;
import com.study.spring.repository.WalkingCourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private WalkingCourseRepository walkingCourseRepository;
    
    @Autowired
    private FriendsRepository friendsRepository;  // 친구 리포지토리

    // 투표 생성
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
	
   
}

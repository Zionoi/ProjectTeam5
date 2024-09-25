package com.study.spring.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.spring.domain.Vote;
import com.study.spring.repository.VoteRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    // 투표 정보 가져오기
    public Vote getVoteById(Long voteId) {
        return voteRepository.findById(voteId).orElseThrow(() -> new RuntimeException("Vote not found"));
    }

    // 투표 생성하기
    public Vote createVote(Vote vote) {
        return voteRepository.save(vote);
    }

    // 투표하기
    public Map<String, Integer> vote(Long voteId, String courseId, String userId) {
        Vote vote = getVoteById(voteId);
        Map<String, Integer> voteCount = new HashMap<>();

        if (vote.isEnded()) {
            throw new RuntimeException("Vote has ended");
        }

        // 투표 수 업데이트 로직
        // 여기에서 투표 수를 업데이트할 수 있는 로직을 추가합니다.
        // 예: voteCount.put(courseId, currentCount + 1);

        return voteCount;
    }

    // 투표 종료하기
    public Vote endVote(Long voteId) {
        Vote vote = getVoteById(voteId);
        vote.setEnded(true);
        return voteRepository.save(vote);
    }
}

package com.study.spring.service;

import com.study.spring.domain.Vote;
import com.study.spring.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    // 투표 생성
    public Vote createVote(Vote vote) {
        return voteRepository.save(vote);
    }

    // 투표 조회
    public List<Vote> getAllVotes() {
        return voteRepository.findAll();
    }

    // 특정 투표 조회
    public Optional<Vote> getVoteById(Long voteId) {
        return voteRepository.findById(voteId);
    }

    // 투표 종료 (종료 상태로 변경)
    public Vote endVote(Long voteId) {
        Optional<Vote> optionalVote = voteRepository.findById(voteId);
        if (optionalVote.isPresent()) {
            Vote vote = optionalVote.get();
            vote.setEnded(true);  // 투표 종료 상태로 변경
            return voteRepository.save(vote);
        }
        throw new RuntimeException("Vote not found");
    }
}

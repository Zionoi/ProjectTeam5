package com.study.spring.controller;

import com.study.spring.domain.Vote;
import com.study.spring.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/votes")
public class VoteController {

    @Autowired
    private VoteService voteService;

    // 투표 생성
    @PostMapping("/create")
    public Vote createVote(@RequestBody Vote vote) {
        return voteService.createVote(vote);
    }

    // 모든 투표 조회
    @GetMapping
    public List<Vote> getAllVotes() {
        return voteService.getAllVotes();
    }

    // 특정 투표 조회
    @GetMapping("/{id}")
    public Optional<Vote> getVoteById(@PathVariable Long id) {
        return voteService.getVoteById(id);
    }

    // 투표 종료
    @PostMapping("/{id}/end")
    public Vote endVote(@PathVariable Long id) {
        return voteService.endVote(id);
    }
}

package com.study.spring.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.study.spring.domain.Vote;
import com.study.spring.service.VoteService;

@RestController
@RequestMapping("/votes")
public class VoteController {

    @Autowired
    private VoteService voteService;

    // 투표 정보 가져오기
    @GetMapping("/{voteId}")
    public Vote getVote(@PathVariable Long voteId) {
        return voteService.getVoteById(voteId);
    }

    // 투표 생성하기
    @PostMapping("/create")
    public Vote createVote(@RequestBody Vote vote) {
        return voteService.createVote(vote);
    }

    // 투표하기
    @PostMapping("/{voteId}/vote")
    public Map<String, Integer> vote(@PathVariable Long voteId, @RequestBody Map<String, String> payload) {
        String courseId = payload.get("courseId");
        String userId = payload.get("userId");
        return voteService.vote(voteId, courseId, userId);
    }

    // 투표 종료하기
    @PostMapping("/{voteId}/end")
    public Vote endVote(@PathVariable Long voteId) {
        return voteService.endVote(voteId);
    }
}

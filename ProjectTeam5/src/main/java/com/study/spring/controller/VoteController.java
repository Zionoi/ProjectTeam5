package com.study.spring.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.study.spring.domain.Friends;
import com.study.spring.domain.Vote;
import com.study.spring.domain.WalkingCourse;
import com.study.spring.service.VoteService;

@RestController
@RequestMapping("/votes")
public class VoteController {

	@Autowired
    private VoteService voteService;

    

    // 투표 생성하기
    @PostMapping("/create")
    public Vote createVote(@RequestBody Vote vote) {
        return voteService.createVote(vote);
    }
 // 모든 산책로 목록 가져오기
    @GetMapping("/walking/courses")
    public List<WalkingCourse> getAllWalkingCourses() {
        return voteService.getAllWalkingCourses();
    }

    // 모든 친구 목록 가져오기
    @GetMapping("/friends")
    public List<Friends> getAllFriends() {
        return voteService.getAllFriends();
    }

    // 모든 투표 조회
    @GetMapping
    public List<Vote> getAllVotes() {
        return voteService.getAllVotes();
    }

    // 특정 투표 조회
    @GetMapping("/{id}")
    public Vote getVoteById(@PathVariable Long id) {
        return voteService.getVoteById(id).get();
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

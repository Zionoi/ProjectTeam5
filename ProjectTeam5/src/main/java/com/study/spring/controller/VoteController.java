package com.study.spring.controller;

import com.study.spring.domain.Vote;
import com.study.spring.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/votes")
public class VoteController {

    @Autowired
    private VoteService voteService;

//    // 투표 생성
//    @PostMapping("/create/{hostId}")
//    public Vote createVote(@RequestBody Vote vote, @RequestParam List<Long> walkingCourseEsntlIds, @PathVariable String hostId) {
//        return voteService.createVote(vote, walkingCourseEsntlIds, hostId);
//    }
//
//    // 투표 종료
//    @PutMapping("/end/{voteId}")
//    public Vote endVote(@PathVariable Long voteId) {
//        return voteService.endVote(voteId);
//    }
//
//    // 투표 목록 조회 (optional)
//    @GetMapping("/list/{hostId}")
//    public List<Vote> getAllVotes() {
//        return voteService.getAllVotes();
//    }
}

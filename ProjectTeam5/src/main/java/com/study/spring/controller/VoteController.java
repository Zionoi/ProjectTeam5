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
	    // 프론트엔드에서 전달된 데이터 출력
	    System.out.println("Received vote data: " + vote);
	    
	    // vote 객체가 올바르게 생성되어 있는지 확인
	    if (vote.getParticipantIds() == null || vote.getParticipantIds().isEmpty()) {
	        System.out.println("No participant IDs provided");
	    } else {
	        System.out.println("Participant IDs: " + vote.getParticipantIds());
	    }

	    Vote savedVote = voteService.createVote(vote); // 저장된 투표 반환
	    return savedVote; // 저장된 투표 객체 반환
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
    
    //자신의 투표만 조회
    @GetMapping("/list/{memId}")
    public List<Vote> getListMyVote(@PathVariable String memId) {
    	System.out.println("내 투표리스트 memId : "+ memId);
    	System.out.println("내 투표리스트 voteService.getListMyVote(memId) : "+ voteService.getListMyVote(memId));
        return voteService.getListMyVote(memId);
    }
    
    //자신의 투표 끝난 것만 조회
    @GetMapping("/closedList/myVotes/{memId}")
    public List<Vote> getListEndedMyVote(@PathVariable String memId) {
        return voteService.getListEndedMyVote(memId);
    }
    
    //친구로 초대받은 투표만 조회
    @GetMapping("/list/invitedVotes/{memId}")
    public List<Vote> getListInvitedVote(@PathVariable String memId) {
        return voteService.getListInvitedVote(memId);
    }
    
    //친구로 초대받은 끝난 투표만 조회
    @GetMapping("/closedList/invitedVotes/{memId}")
    public List<Vote> getListEndedInvitedVote(@PathVariable String memId) {
        return voteService.getListEndedInvitedVote(memId);
    }
}

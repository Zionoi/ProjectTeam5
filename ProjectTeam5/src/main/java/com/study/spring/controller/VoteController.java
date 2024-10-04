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
        // 입력 데이터 유효성 검사
        if (vote.getVoteTitle() == null || vote.getVoteTitle().isEmpty()) {
            throw new IllegalArgumentException("투표 제목이 입력되지 않았습니다.");
        }
        if (vote.getMemId() == null || vote.getMemId().isEmpty()) {
            throw new IllegalArgumentException("생성자 ID가 입력되지 않았습니다.");
        }
        if (vote.getVoteEsntlId() == null || vote.getVoteEsntlId().isEmpty()) {
            throw new IllegalArgumentException("산책 코스가 선택되지 않았습니다.");
        }
        if (!vote.isOpenToAllFriends() && (vote.getParticipantIds() == null || vote.getParticipantIds().isEmpty())) {
            throw new IllegalArgumentException("참여자 ID 목록이 입력되지 않았습니다.");
        }

        // 로그 출력
        System.out.println("Received vote data: " + vote);

        // 투표 생성
        Vote savedVote = voteService.createVote(vote);
        return savedVote;
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
        return voteService.getVoteById(id).orElseThrow(() -> new RuntimeException("투표를 찾을 수 없습니다."));
    }

    // 투표하기
    @PostMapping("/{voteId}/vote")
    public Map<String, Integer> vote(@PathVariable Long voteId, @RequestBody Map<String, String> payload) {
        String courseId = payload.get("courseId");
        String userId = payload.get("userId");

        // 이미 투표한 유저인지 확인
        Vote vote = voteService.getVoteById(voteId).orElseThrow(() -> new RuntimeException("투표를 찾을 수 없습니다."));
        if (vote.getVotedUserIds().contains(userId)) {
            throw new IllegalArgumentException("이미 투표를 하셨습니다.");
        }

        // 투표 진행 및 사용자 선택한 코스 ID 저장
        Map<String, Integer> result = voteService.vote(voteId, courseId, userId);

        // 사용자가 선택한 코스 ID 저장
        voteService.vote(voteId, userId, courseId);

        return result;
    }

    // 투표 종료하기
    @PostMapping("/{voteId}/end")
    public Vote endVote(@PathVariable Long voteId) {
        return voteService.endVote(voteId);
    }

    // 자신의 투표만 조회
    @GetMapping("/list/{memId}")
    public List<Vote> getListMyVote(@PathVariable String memId) {
        return voteService.getListMyVote(memId);
    }

    // 자신의 투표 끝난 것만 조회
    @GetMapping("/closedList/myVotes/{memId}")
    public List<Vote> getListEndedMyVote(@PathVariable String memId) {
        return voteService.getListEndedMyVote(memId);
    }

    // 친구로 초대받은 투표만 조회
    @GetMapping("/list/invitedVotes/{memId}")
    public List<Vote> getListInvitedVote(@PathVariable String memId) {
        return voteService.getListInvitedVote(memId);
    }

    // 친구로 초대받은 끝난 투표만 조회
    @GetMapping("/closedList/invitedVotes/{memId}")
    public List<Vote> getListEndedInvitedVote(@PathVariable String memId) {
        return voteService.getListEndedInvitedVote(memId);
    }
}

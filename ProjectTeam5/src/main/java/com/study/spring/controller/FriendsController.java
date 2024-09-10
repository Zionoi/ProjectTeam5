package com.study.spring.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.study.spring.domain.Friends;
import com.study.spring.domain.Member;  // 이 부분 추가
import com.study.spring.service.FriendsService;

//클라이언트로부터의 요청을 처리하는 컨트롤러
@RestController
@RequestMapping("/friends") // '/friends' 경로로 요청을 받음
public class FriendsController {
    @Autowired
    private FriendsService friendsService;

    // 친구 요청을 보내는 엔드포인트
    @PostMapping("/sendRequest")
    public String sendFriendRequest(@RequestParam String memId, @RequestParam String friendId) {
        Friends friends = new Friends();
        
        // 요청을 보낸 사용자의 memId 설정 (new Member에 memId 넘겨줌)
        Member member = new Member();  // 새로운 Member 객체 생성
        member.setMemId(memId);        // memId를 설정 (필드명이 memId일 경우)

        friends.setMember(member); // Member 객체를 Friends 엔티티에 설정
        friends.setFriendId(friendId); // 요청을 받을 사용자의 ID 설정
        friendsService.addFriendRequest(friends); // 친구 요청 추가
        return "Friend request sent.";
    }

    // 내가 보낸 대기 상태의 친구 요청을 조회하는 엔드포인트
    @GetMapping("/pendingRequests")
    public List<Friends> getPendingRequests(@RequestParam String memId) {
        return friendsService.getPendingRequests(memId);
    }

    // 내가 받은 대기 상태의 친구 요청을 조회하는 엔드포인트
    @GetMapping("/pendingReceivedRequests")
    public List<Friends> getPendingReceivedRequests(@RequestParam String friendId) {
        return friendsService.getPendingReceivedRequests(friendId);
    }

    // 친구 요청을 수락하는 엔드포인트
    @PostMapping("/accept")
    public String acceptFriendRequest(@RequestParam Long fNum) {
        friendsService.acceptFriendRequest(fNum);
        return "Friend request accepted.";
    }

    // 친구 요청을 거절하는 엔드포인트
    @PostMapping("/reject")
    public String rejectFriendRequest(@RequestParam Long fNum) {
        friendsService.rejectFriendRequest(fNum);
        return "Friend request rejected.";
    }

    // 친구를 삭제하는 엔드포인트
    @PostMapping("/delete")
    public String deleteFriend(@RequestParam Long fNum) {
        friendsService.deleteFriend(fNum);
        return "Friend deleted.";
    }

    // 친구 목록을 조회하는 엔드포인트
    @GetMapping("/total")
    public List<Friends> totalFriend(@RequestParam String memId) {
        return friendsService.totalFriend(memId);  // memId에 따라 친구 목록을 조회
    }
}

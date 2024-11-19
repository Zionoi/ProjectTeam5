package com.study.spring.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.study.spring.domain.Friends;
import com.study.spring.domain.Member;
import com.study.spring.repository.MemberRepository;
import com.study.spring.service.FriendsService;

@RestController
@RequestMapping("/friends")
public class FriendsController {
    @Autowired
    private FriendsService friendsService;
    @Autowired
    private MemberRepository memberRepository;

    // 친구 요청을 보내는 엔드포인트
    @PostMapping("/sendRequest")
    public String sendFriendRequest(@RequestParam String memId, @RequestParam String friendId) {
        System.out.println("친구 요청: memId = " + memId + ", friendId = " + friendId); // 데이터 확인용 로그

        Friends friends = new Friends();
        
        // 요청을 보낸 사용자의 memId 설정
        Member member = new Member();
        member.setMemId(memId); // memId 설정

        friends.setMember(member); // Member 객체를 Friends 엔티티에 설정
        friends.setFriendId(friendId); // 요청을 받을 사용자의 ID 설정
        if(friendsService.addFriendRequest(friends))// 친구 요청 추가
        	return "친구 요청 성공!";
        else
        	return "이미 친구 요청하였거나 블락된 아이디입니다.";
    }

    // 내가 보낸 대기 상태의 친구 요청을 조회하는 엔드포인트
    @GetMapping("/pendingRequests")
    public List<Friends> getPendingRequests(@RequestParam String memId) {
        System.out.println("내가 보낸 대기 중인 요청 조회: memId = " + memId); // 데이터 확인용 로그
        return friendsService.getPendingRequests(memId);
    }

    // 내가 받은 대기 상태의 친구 요청을 조회하는 엔드포인트
    @GetMapping("/pendingReceivedRequests")
    public List<Friends> getPendingReceivedRequests(@RequestParam String friendId) {
        System.out.println("내가 받은 대기 중인 요청 조회: friendId = " + friendId); // 데이터 확인용 로그
        return friendsService.getPendingReceivedRequests(friendId);
    }

    // 친구 요청을 수락하는 엔드포인트
    @PostMapping("/accept")
    public String acceptFriendRequest(@RequestParam Long fNum) {
        System.out.println("친구 요청 수락: fNum = " + fNum); // 데이터 확인용 로그
        friendsService.acceptFriendRequest(fNum);
        return "친구 요청 수락";
    }

    // 친구 요청을 거절하는 엔드포인트
    @PostMapping("/reject")
    public String rejectFriendRequest(@RequestParam Long fNum) {
        System.out.println("친구 요청 거절: fNum = " + fNum); // 데이터 확인용 로그
        friendsService.rejectFriendRequest(fNum);
        return "친구 요청 거절";
    }

    // 친구를 삭제하는 엔드포인트
    @PostMapping("/delete")
    public String deleteFriend(@RequestParam Long fNum) {
        System.out.println("친구 삭제: fNum = " + fNum); // 데이터 확인용 로그
        friendsService.deleteFriend(fNum);
        return "success";
    }
    
//    @GetMapping("/total")
//    public List<?> totalFriend(@RequestParam String memId) {
//        Optional<Member> optionalMember = memberRepository.findById(memId);
//        Member member = optionalMember.get();
//        
//        // 친구 목록 공개 여부에 따른 처리
//        if (member.isFriendListOpen()) {
//            List<Friends> friends = friendsService.totalFriend(memId);
//            return friendsService.totalFriend(memId);
//        } else {
//            Map<String, String> response = new HashMap<>();
//            response.put("친구목록", "비공개");
//            return (List<?>) ResponseEntity.ok(response); // JSON 형식으로 반환
//        }
//    }
    // 친구 목록을 조회하는 엔드포인트
    @GetMapping("/total")
    public List<Friends> totalFriend(@RequestParam String memId) {
        System.out.println("친구 목록 조회: memId = " + memId); // 데이터 확인용 로그
        return friendsService.totalFriend(memId);
    }
    
    @PostMapping("/blockUser")
    public String blockUser(@RequestParam String memId, @RequestParam String blockId) {
    	
    	return friendsService.blockUser(memId, blockId);
    }
    
    
    @GetMapping("/isBlocked")
    public Boolean isBlocked(@RequestParam String memId, @RequestParam String targetId) {
        boolean isBlocked = friendsService.isBlock(memId, targetId);
        return isBlocked;
    }
}

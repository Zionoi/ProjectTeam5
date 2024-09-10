package com.study.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.study.spring.domain.Friends;
import com.study.spring.service.FriendsService;

@RestController
@RequestMapping("/friends")
public class FriendsController {
    @Autowired
    private FriendsService friendsService;

    // 친구 db에 한개 작성
    @PostMapping("/add")
    public String addFriends(Friends friends) {
        friendsService.addFriends(friends);
        return "친구 추가 완료";
    }

    // 특정 사용자의 친구 목록 불러오기
    @GetMapping("/total")
    public List<Friends> totalFriend(@RequestParam("userId") String userId) {
    	System.out.println("친구컨트롤러 : " + userId);
        return friendsService.totalFriend(userId); // 사용자 ID로 친구 목록 반환
    }

    // 한명의 친구 정보 가져오기
    @GetMapping("/detail")
    public Friends detailFriend(@RequestParam("fnum") Long fNum) {
        return friendsService.detailFriend(fNum).get();
    }
}

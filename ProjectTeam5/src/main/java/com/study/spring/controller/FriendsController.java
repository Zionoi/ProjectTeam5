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
@RequestMapping("/Friends")
public class FriendsController {
	@Autowired
	private FriendsService friendsService;
	
	//친구 db에 한개 작성
	@PostMapping("/add")
	public String addFriends(Friends friends) {
		
		friendsService.addFriends(friends);
		
		return "친구 추가 완료";
	}
	
	// 모든 친구 불러오기
	@GetMapping("/total")
	public List<Friends> totalFriend(){
		List<Friends> list = friendsService.totalFriend();
		return list;
	}
	
	//한명의 친구 정보 가져오기
	@GetMapping("/detail")
	public Friends detailFriend(@RequestParam("fnum") Long fNum)
	{
		return friendsService.detailFriend(fNum).get();
	}
}

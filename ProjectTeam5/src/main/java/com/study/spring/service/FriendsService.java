package com.study.spring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.spring.domain.Friends;
import com.study.spring.repository.FriendsRepository;

@Service
public class FriendsService {
	@Autowired
	private FriendsRepository friendsRepository;

	public void addFriends(Friends friends) {
		friendsRepository.save(friends);
	}

	public List<Friends> totalFriend() {
		
		return friendsRepository.findAll();
	}

	public Optional<Friends> detailFriend(Long fNum) {
		
		return friendsRepository.findById(fNum);
	}


}

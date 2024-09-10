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

    // 친구 추가
    public void addFriends(Friends friends) {
        friendsRepository.save(friends);
    }

    // 특정 사용자의 친구 목록 가져오기
    public List<Friends> totalFriend(String userId) {
        return friendsRepository.findByMember_MemId(userId); // 사용자 ID로 친구 목록 조회
    }

    // 한명의 친구 정보 가져오기
    public Optional<Friends> detailFriend(Long fNum) {
        return friendsRepository.findById(fNum);
    }
}

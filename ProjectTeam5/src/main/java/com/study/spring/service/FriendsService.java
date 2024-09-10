package com.study.spring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.spring.domain.Friends;
import com.study.spring.repository.FriendsRepository;

// 친구 요청 및 수락/거절 등 비즈니스 로직을 처리하는 서비스
@Service
public class FriendsService {
    @Autowired
    private FriendsRepository friendsRepository;

    // 친구 요청을 보내는 메서드
    public void addFriendRequest(Friends friends) {
        friends.setStatus("pending"); // 요청 상태를 '대기(pending)'로 설정
        friendsRepository.save(friends); // DB에 저장
    }

    // 내가 보낸 대기 상태의 친구 요청을 조회하는 메서드
    public List<Friends> getPendingRequests(String memId) {
        return friendsRepository.findByMemberMemIdAndStatus(memId, "pending");
    }

    // 나에게 온 대기 상태의 친구 요청을 조회하는 메서드
    public List<Friends> getPendingReceivedRequests(String friendId) {
        return friendsRepository.findByFriendIdAndStatus(friendId, "pending");
    }

    // 친구 요청을 수락하는 메서드
    public void acceptFriendRequest(Long fNum) {
        Optional<Friends> friendRequest = friendsRepository.findById(fNum);
        if (friendRequest.isPresent()) {
            Friends friends = friendRequest.get();
            friends.setStatus("accepted"); // 상태를 '수락(accepted)'으로 변경
            friendsRepository.save(friends); // DB에 저장
        }
    }

    // 친구 요청을 거절하는 메서드
    public void rejectFriendRequest(Long fNum) {
        Optional<Friends> friendRequest = friendsRepository.findById(fNum);
        if (friendRequest.isPresent()) {
            Friends friends = friendRequest.get();
            friends.setStatus("rejected"); // 상태를 '거절(rejected)'으로 변경
            friendsRepository.save(friends); // DB에 저장
        }
    }

    // 친구 관계를 삭제하는 메서드
    public void deleteFriend(Long fNum) {
        friendsRepository.deleteById(fNum); // DB에서 해당 친구 관계를 삭제
    }

    // 사용자의 모든 친구 목록을 조회하는 메서드 (수락된 친구만 조회)
    public List<Friends> totalFriend(String memId) {
        return friendsRepository.findByMemberMemIdAndStatus(memId, "accepted");  // memId로 필터링
    }

    // 친구 정보를 조회하는 메서드
    public Optional<Friends> detailFriend(Long fNum) {
        return friendsRepository.findById(fNum);
    }
}

package com.study.spring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.spring.domain.Friends;
import com.study.spring.domain.Member;
import com.study.spring.repository.FriendsRepository;

@Service
public class FriendsService {
    @Autowired
    private FriendsRepository friendsRepository;

    // 친구 요청을 보내는 메서드
    public void addFriendRequest(Friends friends) {
        friends.setStatus("대기"); // 요청 상태를 '대기'로 설정
        friendsRepository.save(friends); // DB에 저장
    }

    // 내가 보낸 대기 상태의 친구 요청을 조회하는 메서드
    public List<Friends> getPendingRequests(String memId) {
        return friendsRepository.findByMemberMemIdAndStatus(memId, "대기");
    }

    // 나에게 온 대기 상태의 친구 요청을 조회하는 메서드
    public List<Friends> getPendingReceivedRequests(String friendId) {
        return friendsRepository.findByFriendIdAndStatus(friendId, "대기");
    }

    // 친구 요청을 수락하는 메서드
    public void acceptFriendRequest(Long fNum) {
    	Optional<Friends> friendRequest = friendsRepository.findById(fNum);
        if (friendRequest.isPresent()) {
            Friends friends = friendRequest.get();
            
            // 요청을 보낸 사람과 수락한 사람 모두 친구 목록에 추가
            friends.setStatus("수락"); // 상태를 '수락'으로 변경
            friendsRepository.save(friends); // 요청 보낸 사람의 상태 저장
            
            // 요청을 수락한 사람도 친구 관계 추가
            Friends reverseFriends = new Friends();
            
            Member acceptingMember = new Member(); // 요청을 수락한 사람의 Member 객체 생성
            acceptingMember.setMemId(friends.getFriendId()); // 요청을 받은 사람의 ID를 설정 (수락한 사람)

            reverseFriends.setMember(acceptingMember); // 수락한 사람을 Friends 엔티티에 설정
            reverseFriends.setFriendId(friends.getMember().getMemId()); // 요청 보낸 사람의 ID를 설정
            reverseFriends.setStatus("수락"); // 상태를 '수락'으로 설정
            friendsRepository.save(reverseFriends); // 수락한 사람의 친구 관계 저장
        }
    }

    // 친구 요청을 거절하는 메서드
    public void rejectFriendRequest(Long fNum) {
        Optional<Friends> friendRequest = friendsRepository.findById(fNum);
        if (friendRequest.isPresent()) {
            Friends friends = friendRequest.get();
            friends.setStatus("거절"); // 상태를 '거절'으로 변경
            friendsRepository.save(friends); // DB에 저장
        }
    }

    // 친구 관계를 삭제하는 메서드
    public void deleteFriend(Long fNum) {
        friendsRepository.deleteById(fNum); // DB에서 해당 친구 관계를 삭제
    }

    // 사용자의 모든 친구 목록을 조회하는 메서드 (수락된 친구만 조회)
    public List<Friends> totalFriend(String memId) {
        return friendsRepository.findByMemberMemIdAndStatus(memId, "수락");
    }

    // 친구 정보를 조회하는 메서드
    public Optional<Friends> detailFriend(Long fNum) {
        return friendsRepository.findById(fNum);
    }
}

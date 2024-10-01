package com.study.spring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.spring.domain.Friends;
import com.study.spring.domain.Member;
import com.study.spring.repository.FriendsRepository;
import com.study.spring.repository.MemberRepository;

@Service
public class FriendsService {

    @Autowired
    private FriendsRepository friendsRepository;
    
    @Autowired
    private MemberRepository memberRepository;

     // 친구 요청을 보내는 메서드
    public boolean addFriendRequest(Friends friends) {
        // memId와 friendId로 이미 친구 요청이 있는지 확인
        Optional<Friends> existingFriendRequest = friendsRepository.findByMember_MemIdAndFriendId(
                friends.getMember().getMemId(), friends.getFriendId());
        
        Optional<Friends> blockFriendRequest = friendsRepository.findByMember_MemIdAndFriendIdAndStatus(
        		friends.getMember().getMemId(), friends.getFriendId(), "차단");
        Optional<Friends> blockedFriendRequest = friendsRepository.findByMember_MemIdAndFriendIdAndStatus(
        		friends.getFriendId(), friends.getMember().getMemId(), "차단");

        // 이미 친구 요청이 있으면 false 반환, 없으면 요청을 저장
        if (existingFriendRequest.isPresent() || blockFriendRequest.isPresent()||
        		blockedFriendRequest.isPresent()) {
        	return false; 

        } else {
            friends.setStatus("대기"); // 요청 상태를 '대기'로 설정
            friendsRepository.save(friends); // DB에 저장
            return true;
        }
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
        // 해당 친구 관계를 가져옴
        Friends friends = friendsRepository.findById(fNum).orElseThrow(() -> new IllegalArgumentException("해당 친구 관계를 찾을 수 없습니다."));

        // 상대방이 저장한 친구 관계를 찾음 (friendId가 내 memId인 경우)
        Optional<Friends> friendOfFriends = friendsRepository.findByMember_MemIdAndFriendId(friends.getFriendId(), friends.getMember().getMemId());

        // 상대방의 친구 관계가 존재하면 삭제
        friendOfFriends.ifPresent(friend -> friendsRepository.deleteById(friend.getFNum()));

        // 내 친구 관계 삭제
        friendsRepository.deleteById(fNum);
    }

    // 사용자의 모든 친구 목록을 조회하는 메서드 (수락된 친구만 조회)
    public List<Friends> totalFriend(String memId) {
        return friendsRepository.findByMemberMemIdAndStatus(memId, "수락");
    }

    // 친구 정보를 조회하는 메서드
    public Optional<Friends> detailFriend(Long fNum) {
        return friendsRepository.findById(fNum);
    }

	public String blockUser(String memId, String blockId) {
		Optional<Friends> existingFriend = friendsRepository.findByMember_MemIdAndFriendIdAndStatus(memId, blockId, "수락");
		Optional<Friends> existingBlock = friendsRepository.findByMember_MemIdAndFriendIdAndStatus(memId, blockId, "차단");
		//이미 친구 상태라면
		if(existingFriend.isPresent())
		{
			return "친구를 차단할 수 없습니다.";
		}
		else if(existingBlock.isPresent()) {
			return "이미 차단 중입니다";
		}
		else {
			Friends block = new Friends();
			
			// 내 아이디
			Member m = memberRepository.findById(memId).get();
			block.setMember(m);
			block.setFriendId(blockId);
			block.setStatus("차단");
			friendsRepository.save(block);
			
			return "해당 사용자를 차단되었습니다";
		}
		
	}

	public boolean isBlock(String memId, String targetId) {
		return friendsRepository.existsByMember_MemIdAndFriendIdAndStatus(memId, targetId, "차단") || 
				friendsRepository.existsByMember_MemIdAndFriendIdAndStatus(targetId, memId, "차단");
	}
}
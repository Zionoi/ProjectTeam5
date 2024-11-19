package com.study.spring.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import com.study.spring.domain.Friends;
import com.study.spring.domain.Message;
import com.study.spring.repository.FriendsRepository;
import com.study.spring.repository.MessageRepository;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private FriendsRepository friendsRepository;

    // 메시지 전송
    public Message sendMessage(Message message) {
       System.out.println("서비스 메시지 전송 : "  + message);
       
        return messageRepository.save(message);
    }

    // 수신자가 받은 메시지 리스트 조회 (내림차순 정렬)
    public List<Message> getReceivedMessages(String friendId) {
       // 메시지 번호(mNum)를 기준으로 내림차순(DESC) 정렬
        return messageRepository.findByFriendId(friendId, Sort.by(Sort.Direction.DESC, "mNum"));
    }
    
    public Message getMessageById(Long mNum) {
        Optional<Message> message = messageRepository.findById(mNum);
        return message.orElse(null);  // Optional 처리
    }

    // 메시지 읽음 처리
    public void markMessageAsRead(Long mNum) {
        messageRepository.markMessageAsRead(mNum);
    }

    // 메시지 삭제
    public void deleteMessage(Long mNum) {
        messageRepository.deleteById(mNum);
    }
    
    // 메시지를 발송하는 메서드(투표)
    public boolean sendMessage(String memId, String friendId, String content) {
    	Optional<Friends> checkFriend = friendsRepository.findByMember_MemIdAndFriendIdAndStatus(memId, friendId, "수락");
    	
    	if(checkFriend.isPresent()) {
    		
        	// 메시지 엔티티 생성
            Message message = new Message();
            message.setMemId(memId);  // 발신자 ID 설정
            message.setFriendId(friendId);  // 수신자 ID 설정
            message.setMcontent(content);  // 메시지 내용 설정
            message.setCreateSysdate(LocalDateTime.now());  // 메시지 생성 시간 설정
            message.setIsReading(1);  // 읽음 여부 기본값 (1: 읽지 않음)

            // 메시지 저장
            messageRepository.save(message);
    		
    		return true;
    	}else
    	{
    		return false;
    	}

    }
}

package com.study.spring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import com.study.spring.domain.Message;
import com.study.spring.repository.MessageRepository;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

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
}

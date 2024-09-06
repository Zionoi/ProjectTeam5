package com.study.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.spring.domain.Message;
import com.study.spring.repository.MessageRepository;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    // 메시지 전송
    public Message sendMessage(Message message) {
    	System.out.println("서"+message);
    	
        return messageRepository.save(message);
    }

    // 수신자가 받은 메시지 리스트 조회
    public List<Message> getReceivedMessages(String friendId) {
        return messageRepository.findByFriendId(friendId);
    }
}

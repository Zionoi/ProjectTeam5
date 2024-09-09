package com.study.spring.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.study.spring.domain.Message;
import com.study.spring.service.MessageService;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    // 메시지 전송 API
    @PostMapping("/send")
    public Message sendMessage(@RequestBody Message message) {
    	
        return messageService.sendMessage(message);
    }

    // 특정 사용자가 받은 메시지 조회 API
    @GetMapping("/received/{friendId}")
    public List<Message> getReceivedMessages(@PathVariable String friendId) {
        return messageService.getReceivedMessages(friendId);
    }
    
    // 특정 메시지 조회 API
    @GetMapping("/detail/{m_num}")
    public Message getMessageDetail(@PathVariable("m_num") Long mNum) {
        return messageService.getMessageById(mNum);
    }

    // 메시지 읽음 처리 API
    @PostMapping("/read/{mNum}")
    public void markMessageAsRead(@PathVariable Long mNum) {
    	System.out.println("컨컨컨컨컨컨 메시지 읽음 : "  + mNum);
        messageService.markMessageAsRead(mNum);
    }

    // 메시지 삭제 API
    @DeleteMapping("/delete/{mNum}")
    public void deleteMessage(@PathVariable String mNum) {
    	System.out.println("컨컨컨컨컨컨 메시지 삭제 : "  + mNum);
        messageService.deleteMessage(Long.valueOf(mNum));
    }
}

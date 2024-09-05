package com.study.spring.controller;

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
    	System.out.println("컨컨컨컨컨컨컨컨컨컨컨컨컨컨컨"+message);
    	return messageService.sendMessage(message);
    }

    // 특정 사용자가 받은 메시지 조회 API
    @GetMapping("/received/{friendId}")
    public List<Message> getReceivedMessages(@PathVariable String friendId) {
        return messageService.getReceivedMessages(friendId);
    }
}

// src/components/Inbox.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Inbox = () => {
  const [messages, setMessages] = useState([]);  // 받은 메시지 상태
  const [newMessages, setNewMessages] = useState(false);  // 새로운 메시지 확인 상태

  // 페이지 로드 시 받은 메시지 불러오기
  useEffect(() => {
    fetchMessages();
  }, []);

  // 메시지 조회 함수
  const fetchMessages = () => {
    axios.get(`http://localhost:8080/api/messages/received/user1`)
      .then(response => {
        setMessages(response.data);
        if (response.data.length > 0) {
          setNewMessages(true);  // 새 메시지 알림 설정
        }
      })
      .catch(error => console.error("Error fetching messages:", error));
  };

  // 메시지 삭제 함수
  const deleteMessage = (mNum) => {
    axios.delete(`http://localhost:8080/api/messages/delete/${mNum}`)
      .then(() => {
        fetchMessages();  // 삭제 후 목록 새로고침
      })
      .catch(error => console.error("Error deleting message:", error));
  };

  // 새로운 메시지 읽음 처리
  const markMessagesAsRead = () => {
    setNewMessages(false);  // 새로운 메시지 알림 제거
  };

  return (
    <div>
      <h2>Inbox</h2>
      
      {/* 새로운 메시지 알림 */}
      {newMessages && (
        <div style={{ color: 'red' }}>
          <p>You have new messages!</p>
          <button onClick={markMessagesAsRead}>Mark as Read</button> {/* 읽음 처리 버튼 */}
        </div>
      )}

      <ul>
        {messages.map(msg => (
          <li key={msg.mNum}>
            {msg.member.memId}: {msg.mContent} ({msg.createSysdate})
            <button onClick={() => deleteMessage(msg.mNum)}>Delete</button> {/* 삭제 버튼 */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inbox;

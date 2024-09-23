import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageDetail from '../message/MessageDetail'; // MessageDetail 컴포넌트 추가
import './Inbox.css';

const Inbox = ({ setContent, setSelectedMessage, checkUnreadMessages }) => {
  const [messages, setMessages] = useState([]);  // 받은 메시지 상태
  const [newMessages, setNewMessages] = useState(false);  // 새로운 메시지 확인 상태

  // 메시지 조회 함수
  const fetchMessages = () => {
    axios.get(`/api/messages/received/${localStorage.getItem("id")}`)
      .then(response => {
        setMessages(response.data);
        if (response.data.some(message => message.isReading === 1)) {
          setNewMessages(true);  // 새 메시지 알림 설정
        }
      })
      .catch(error => console.error("Error fetching messages:", error));
  };

  // 페이지 로드 시 받은 메시지 불러오기
  useEffect(() => {
    fetchMessages();
  }, []);

  // 메시지 세부사항 열기 및 읽음 처리
  const openMessageDetail = (message) => {
    setSelectedMessage(message);  // 선택한 메시지 설정
    setContent('messageDetail');  // 모달 내 콘텐츠를 'messageDetail'로 변경

    // 읽음 처리 API 호출
    if (message.isReading === 1) {
      axios.post(`/api/messages/read/${message.mnum}`)
        .then(() => {
          // 메시지 리스트를 다시 불러와 상태를 업데이트
          const updatedMessages = messages.map((msg) =>
            msg.mnum === message.mnum ? { ...msg, isReading: 0 } : msg
          );
          setMessages(updatedMessages);  // 로컬 상태 업데이트
          checkUnreadMessages();  // 읽지 않은 메시지가 남아있는지 체크
        })
        .catch(error => console.error("Error marking message as read:", error));
    }
  };

  // 메시지 삭제 함수
  const deleteMessage = (mNum) => {
    axios.delete(`/api/messages/delete/${mNum}`)
      .then(() => {
        alert('쪽지가 삭제되었습니다.');
        if (fetchMessages) fetchMessages(); // 쪽지 목록 새로고침
      })
      .catch(error => console.error("Error deleting message:", error));
  };

  return (
    <div className="inbox-container">
      <h2 className="inbox-header">쪽지함</h2>

      <div>
        {messages.length === 0 ? (
          <div>쪽지가 없습니다.~(&gt;_&lt;。)＼</div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`message-item ${message.isReading === 1 ? 'unread' : ''}`}
              onClick={() => openMessageDetail(message)}
            >
              <span className="message-sender">{message.memId}</span>
              님이 보낸 쪽지가 도착했습니다!
              <button
                className="message-delete-btn"
                onClick={(e) => { e.stopPropagation(); deleteMessage(message.mnum); }}
              >
                삭제
              </button>
              <span className="message-status">
                {message.isReading === 1 ? "읽지 않음" : "읽음"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Inbox;

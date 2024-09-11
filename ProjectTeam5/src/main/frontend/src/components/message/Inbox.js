import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../message/Modal'; // 모달 컴포넌트 추가

const Inbox = ({ setContent, isModalOpen, closeModal }) => {
  const [messages, setMessages] = useState([]);  // 받은 메시지 상태
  const [newMessages, setNewMessages] = useState(false);  // 새로운 메시지 확인 상태
  const [selectedMessage, setSelectedMessage] = useState(null); // 선택된 메시지

  // 메시지 조회 함수
  const fetchMessages = () => {
    axios.get(`/api/messages/received/user01`)
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

  // 메시지 세부사항 열기
  const openMessageDetail = (message) => {
    setSelectedMessage(message.mnum); // 메시지의 고유 ID(mNum)만 저장
    console.log(message.mnum);  // 콘솔확인
    setContent('messageDetail');      // 모달 전환
  };  

  // 메시지 삭제 함수
  const deleteMessage = (mNum) => {
    axios.delete(`/api/messages/delete/${mNum}`)
      .then(() => fetchMessages())
      .catch(error => console.error("Error deleting message:", error));
  };

  return (
    <div>
      <h2>쪽지함</h2>

      <div>
        {messages.length === 0 ? (
          <div>쪽지가 없습니다.~(&gt;_&lt;。)＼</div>
        ) : (
          messages.map((message, index) => (
            <div key={index} onClick={() => openMessageDetail(message)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
              {message.memId}님이 보낸 쪽지가 도착했습니다!&emsp;
              <button onClick={() => deleteMessage(message.mnum)}>삭제</button> &emsp;
              {message.isReading === 1 ? "읽지 않음" : "읽음"}
            </div>
          ))
        )}
      </div>

      {/* 새로운 메시지 알림 */}
      {newMessages && (
        <div style={{ color: 'red' }}>
          <p>You have new messages!</p>
        </div>
      )}

      {/* 모달을 통해 MessageDetail로 이동 */}
      {isModalOpen && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          content="messageDetail" 
          selectedMessage={selectedMessage}
          fetchMessages={fetchMessages} // fetchMessages 전달
        />
      )}
    </div>
  );
};

export default Inbox;

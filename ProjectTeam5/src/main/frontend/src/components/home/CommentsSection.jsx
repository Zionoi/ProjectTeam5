import React, { useState, useEffect } from 'react';
import Modal from '../message/Modal'; // 모달 컴포넌트 추가
import './CommentsSection.css'; // 스타일 파일을 추가합니다.
import axios from 'axios';

function CommentsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [modalContent, setModalContent] = useState('inbox'); // 모달 내 페이지 전환 관리
  const [selectedMessage, setSelectedMessage] = useState(null); // 선택된 메시지 상태 관리
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false); // 읽지 않은 메시지가 있는지 상태 관리

  // 쪽지함에서 읽지 않은 메시지 체크
  const checkUnreadMessages = () => {
    axios.get(`/api/messages/received/${localStorage.getItem("id")}`)
      .then(response => {
        const unreadMessages = response.data.some(message => message.isReading === 1);
        setHasUnreadMessages(unreadMessages);  // 읽지 않은 메시지가 있는지 상태 업데이트
      })
      .catch(error => console.error("Error fetching messages:", error));
  };

  // 페이지 로드 시 읽지 않은 메시지 체크
  useEffect(() => {
    checkUnreadMessages();  // 처음 페이지가 로드될 때 읽지 않은 메시지 확인
  }, []);

  const openModal = (content) => {
    setModalContent(content); // 모달 내용을 설정 (inbox, writeMessage 등)
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false);
    checkUnreadMessages();  // 모달이 닫힐 때 다시 체크하여 읽음 상태 업데이트
  };

  return (
    <div>
      <div className="comments-actions">
        {/* 쪽지 보내기 버튼 */}
        <button className="letter-button" onClick={() => openModal('writeMessage')}>
          쪽지 보내기
        </button>

        {/* 쪽지함 버튼 */}
        <button className="letter-button" onClick={() => openModal('inbox')}>
          쪽지함
        </button>

        {/* letterIcon 아이콘 색상 변경 */}
        <div 
          className={`letterIcon ${hasUnreadMessages ? 'unread' : 'read'}`} 
          // onClick={() => openModal('inbox')}
          >
        </div>
      </div>

      {/* 모달을 통해 쪽지 보내기 또는 쪽지함 표시 */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={modalContent}
        setContent={setModalContent}
        selectedMessage={selectedMessage} // 선택된 메시지 전달
        setSelectedMessage={setSelectedMessage} // 선택된 메시지 설정 함수 전달
        checkUnreadMessages={checkUnreadMessages} // 읽음 상태를 확인하는 함수 전달
      />
    </div>
  );
}

export default CommentsSection;

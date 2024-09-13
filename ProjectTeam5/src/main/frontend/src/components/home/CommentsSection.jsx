import Modal from '../message/Modal'; // 모달 컴포넌트 추가
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CommentsSection.css'; // 스타일 파일을 추가합니다.

function CommentsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [modalContent, setModalContent] = useState('inbox'); // 모달 내 페이지 전환 관리

  const openModal = (content) => {
    setModalContent(content); // 모달 내용을 설정 (inbox, writeMessage 등)
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => setIsModalOpen(false);

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

        <button className="letterIcon"></button>
      </div>

      {/* 모달을 통해 쪽지 보내기 또는 쪽지함 표시 */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={modalContent}
        setContent={setModalContent}
      />
    </div>
  );
}

export default CommentsSection;

// src/components/CommentsSection.js
import React, { useState } from 'react';
import Modal from '../message/Modal'; // 모달 컴포넌트 추가
import './CommentsSection.css'; // 스타일 파일을 추가합니다.
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');
</style>

function CommentsSection() {

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [modalContent, setModalContent] = useState('inbox'); // 모달 내 페이지 전환 관리

  const openModal = (content) => {
    setModalContent(content); // 모달 내용을 설정 (inbox, writeMessage 등)
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="comments-section">
      <h3 className="comments-co">사용자 코멘트</h3>
      <p className="comments-contents">국가는 노인과 청소년의 복지향상을 위한 정책을 실시할 의무를 진다. 언론·출판에 대한 허가나 검열과 집회·결사에 대한 허가는 인정되지 아니한다.</p>
      <div className="comments-actions">
        <button onClick={() => openModal('writeMessage')}>쪽지 보내기</button>  {/* 모달 */}
        <button onClick={() => openModal('inbox')}>쪽지함</button>   {/* 모달 */}
        <button className="letterIcon"></button>
      </div>

      {/* 모달을 통해 쪽지 보내기 또는 쪽지함 표시 */}
      <Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} setContent={setModalContent} />
    </div>
  );
}

export default CommentsSection;

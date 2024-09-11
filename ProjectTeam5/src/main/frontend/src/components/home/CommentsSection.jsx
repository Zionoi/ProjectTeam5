// src/components/CommentsSection.js

import Modal from '../message/Modal'; // 모달 컴포넌트 추가
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CommentsSection.css'; // 스타일 파일을 추가합니다.

function CommentsSection() {
  const [comment, setComment] = useState('');  // 코멘트 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null);  // 에러 상태
  const memId = localStorage.getItem('id');  // 로그인한 사용자 ID를 localStorage에서 가져옴
  const navigate = useNavigate();  // 페이지 이동을 위한 네비게이트 훅

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
      <p className="comments-contents">{comment}</p>  {/* 사용자 코멘트 출력 */}
      <div className="comments-actions">

        <button className="letter-button" onClick={() => openModal('writeMessage')}>쪽지 보내기</button>  {/* 모달 */}
        <button className="letter-button" onClick={() => openModal('inbox')}>쪽지함</button>   {/* 모달 */}

        <button className="letterIcon"></button>

      </div>

      {/* 모달을 통해 쪽지 보내기 또는 쪽지함 표시 */}
      <Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} setContent={setModalContent} />
    </div>
  );
}

export default CommentsSection;
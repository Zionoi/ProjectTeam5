// src/components/CommentsSection.js
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

  // 코멘트 가져오기
  useEffect(() => {
    if (!memId) {
      setError('로그인이 필요합니다.');
      setLoading(false);
      return;
    }

    // 서버에서 사용자 코멘트를 가져오는 요청
    axios.get(`/member/get/${memId}`)
      .then(response => {
        setComment(response.data.comments || ''); // 서버에서 받은 코멘트 설정
        setLoading(false);
      })
      .catch(() => {
        setError('사용자 코멘트를 가져오는 중 오류가 발생했습니다.');
        setLoading(false);
      });
  }, [memId]);

  if (loading) return <div>Loading...</div>;  // 로딩 중일 때 표시
  if (error) return <div>{error}</div>;  // 에러가 있을 때 표시

  return (
    <div className="comments-section">
      <h3 className="comments-co">사용자 코멘트</h3>
      <p className="comments-contents">{comment}</p>  {/* 사용자 코멘트 출력 */}
      <div className="comments-actions">
        <button onClick={() => navigate('/write')}>쪽지 보내기</button>  
        <button onClick={() => navigate('/inbox')}>쪽지함</button>
      </div>
    </div>
  );
}

export default CommentsSection;
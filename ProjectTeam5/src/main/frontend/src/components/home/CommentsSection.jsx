// src/components/CommentsSection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import WriteMessage from './message/WriteMessage';
import Inbox from './message/Inbox';
import './CommentsSection.css'; // 스타일 파일을 추가합니다.
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');
</style>

function CommentsSection() {

  const navigate = useNavigate();  // useNavigate로 변경

  return (
    <div className="comments-section">
      <h3 className="comments-co">사용자 코멘트</h3>
      <p className="comments-contents">국가는 노인과 청소년의 복지향상을 위한 정책을 실시할 의무를 진다. 언론·출판에 대한 허가나 검열과 집회·결사에 대한 허가는 인정되지 아니한다.</p>
      <div className="comments-actions">
        <button onClick={() => navigate('/write')}>쪽지 보내기</button>  {/* useNavigate로 경로 이동 */}
      <button onClick={() => navigate('/inbox')}>쪽지함</button>  {/* useNavigate로 경로 이동 */}
        <button className="letterIcon"></button>
      </div>
    </div>
  );
}

export default CommentsSection;

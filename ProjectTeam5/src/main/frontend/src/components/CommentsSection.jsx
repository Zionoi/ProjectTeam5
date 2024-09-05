// src/components/CommentsSection.js
import React from 'react';
import './CommentsSection.css'; // 스타일 파일을 추가합니다.

function CommentsSection() {
  return (
    <div className="comments-section">
      <h3>사용자 코멘트</h3>
      <p>국가는 노인과 청소년의 복지향상을 위한 정책을 실시할 의무를 진다. 언론·출판에 대한 허가나 검열과 집회·결사에 대한 허가는 인정되지 아니한다.</p>
      <div className="comments-actions">
        <button>쪽지 보내기</button>
        <button>쪽지함</button>
      </div>
    </div>
  );
}

export default CommentsSection;

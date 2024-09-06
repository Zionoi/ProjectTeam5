// src/components/FriendsSection.js
import React from 'react';
import './FriendsSection.css'; // 스타일 파일을 추가합니다.

function FriendsSection() {
  return (
    <div className="friends-section">
      <h3>친구추가</h3>
      <ul>
        <li>USER01(25**)</li>
        <li>OBJEC(B06**)</li>
        <li>JAV(JAV1**)</li>
      </ul>
      <button className="request-button">리퀘스트</button>
    </div>
  );
}

export default FriendsSection;

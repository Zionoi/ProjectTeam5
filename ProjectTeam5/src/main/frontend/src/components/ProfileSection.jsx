// src/components/ProfileSection.js
import React from 'react';
import './ProfileSection.css'; // 개별 스타일 적용

function ProfileSection() {
  return (
    <div className="profile-section">
      <img src="path-to-your-image.jpg" alt="Profile" className="profile-image" />
      <p className="profile-comment">사용자 프로필 설명 텍스트</p>
    </div>
  );
}

export default ProfileSection;

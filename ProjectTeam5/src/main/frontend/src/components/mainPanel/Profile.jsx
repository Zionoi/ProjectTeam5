import React, { useEffect, useState } from 'react';
import './Profile.css'; // 스타일 파일
import { useNavigate } from 'react-router-dom';
import ProfileImg from "../../img/profile-icon.png";

function Profile({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('id'); // 사용자 ID를 localStorage에서 가져옴

  // 메뉴 토글 함수
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // 나의 홈페이지로 이동
  const handleMyhomepage = () => {
    if (userId) {
      navigate(`/home/${userId}`);
    } else {
      console.error('사용자 ID가 없습니다.');
    }
  };

  // 회원 정보 수정 핸들러
  const handleEditProfile = () => {
    if (userId) {
      navigate(`/ProfileEdit/${userId}`);
    } else {
      console.error('사용자 ID가 없습니다.');
    }
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    alert('로그아웃 되었습니다.');
    onLogout();
    navigate('/');
  };

  return (
    <div className="profile-container">
      <button
        className="profile-icon"
        onClick={toggleMenu}>
        <img src={ProfileImg} alt="프로필 아이콘" />
      </button>
      {menuOpen && (
        <div className="PItem">
          <button className="menu-item" onClick={handleMyhomepage}>
            나의 홈피가기
          </button>
          <button className="menu-item" onClick={handleEditProfile}>
            회원정보 수정
          </button>
          <button className="menu-item" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;

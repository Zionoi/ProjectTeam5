import React, { useEffect, useState } from 'react';
import './Profile.css'; // 스타일 파일
import { useNavigate } from 'react-router-dom';

function Profile({onLogout}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // 메뉴 토글 함수
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  

  // 회원 정보 수정 핸들러
  const handleEditProfile = () => {
    navigate(`/ProfileEdit/${localStorage.getItem('id')}`);
   
    // 회원정보 수정 페이지로 이동하는 로직 추가
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    alert('로그아웃 되었습니다.');
    onLogout();
    navigate('/');
  };

  return (
    <div className="profile-container">
      
      <img
        src="/profile-icon.png"
        alt="Profile Icon"
        className="profile-icon"
        onClick={toggleMenu}
      />
      {menuOpen && (
        <div >
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

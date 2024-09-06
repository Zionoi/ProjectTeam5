// MainPage.js
import React, { useState } from 'react';
import Diary from './Diary'; // 다이어리 컴포넌트

const MainPage = () => {
  const [showDiary, setShowDiary] = useState(false);

  // 다이어리 열기 핸들러
  const handleDiaryClick = () => {
    setShowDiary(true);
  };

  // 다이어리 닫기 핸들러
  const handleCloseDiary = () => {
    setShowDiary(false);
  };

  return (
    <div className="main-page">
      <nav className="menu-bar">
        <button className="menu-item" onClick={handleDiaryClick}>
        <div className="icon">📚</div>
        </button>
        {/* 다른 메뉴 아이템들 */}
      </nav>

      {/* 다이어리 컴포넌트 */}
      {showDiary && <Diary onClose={handleCloseDiary} />}
    </div>
  );
};

export default MainPage;

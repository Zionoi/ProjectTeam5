// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css'; // 개별 스타일 적용

function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="icon">🏠</div>
      <div className="icon">📚</div>
      <div className="icon">🖥️</div>
      <div className="icon">💬</div>
      <div className="icon">☁️</div>
      <div className="icon">🍴</div>
    </nav>
  );
}

export default Sidebar;

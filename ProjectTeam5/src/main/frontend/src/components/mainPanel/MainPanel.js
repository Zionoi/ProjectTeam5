import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import Home from '../home/Home.js';
import Board from '../board/Board.js';
import Sidebar from './Sidebar';
import VisitSection from './VisitSection';
import FriendsSection from './FriendsSection';
import HeaderSection from './HeaderSection.jsx';
import ProfileSection from '../home/ProfileSection.jsx';
import StickerSection from '../home/StickerSection.jsx';
import CommentsSection from '../home/CommentsSection.jsx';
import TopCommnets from './TopComments.jsx';

import { useEffect, useState } from 'react';

// import MusicPlayer from './MusicPlayer.jsx';

function MainPanel({onLogout}) { // onLogout props 추가
  const navigate = useNavigate();
  

    const handleLogout = () => {
      onLogout(); // 부모 컴포넌트의 로그아웃 핸들러 호출
      navigate('/login'); // 로그인 페이지로 리다이렉트
    };

    
  
    return (
      

      <div className="app" style={{ display: 'flex' }}>
        <div className="left-panel">
          <Sidebar />
        </div>
      
      <div className="right-panel">
        <button onClick={handleLogout} className="btn btn-outline-danger">로그아웃</button>
      </div>
      <aside className="right-side">
      {/* <MusicPlayer /> */}
        <VisitSection />
        <FriendsSection />
      </aside>
    </div>
    );
  }
  
  export default MainPanel;
  
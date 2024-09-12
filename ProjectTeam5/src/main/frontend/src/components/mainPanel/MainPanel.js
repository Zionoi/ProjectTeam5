import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import Home from '../home/Home.js';
import Board from '../board/Board.js';
import Sidebar from './Sidebar';
import FortuneSection from './FortuneSection';
import FriendsSection from './FriendsSection';
import Profile from './Profile';
import './Logout.css';
// import MusicPlayer from './MusicPlayer.jsx';


import FriendsList from '../friends/FriendsList.js';
import { useEffect, useState } from 'react';
import MusicPlayer from '../music/MusicPlayer.jsx';
import HeaderSection from './HeaderSection.jsx';


function MainPanel({ onLogout, hostId, setHostId }) { // onLogout props 추가
  const navigate = useNavigate();
  
  

    const handleLogout = () => {
      onLogout(); // 부모 컴포넌트의 로그아웃 핸들러 호출
      navigate('/'); // 로그인 페이지로 리다이렉트
    };

    
  
    return (
      <div className="app" style={{ display: 'flex' }}>
        <div className="left-panel">
          <Sidebar hostId={hostId} setHostId={setHostId} />
        </div>
      
        <div className="right-panel">
          <button onClick={handleLogout} className="logout-button">로그아웃</button>
        </div>

        <HeaderSection hostId={hostId}/>
        <aside className="right-side">
        <MusicPlayer/>
        <Profile hostId={hostId}/>
        <FriendsList hostId={hostId} setHostId={setHostId}/>
        <FortuneSection />
          {/* <VisitSection /> */}
          <FriendsSection />
        </aside>
      </div>
     
    );
  }
  
  export default MainPanel;

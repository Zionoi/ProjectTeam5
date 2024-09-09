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
import Login from '../login/Login.jsx';
import SignUpPage from '../SignUpPage/SignUpPage.jsx';

// import MusicPlayer from './MusicPlayer.jsx';

function MainPanel() { // onLogout props 추가
    const navigate = useNavigate();
  

    // const handleLogout = () => {
    //   onLogout(); // 부모 컴포넌트의 로그아웃 핸들러 호출
    //   navigate('/login'); // 로그인 페이지로 리다이렉트
    // };

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      // 로컬 스토리지에서 로그인 상태 확인
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('id');
      if (token && id) {
        
        setIsLoggedIn(true);
      }
    }, []);

    const handleLogout = () => {
    
      setIsLoggedIn(false); // 로그인 상태를 false로 설정
      navigate('/login');
      localStorage.clear(); // 로컬 스토리지 클리어
    };
  
    return (
      <div>
      {isLoggedIn ? 

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
      : 
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SignUpPage" element={<SignUpPage />}/>
        </Routes>
      </div>}
      </div>
    );
  }
  
  export default MainPanel;
  
import { useNavigate, useParams} from 'react-router-dom';
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


function MainPanel({ onLogout, hostId, setHostId}) { // onLogout props 추가
  const navigate = useNavigate();
  const { paramHostId } = useParams(); // 아이디 파라미터 가져오기
  //  // hostId가 undefined이면 paramHostId로 값을 세팅
  //  useEffect(() => {
  //    setHostId(paramHostId);
  //   sessionStorage.setItem('hostId', hostId)
    
  // }, [paramHostId, setHostId]);

    const handleLogout = () => {
      onLogout(); // 부모 컴포넌트의 로그아웃 핸들러 호출
      navigate('/'); // 로그인 페이지로 리다이렉트
    };

    //서버 로그인한상태로 껐다가 다시켰을때 빈 메인페널만 보이던 문제 수정 코드
    useEffect(()=>{
      if(!sessionStorage.getItem('login')){
        onLogout();
      }
    })
    
  
    return (
      <div className="app" style={{ display: 'flex' }}>
        <div className="left-panel">
          <Sidebar hostId={hostId} setHostId={setHostId} />

        </div>
      
        <div className="left-panel">
          <button onClick={handleLogout} className="logout-button">로그아웃</button>
        </div>

        <HeaderSection hostId={hostId}/>
        <MusicPlayer/>
        <aside className="right-side">
        <Profile hostId={hostId}/>
       
        <FortuneSection />
          {/* <VisitSection /> */}
          <FriendsSection hostId={hostId} setHostId={setHostId}/>
        </aside>
      </div>
     
    );
  }
  
  export default MainPanel;

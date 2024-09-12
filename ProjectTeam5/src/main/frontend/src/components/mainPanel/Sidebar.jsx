import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Link, useParams } from 'react-router-dom';
import Home from '../home/Home';
import Board from '../board/Board';
import './Sidebar.css'; // 개별 스타일 적용
import Diary from '../diary/Diary';
import InputDiary from '../diary/InputDiary';
import GetDiary from '../diary/GetDiary';
import BoardUpload from '../board/BoardUpload';
import BoardDetail from '../board/BoardDetail';
import GuestbookPage from '../guestbookpage/GuestbookPage';
import BulletinBoardPage from '../BulletinBoardPage/BulletinBoardPage'; 
import WriteMessage from '../message/WriteMessage';
import Inbox from '../message/Inbox';
import MessageDetail from '../message/MessageDetail';
import ProfileEdit from '../ProfileEdit/ProfileEdit';


function Sidebar({hostId, setHostId}) {
  const navigate = useNavigate();
  const { paramHostId } = useParams(); // 아이디 파라미터 가져오기
  const myId = localStorage.getItem('id'); // 내 아이디 로컬 스토리지에서 가져오기
  // const [hostId, setHostId] = useState(paramHostId);

  // useEffect(() => {
  //   setHostId(paramHostId);
  //   console.log("host아이디 사이드바 : ",paramHostId);
  // }, [paramHostId, setHostId]);

  const goToMyHomePage = () => {
    setHostId(myId);
    navigate(`/home/${myId}`); // 내 홈페이지로 이동
  };

  console.log('hostId:', hostId);
  console.log('myId:', myId);

  return (
    <div style={{ display: 'flex' }}>
      <nav className="sidebar">
      {hostId !== myId && (
          <button onClick={goToMyHomePage} className="btn btn-primary">내 홈페이지로 돌아가기</button>
        )}
        <Link to={`/home/${hostId}`}><div className="icon home"></div></Link>
        <Link to={`/diary/${hostId}`}><div className="icon diary"></div></Link>
        <Link to={`/board/${hostId}`}><div className="icon board"></div></Link>
        <Link to={`/GuestbookPage/${hostId}`}><div className="icon visit"></div></Link>
        <div className="icon walk"><a href="#"></a></div>
        <div className="icon food"><a href="#"></a></div>
      </nav>

      <div className="center-panel">

        <Routes>
          
          {/* 메인탭 경로 */}
          <Route path="/home/:hostId" element={<Home hostId={hostId} setHostId={setHostId}/>} />
          <Route path="/diary/:hostId" element={<Diary hostId={hostId} setHostId={setHostId}/>} />
          <Route path="/board/:hostId" element={<Board hostId={hostId} setHostId={setHostId}/>} />

          {/* 기타 경로 처리 */}
          <Route path="/boardUpload/:hostId" element={<BoardUpload hostId={hostId} setHostId={setHostId} />} />
          <Route path="/boardDetail/:bNum/:hostId" element={<BoardDetail hostId={hostId} setHostId={setHostId}/>} />
          <Route path="/inputDiary/:date/:hostId" element={<InputDiary hostId={hostId} setHostId={setHostId}/>} />
          <Route path="/getDiary/:dNum/:hostId" element={<GetDiary hostId={hostId} setHostId={setHostId}/>} />
          <Route path="/GuestbookPage/:hostId" element={<GuestbookPage hostId={hostId} setHostId={setHostId}/>} />
          <Route path="/write/:hostId" element={<WriteMessage hostId={hostId} setHostId={setHostId}/>} />
          <Route path="/inbox/:hostId" element={<Inbox hostId={hostId} setHostId={setHostId}/>} />
          <Route path="/message/:mNum/:hostId" element={<MessageDetail hostId={hostId} setHostId={setHostId}/>} />
          <Route path="/bulletin-board/:hostId" element={<BulletinBoardPage hostId={hostId} setHostId={setHostId}/>} /> 
          

          {/* 프로필 수정 */}
          <Route path="/ProfileEdit/:hostId" element={<ProfileEdit hostId={hostId} setHostId={setHostId}/>} /> 

        </Routes>
      </div>
    </div>
  );
}

export default Sidebar;

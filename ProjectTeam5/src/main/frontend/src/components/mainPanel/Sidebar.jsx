import React from 'react';
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
import WriteMessage from '../message/WriteMessage';
import Inbox from '../message/Inbox';
import MessageDetail from '../message/MessageDetail';

function Sidebar() {
  const navigate = useNavigate();
  let { hostId } = useParams(); // 아이디 파라미터 가져오기
  const myId = localStorage.getItem('id'); // 내 아이디 로컬 스토리지에서 가져오기

  const goToMyHomePage = () => {
    hostId = localStorage.getItem('id');
    navigate(`/home/${hostId}`); // 내 홈페이지로 이동
  };

  return (
    <div style={{ display: 'flex' }}>
      <nav className="sidebar">
        {hostId !== myId ? (
          <button onClick={goToMyHomePage} className="btn btn-primary">내 홈페이지로 돌아가기</button>
        ) : <></>}
        <Link to={`/home/${hostId}`}><div className="icon home"></div></Link>
        <Link to={`/diary/${hostId}`}><div className="icon diary"></div></Link>
        <Link to={`/board/${hostId}`}><div className="icon board"></div></Link>
        <Link to={`/GuestbookPage/${hostId}`}><div className="icon visit"></div></Link>
        <div className="icon walk"><a href="#"></a></div>
        <div className="icon food"><a href="#"></a></div>
      </nav>

      <div className="center-panel">
        <Routes>
          {/* 내 홈/친구 홈 라우트 */}
          <Route path="/home/:hostId" element={<Home />} />

          {/* 내/친구 다이어리 라우트 */}
          <Route path="/diary/:hostId" element={<Diary />} />

          {/* 내/친구 게시판 라우트 */}
          <Route path="/board/:hostId" element={<Board />} />

          {/* 기타 경로 처리 */}
          <Route path="/boardUpload/:hostId" element={<BoardUpload />} />
          <Route path="/boardDetail/:bNum/:hostId" element={<BoardDetail />} />
          <Route path="/inputDiary/:date/:hostId" element={<InputDiary />} />
          <Route path="/getDiary/:dNum/:hostId" element={<GetDiary />} />
          <Route path="/GuestbookPage/:hostId" element={<GuestbookPage />} />
          <Route path="/write/:hostId" element={<WriteMessage />} />
          <Route path="/inbox/:hostId" element={<Inbox />} />
          <Route path="/message/:mNum/:hostId" element={<MessageDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default Sidebar;

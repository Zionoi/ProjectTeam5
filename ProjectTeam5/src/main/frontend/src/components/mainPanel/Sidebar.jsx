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
  const { friendId } = useParams(); // 친구 아이디 파라미터 가져오기
  const myId = localStorage.getItem('id'); // 내 아이디 로컬 스토리지에서 가져오기

  const goToMyHomePage = () => {
    navigate(`/home`); // 내 홈페이지로 이동
  };

  return (
    <div style={{ display: 'flex' }}>
      <nav className="sidebar">
        {friendId && (
          <button onClick={goToMyHomePage} className="btn btn-primary">내 홈페이지로 돌아가기</button>
        )}
        <Link to={friendId ? `/user/${friendId}/home` : `/home`}><div className="icon home"></div></Link>
        <Link to={friendId ? `/user/${friendId}/diary` : `/diary`}><div className="icon diary"></div></Link>
        <Link to={friendId ? `/user/${friendId}/board` : `/board`}><div className="icon board"></div></Link>
        <Link to={friendId ? `/user/${friendId}/GuestbookPage` : `/GuestbookPage`}><div className="icon visit"></div></Link>
        <div className="icon walk"><a href="#"></a></div>
        <div className="icon food"><a href="#"></a></div>
      </nav>

      <div className="center-panel">
        <Routes>
          {/* 내 홈/친구 홈 라우트 */}
          <Route path="/home" element={<Home />} />
          <Route path="/user/:friendId/home" element={<Home />} />

          {/* 내/친구 다이어리 라우트 */}
          <Route path="/diary" element={<Diary />} />
          <Route path="/user/:friendId/diary" element={<Diary />} />

          {/* 내/친구 게시판 라우트 */}
          <Route path="/board" element={<Board />} />
          <Route path="/user/:friendId/board" element={<Board />} />

          {/* 기타 경로 처리 */}
          <Route path="/boardUpload" element={<BoardUpload />} />
          <Route path="/boardDetail/:bNum" element={<BoardDetail />} />
          <Route path="/inputDiary/:date" element={<InputDiary />} />
          <Route path="/getDiary/:dNum" element={<GetDiary />} />
          <Route path="/GuestbookPage" element={<GuestbookPage />} />
          <Route path="/write" element={<WriteMessage />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/message/:mNum" element={<MessageDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default Sidebar;

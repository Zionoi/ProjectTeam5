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
import BoardEdit from './../board/BoardEdit';
import Restaurant from '../restaurant/Restaurant';
import FavoriteList from '../restaurant/FavoriteList';
import WalkingCourse from '../Walking/WalkingCourse';
import VoteCreate from '../Walking/VoteCreate';
import WalkingCourseVote from '../Walking/WalkingCourseVote';


function Sidebar({hostId, setHostId}) {
  const navigate = useNavigate();
  // const { paramHostId } = useParams(); // 아이디 파라미터 가져오기
  const myId = localStorage.getItem('id'); // 내 아이디 로컬 스토리지에서 가져오기
  // const [hostId, setHostId] = useState(paramHostId);

  // 클릭된 아이콘의 인덱스를 관리하는 상태
  const [activeIcon, setActiveIcon] = useState(0); //초기값 0으로 설정하여 홈화면 버튼이 시작부터 활성화
     // 아이콘 클릭 이벤트 핸들러
  const handleIconClick = (index) => {
    setActiveIcon(index); // 클릭된 아이콘의 인덱스를 상태로 저장
  };

    // // hostId가 undefined이면 paramHostId로 값을 세팅
    // useEffect(() => {
    //   if (!hostId && paramHostId) {
    //     console.log(`Setting hostId: ${paramHostId}`); // 디버깅용 콘솔
    //     setHostId(sessionStorage.getItem(hostId));
    //   }
    // }, [hostId, paramHostId, setHostId]);

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
      {hostId !== myId && (
        <div className=".myHomebutton-container">
          <button onClick={goToMyHomePage} className="btn-myhome"></button>
          <div className="myHometooltip">내 홈페이지로 이동</div>
        </div>
      )}

      <nav className="sidebar">
        <Link to={`/home/${hostId}`}>
          <div
            className={`icon home ${activeIcon === 0 ? 'active' : ''}`}
            onClick={() => handleIconClick(0)}
          ></div>
        </Link>

        <Link to={`/diary/${hostId}`}>
          <div
            className={`icon diary ${activeIcon === 1 ? 'active' : ''}`}
            onClick={() => handleIconClick(1)}
          ></div>
        </Link>

        <Link to={`/bulletin-board/${hostId}`}>
          <div
            className={`icon board ${activeIcon === 2 ? 'active' : ''}`}
            onClick={() => handleIconClick(2)}
          ></div>
        </Link>

        <Link to={`/GuestbookPage/${hostId}`}>
          <div
            className={`icon visit ${activeIcon === 3 ? 'active' : ''}`}
            onClick={() => handleIconClick(3)}
          ></div>
        </Link>
        <Link to={`/WalkingCourse/${hostId}`}>
        <div
          className={`icon walk ${activeIcon === 4 ? 'active' : ''}`}
          onClick={() => handleIconClick(4)}
        ></div>
        </Link>

        <Link to={`/restaurants/${hostId}`}>
          <div
            className={`icon food ${activeIcon === 5 ? 'active' : ''}`}
            onClick={() => handleIconClick(5)}
          ></div>
        </Link>
      </nav>

      <div className="center-panel">

        <Routes>
          
          {/* 메인탭 경로 */}
          <Route path="/home/:hostId" element={<Home hostId={hostId} setHostId={setHostId}/>} />

          <Route path="/diary/:hostId" element={<Diary hostId={hostId} setHostId={setHostId}/>} />
          <Route path="/board/:hostId" element={<Board hostId={hostId} setHostId={setHostId}/>} />
          <Route path="/restaurants/:hostId" element={<Restaurant hostId={hostId} setHostId={setHostId}/>} />

          {/* 기타 경로 처리 */}
          <Route path="/boardUpload/:hostId" element={<BoardUpload hostId={hostId} setHostId={setHostId} />} />
          <Route path="/boardDetail/:bNum/:hostId" element={<BoardDetail hostId={hostId} setHostId={setHostId}/>} />
          <Route path="/boardEdit/:bNum" element={<BoardEdit />} />
          <Route path="/inputDiary/:date/:hostId" element={<InputDiary hostId={hostId} setHostId={setHostId}/>} />
          <Route path="/getDiary/:dnum/:hostId" element={<GetDiary hostId={hostId} setHostId={setHostId}/>} />
          <Route path="/GuestbookPage/:hostId" element={<GuestbookPage hostId={hostId} setHostId={setHostId}/>} />

          <Route path="/favorites/:hostId" element={<FavoriteList hostId={hostId} setHostId={setHostId}/>} />
          
          {/* 산책로 링크 */}
          <Route path="/WalkingCourse/:hostId" element={<WalkingCourse hostId={hostId} setHostId={setHostId}/>} />
          <Route path="/vote-create/:hostId" element={<VoteCreate hostId={hostId} setHostId={setHostId}/>} />
          <Route path="/WalkingCourseVote/:hostId" element={<WalkingCourseVote hostId={hostId} setHostId={setHostId}/>} />

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

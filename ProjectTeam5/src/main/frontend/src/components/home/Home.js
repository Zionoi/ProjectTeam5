// src/App.js
import React, { useEffect, useState } from 'react';
import ProfileSection from './ProfileSection';
import StickerSection from './StickerSection';
import CommentsSection from './CommentsSection';

// 쪽지관련 컴포넌트
import { Routes, Route, useNavigate } from 'react-router-dom';  // 라우팅 관련 import


import '../../App.css';
import TopCommnets from '../mainPanel/TopComments';
import axios from 'axios';

function Home({hostId, setHostId}) {
  const [memId, setMemId] = useState(hostId);


  useEffect(() => {
    setMemId(hostId);
    
    // sessionStorage에서 해당 유저의 방문 기록 확인
    const visitedKey = `visited_${memId}`; // 각 memId별로 방문 기록을 분리
    const visited = sessionStorage.getItem(visitedKey);
    
    // 방문 기록이 없을 때만 방문자 수 증가
    if (!visited) {
      axios.get(`/member/visitCountUp/${memId}`)
        .then(() => {
          console.log('방문자 증가 성공', memId);
          // 방문 기록을 sessionStorage에 저장
          sessionStorage.setItem(visitedKey, 'true'); // memId별로 기록 저장
        })
        .catch(error => {
          console.log('방문자 증가 실패', error);
        });
    }
  }, [hostId]);



    return (
      <div className="">
        <main className="main-content">

          <ProfileSection hostId={hostId}/>
          <TopCommnets hostId={hostId} setHostId={setHostId}/>
          
          <StickerSection/>
          <CommentsSection hostId={hostId} setHostId={setHostId}/>
        </main>

     
        
      </div>
    );
  }
  export default Home;
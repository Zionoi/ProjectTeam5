// src/App.js
import React from 'react';
import ProfileSection from './ProfileSection';
import StickerSection from './StickerSection';
import CommentsSection from './CommentsSection';

// 쪽지관련 컴포넌트
import { Routes, Route, useNavigate } from 'react-router-dom';  // 라우팅 관련 import


import '../../App.css';
import TopCommnets from '../mainPanel/TopComments';

function Home({hostId, setHostId}) {
    return (
      <div className="">
        <main className="main-content">

          <ProfileSection />
          <TopCommnets/>
          
          <StickerSection />
          <CommentsSection />
        </main>

     
        
      </div>
    );
  }
  export default Home;
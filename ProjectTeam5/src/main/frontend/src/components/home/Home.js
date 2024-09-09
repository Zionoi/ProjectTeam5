// src/App.js
import React from 'react';
import ProfileSection from './ProfileSection';
import StickerSection from './StickerSection';
import CommentsSection from './CommentsSection';

// 쪽지관련 컴포넌트
import { Routes, Route, useNavigate } from 'react-router-dom';  // 라우팅 관련 import
import WriteMessage from '../message/WriteMessage';
import Inbox from '../message/Inbox';
import MessageDetail from '../message/MessageDetail';

import '../../App.css';
import TopCommnets from '../mainPanel/TopComments';

function Home() {
    return (
      <div className="">
        <main className="main-content">

          <ProfileSection />
          <TopCommnets/>
          <StickerSection />
          <CommentsSection />
        </main>

        {/* 라우팅 설정 */}
        <Routes>
          <Route path="/write" element={<WriteMessage />} />   {/* 쪽지 보내기 페이지 */}
          <Route path="/inbox" element={<Inbox />} />          {/* 쪽지함 페이지 */}
          <Route path="/message/:mNum" element={<MessageDetail />} /> {/* 메시지 상세 보기 페이지 */}
        </Routes>
        
      </div>
    );
  }
  export default Home;
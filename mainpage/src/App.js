// src/App.js
import React from 'react';
import Sidebar from './components/Sidebar';
import HeaderSection from './components/HeaderSection';
import ProfileSection from './components/ProfileSection';
import StickerSection from './components/StickerSection';
import CommentsSection from './components/CommentsSection';
import MainPage from './components/MainPage';
import VisitSection from './components/VisitSection';
import FriendsSection from './components/FriendsSection';
import MusicPlayer from './components/MusicPlayer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <HeaderSection />
        <ProfileSection />
        <StickerSection />
        <CommentsSection />
        <MainPage /> {/* 메인 페이지 컴포넌트 렌더링 */}
      </main>
      <aside className="right-side">
      <MusicPlayer />
      {/* <button onClick={handleLogout} className="btn btn-outline-danger">로그아웃</button> */}
        <VisitSection />
        <FriendsSection />
      </aside>
    </div>
  );
}

export default App;

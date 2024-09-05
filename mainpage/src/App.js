// src/App.js
import React from 'react';
import Sidebar from './components/Sidebar';
import ProfileSection from './components/ProfileSection';
import StickerSection from './components/StickerSection';
import CommentsSection from './components/CommentsSection';
import VisitSection from './components/VisitSection';
import FriendsSection from './components/FriendsSection';
import './App.css';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <ProfileSection />
        <StickerSection />
        <CommentsSection />
      </main>
      <aside className="right-side">
        <VisitSection />
        <FriendsSection />
      </aside>
    </div>
  );
}

export default App;

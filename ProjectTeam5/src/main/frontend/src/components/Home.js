// src/App.js
import React from 'react';
import Sidebar from './Sidebar';
import ProfileSection from './ProfileSection';
import StickerSection from './StickerSection';
import CommentsSection from './CommentsSection';
import VisitSection from './VisitSection';
import FriendsSection from './FriendsSection';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Home() {
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
  export default Home;
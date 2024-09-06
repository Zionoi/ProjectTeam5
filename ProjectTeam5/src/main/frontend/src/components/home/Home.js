// src/App.js
import React from 'react';
import ProfileSection from './ProfileSection';
import StickerSection from './StickerSection';
import CommentsSection from './CommentsSection';
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
        
      </div>
    );
  }
  export default Home;
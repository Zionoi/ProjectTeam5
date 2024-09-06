// src/App.js
import React from 'react';
import Sidebar from './components/Sidebar';
import ProfileSection from './components/ProfileSection';
import StickerSection from './components/StickerSection';
import CommentsSection from './components/CommentsSection';
import VisitSection from './components/VisitSection';
import FriendsSection from './components/FriendsSection';
import TopCommnets from './components/TopComments';
import './App.css';

function App() {
  return (
    <div className="app">
      <table>
      <td className="sidebar"><Sidebar /></td>
      <td className="topcomment"><TopCommnets /></td>
      </table>
      <main className="main-content">
        <table>
          <tr >
            <td className="left-content"><ProfileSection /></td>
            <td rowSpan={2}><StickerSection /></td>
          </tr>
          <tr>
          <td className="left-content"><CommentsSection /></td>
          </tr>
        </table>
      </main>
      <aside className="right-side">
        <VisitSection />
        <FriendsSection />
      </aside>
    </div>
  );
}

export default App;

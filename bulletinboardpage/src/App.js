// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GuestbookPage from './GuestbookPage'; // 방명록 페이지
import BulletinBoardPage from './components/BulletinBoardPage'; // 게시판 페이지
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
        <Route path="/" element={<GuestbookPage />} /> {/* 방명록 페이지 */}
        <Route path="/bulletin-board" element={<BulletinBoardPage />} /> {/* 게시판 페이지 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

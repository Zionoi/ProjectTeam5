// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import MainPanel from './components/mainPanel/MainPanel';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 로그인 상태 확인
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    if (token && id) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false); // 로그인 상태를 false로 설정
    localStorage.clear(); // 로컬 스토리지 클리어
  };

  return (
    
      <div className="App">
        <Routes>
        <Route path="/" element={<PostList />} /> {/* 게시글 목록 페이지 */}
      <Route path="/post/:id" element={<PostDetail />} /> {/* 게시글 상세 페이지 */}
      <Route path="/" element={<GuestbookPage />} /> {/* GuestbookPage를 기본 페이지로 설정 */}
      </Routes>
        {isLoggedIn ? (
          <MainPanel onLogout={handleLogout} /> // 로그아웃 핸들러를 전달
        ) : (
          <Login onLoginSuccess={() => setIsLoggedIn(true)} />
        )}
      </div>
    
  );
}

export default App;

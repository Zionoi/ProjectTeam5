import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GuestbookPage from './components/GuestbookPage'; // GuestbookPage 컴포넌트 추가
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route path="/" element={<PostList />} /> {/* 게시글 목록 페이지 */}
      <Route path="/post/:id" element={<PostDetail />} /> {/* 게시글 상세 페이지 */}
      <Route path="/" element={<GuestbookPage />} /> {/* GuestbookPage를 기본 페이지로 설정 */}
      </Routes>
    </div>
    </Router>
  );
}

export default App;

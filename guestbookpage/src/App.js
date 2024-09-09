import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GuestbookPage from './components/GuestbookPage'; // GuestbookPage 컴포넌트 추가
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route path="/" element={<GuestbookPage />} /> {/* 방명록 페이지로 라우팅 */}
      </Routes>
    </div>
    </Router>
  );
}

export default App;

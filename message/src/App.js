// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import WriteMessage from './components/WriteMessage';
import Inbox from './components/Inbox';

// 버튼을 사용하여 페이지 이동하는 컴포넌트
function Home() {
  const navigate = useNavigate();  // useNavigate로 변경

  return (
    <div>
      <h2>Welcome to the Messaging App</h2>
      <button onClick={() => navigate('/write')}>Write a Message</button>  {/* useNavigate로 경로 이동 */}
      <button onClick={() => navigate('/inbox')}>Inbox</button>  {/* useNavigate로 경로 이동 */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Routes>  {/* Switch 대신 Routes 사용 */}
          <Route path="/write" element={<WriteMessage />} />  {/* v6 문법으로 수정 */}
          <Route path="/inbox" element={<Inbox />} />  {/* v6 문법으로 수정 */}
          <Route path="/" element={<Home />} />  {/* 기본 홈 페이지 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

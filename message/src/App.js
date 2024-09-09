import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import WriteMessage from './components/WriteMessage';
import Inbox from './components/Inbox';
import MessageDetail from './components/MessageDetail';

// 버튼을 사용하여 페이지 이동하는 컴포넌트
function Home() {
  const navigate = useNavigate();  // useNavigate로 변경

  return (
    <div>
      <h2>쪽지 테스트</h2>
      <button onClick={() => navigate('/write')}>쪽지 보내기</button>  {/* useNavigate로 경로 이동 */}
      <button onClick={() => navigate('/inbox')}>쪽지함</button>  {/* useNavigate로 경로 이동 */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/write" element={<WriteMessage />} />  
          <Route path="/inbox" element={<Inbox />} /> 
          <Route path="/message/:mNum" element={<MessageDetail />} /> {/* 메시지 상세 보기 페이지 */}
          <Route path="/" element={<Home />} />  {/* 기본 홈 페이지 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

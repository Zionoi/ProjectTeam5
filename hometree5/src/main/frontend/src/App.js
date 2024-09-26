import React, { useEffect, useState } from 'react';
import './App.css';
import MainPanel from './components/mainPanel/MainPanel';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login/Login.jsx';
import SignUpPage from './components/SignUpPage/SignUpPage.jsx';
import FindIdPassword from './components/FindIdPassword/FindIdPassword';
import ResetPassword from './components/FindIdPassword/ResetPassword';
import Stars from './components/login/Stars'; // Stars 컴포넌트 임포트

function App() {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 확인을 위한 useLocation 사용
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hostId, setHostId] = useState('');
  const { paramHostId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    if (token && id) {
      setHostId(localStorage.getItem('id'))
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setHostId(localStorage.getItem('id'));
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // 로그인 상태를 false로 설정
    localStorage.clear(); // 로컬 스토리지 클리어      
    sessionStorage.clear(); 
  };

  // 서버가 꺼졌다 다시 켜졌을 때 로그인 상태 유지 여부 확인
  useEffect(() => {
    if (sessionStorage.getItem('login') === null) {
      setIsLoggedIn(false); // 로그인 상태를 false로 설정
      localStorage.clear(); // 로컬 스토리지 클리어
    }
  });

  return (
    <div className="App">
      {/* {location.pathname === "/" || location.pathname === "*" ? <Stars /> : null} */}
      <Stars /> 
      {isLoggedIn ? (
        <MainPanel onLogout={handleLogout} hostId={hostId} setHostId={setHostId} />
      ) : (
        <div>
          <Routes>
            <Route path="*" element={<Login onLoginSuccess={handleLogin} />} />
            <Route path="/SignUpPage" element={<SignUpPage />} />
            <Route path="/FindIdPassword" element={<FindIdPassword />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;

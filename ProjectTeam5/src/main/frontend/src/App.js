// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import MainPanel from './components/mainPanel/MainPanel';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login/Login.jsx';
import SignUpPage from './components/SignUpPage/SignUpPage.jsx';
import FindIdPassword from './components/FindIdPassword/FindIdPassword';
import ResetPassword from './components/FindIdPassword/ResetPassword';


function App() {
  // onLoginSuccess={() => setIsLoggedIn(true)}
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hostId, setHostId] = useState(localStorage.getItem(''));

    useEffect(() => {
      // 로컬 스토리지에서 로그인 상태 확인
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('id');
      if (token && id) {
        
        setIsLoggedIn(true);
      }
    }, []);

    const setHost = (e) => {
      setHostId(e.target.value);
    }

    const handleLogin = () =>{
      setIsLoggedIn(true);
      setHostId(localStorage.getItem('id'));
    }
    const handleLogout = () => {
    
      setIsLoggedIn(false); // 로그인 상태를 false로 설정
      localStorage.clear(); // 로컬 스토리지 클리어
    };
  return (
    
      <div className="App">
        { isLoggedIn ?
         <MainPanel onLogout={handleLogout} hostId={hostId} setHostId={setHostId}/>
         : 
      <div>
        <Routes>
          <Route path="/" element={<Login onLoginSuccess={handleLogin}/>} />
          <Route path="/SignUpPage" element={<SignUpPage />}/>
          <Route path="/FindIdPassword" element={<FindIdPassword />}/>
          <Route path="/resetPassword" element={<ResetPassword />} />
        </Routes>
      </div>
        }
      </div>
    
  );
}

export default App;

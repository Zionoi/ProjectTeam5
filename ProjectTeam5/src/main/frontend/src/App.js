// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import MainPanel from './components/mainPanel/MainPanel';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login/Login.jsx';
import SignUpPage from './components/SignUpPage/SignUpPage.jsx';

function App() {
  // onLoginSuccess={() => setIsLoggedIn(true)}
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hostId, setHostId] = useState(localStorage.getItem('id'));

    useEffect(() => {
      // 로컬 스토리지에서 로그인 상태 확인
      localStorage.setItem('id', 'user01');
      localStorage.setItem('token', "response.data[0]");
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('id');
      if (token && id) {
        
        setIsLoggedIn(true);
      }
    }, []);
    const handleLogin = () =>{
      setIsLoggedIn(true);
    }
    const handleLogout = () => {
    
      setIsLoggedIn(false); // 로그인 상태를 false로 설정
      localStorage.clear(); // 로컬 스토리지 클리어
    };
  return (
    
      <div className="App">
        { isLoggedIn ?
         <MainPanel onLogout={handleLogout}/>
         : 
      <div>
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLogin}/>} />
          <Route path="/SignUpPage" element={<SignUpPage />}/>
        </Routes>
      </div>
        }
      </div>
    
  );
}

export default App;

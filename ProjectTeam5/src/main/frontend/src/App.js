// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import MainPanel from './components/mainPanel/MainPanel';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login/Login.jsx';
import SignUpPage from './components/SignUpPage/SignUpPage.jsx';
import FindIdPassword from './components/FindIdPassword/FindIdPassword';
import ResetPassword from './components/FindIdPassword/ResetPassword';


function App() {
  // onLoginSuccess={() => setIsLoggedIn(true)}
  const navigate = useNavigate();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hostId, setHostId] = useState('a');
  const { paramHostId } = useParams();

  // useEffect(() => {
  //   // 서버가 재시작했는지 여부를 확인할 수 있는 상태를 체크하는 로직이 있다고 가정
  //   const isServerRestarted = checkServerStatus(); // 서버 상태 확인 로직
  
  //   if (isServerRestarted) {
  //     // 서버가 재시작되었다면 로컬 스토리지 클리어
  //     localStorage.clear();
  //   }
  // }, []);
    useEffect(() => {
      // 로컬 스토리지에서 로그인 상태 확인
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('id');
      if (token && id) {
        setHostId(localStorage.getItem('id'))
        setIsLoggedIn(true);
      }
    }, []);
  //  useEffect(()=>{
  //   setHostId(paramHostId);
  //  },[paramHostId])


    const handleLogin = () =>{
      setIsLoggedIn(true);
      setHostId(localStorage.getItem('id'));
    }
    const handleLogout = () => {
    
      setIsLoggedIn(false); // 로그인 상태를 false로 설정
      localStorage.clear(); // 로컬 스토리지 클리어
    };

      //서버 로그인한상태로 껐다가 다시켰을때 빈 메인페널만 보이던 문제 수정 코드
      useEffect(()=>{

        if(sessionStorage.getItem('login') === null){

          setIsLoggedIn(false); // 로그인 상태를 false로 설정
          localStorage.clear(); // 로컬 스토리지 클리어
        }
      })

      
      
  return (
    
      <div className="App">
        { isLoggedIn ?
         <MainPanel onLogout={handleLogout} hostId={hostId} setHostId={setHostId}/>
         : 
      <div>
        <Routes>
          <Route path="*" element={<Login onLoginSuccess={handleLogin}/>} />
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import MainPanel from '../mainPanel/MainPanel';
import CharacterImg from '../../img/characterImg/loginImg2.png';
import Stars from './Stars';  // 별 효과 컴포넌트 추가

const Login = ({ onLoginSuccess }) => {
  const [userid, setUserid] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);  // 메시지 표시 상태
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log('서버 응답:', userid, pass);
    try {
      const result = await axios.post('/member/login', {
        memId: userid,
        pass: pass,
      });
      if (result.data && result.data.length >= 2 && result.data[0]) {
        localStorage.clear();
        localStorage.setItem('id', result.data[1]); // memId 저장
        localStorage.setItem('token', result.data[0]); // 토큰 저장
        sessionStorage.setItem('login', true); // 로그인 상태 저장

        setMessage('로그인 성공!');
        onLoginSuccess(); // 로그인 성공 시 호출
        navigate(`/home/${result.data[1]}`); // 메인 페이지로 리다이렉트
      } else {
        setMessage('잘못된 사용자 이름 또는 비밀번호');
        setShowMessage(true);  // 메시지 표시
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      setMessage('로그인 실패: 서버 오류가 발생했습니다.');
      setShowMessage(true);  // 메시지 표시
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  // 5초 후에 메시지 자동으로 사라지게 하기
  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);  // 메시지 숨기기
      }, 5000);  // 5초 후

      return () => clearTimeout(timer);  // 타이머 정리
    }
  }, [showMessage]);

  return (
    <div className="loginBox">
      {localStorage.getItem('token') ? (
        <div>
          <MainPanel />
        </div>
      ) : (
        <div className="login-form">
          <h2 className="loginAccount">Login Account</h2>
          {showMessage && (
        <p className={`loginErrorMessage ${showMessage ? '' : 'hidden'}`}>
          {message}
        </p>
      )}
          <table>
            <tr>
              <input
                type="text"
                placeholder="ID"
                className="input-field"
                value={userid}
                onChange={(e) => setUserid(e.target.value)}
                onKeyPress={handleKeyPress} // Add key press handler here
              />
            </tr>
            <tr>
              <input
                type="password"
                placeholder="Password"
                className="input-field"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                onKeyPress={handleKeyPress} // Add key press handler here
              />
            </tr>
            <td rowSpan="2">
              <button className="login-button" onClick={handleLogin}>Login</button>
            </td>
          </table>
          <table className="bu">
            <tr>
              <td><a href="/SignUpPage" className="signUp">회원가입</a></td>
              <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
              <td><a href="/FindIdPassword" className="find">아이디/비밀번호 찾기</a></td>
            </tr>
          </table>
          <p className="description">
            친구들과 함께하는 소중한 일상, 이곳에서 기록하고 나누세요.
            <br />
            매일매일의 작은 순간들을 모아
            <br />
            함께 웃고, 함께 공유하는 행복한 순간을 만끽하세요 !
          </p>
          <div className="light"></div>
          <div><img className="loginImg-box" src={CharacterImg}/></div>
        </div>
      )}
    </div>
  );
}

export default Login;

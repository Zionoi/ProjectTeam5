import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
// import SignUpPage from '../SignUpPage/SignUpPage';
{/* <style>
@import url('https://fonts.googleapis.com/css2?family=Asap:ital,wght@0,100..900;1,100..900&family=Noto+Sans+KR&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
</style> */}


const Login = ({ onLoginSuccess }) => {
  const [userid, setUserid] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log('서버 응답:', userid, pass);
    try {
      const response = await axios.post('/member/login', {
        memId:userid,
        pass:pass,
      });

      console.log('서버 응답:', response);
      console.log('응답 데이터:', response.data);

      if (response.data) {
        localStorage.clear();
        localStorage.setItem('id', response.data[1]);
        localStorage.setItem('token', response.data[0]);
        setMessage('로그인 성공!');
        onLoginSuccess(); // 로그인 성공 시 호출
        navigate('/Home'); // 메인 페이지로 리다이렉트
      } else {
        setMessage('잘못된 사용자 이름 또는 비밀번호');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      setMessage('로그인 실패asdf');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setMessage('로그아웃 되었습니다.');
  };


  // const handleSignUp = () =>{
  //   navigate('/SignUpPage');
  // }

  return (
    <div>
      {localStorage.getItem('token') ? (
        <div>
          <p>안녕하세요, {localStorage.getItem('id')}님</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
      <div className="login-form">
        <h2 className="loginAccount">Login Account</h2>
        <table>
          <tr>
              <input type="text" placeholder="ID" className="input-field" 
                      value={userid}
                      onChange={(e) => setUserid(e.target.value)}/>
          <tr>
              <input type="password" placeholder="Password" className="input-field" 
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}/>
          </tr>
              <td rowSpan="2"><button className="login-button" onClick={handleLogin}>Login</button></td>
          </tr>
        </table>
        <table className="bu">
          <tr>
            <td><a href="/SignUpPage" className="signUp">회원가입</a></td>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
            <td><a href="#"className="find">아이디/비밀번호 찾기</a></td>
          </tr>
        </table>
        <p className="description">
          친구들과 함께하는 소중한 일상, 이곳에서 기록하고 나누세요.
          <br />
          매일매일의 작은 순간들을 모아
          <br/>
          함께 웃고, 함께 공유하는 행복한 순간을 만끽하세요 !
        </p>
      </div>
      )}
      <p>{message}</p>
    </div>
  );
}


export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginYohan = ({ onLoginSuccess }) => {
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
        navigate('/'); // 메인 페이지로 리다이렉트
      } else {
        setMessage('잘못된 사용자 이름 또는 비밀번호');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      setMessage('로그인 실패');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setMessage('로그아웃 되었습니다.');
  };

  return (
    <div>
      {localStorage.getItem('token') ? (
        <div>
          <p>안녕하세요, {localStorage.getItem('id')}님</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="사용자 아이디"
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button onClick={handleLogin}>로그인</button>
        </div>
      )}
      <p>{message}</p>
    </div>
  );
};

export default LoginYohan;

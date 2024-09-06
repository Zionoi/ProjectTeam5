import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login Account</h2>
        <input type="text" placeholder="ID" className="input-field" />
        <input type="password" placeholder="Password" className="input-field" />
        <button className="login-button">Login</button>
        <div className="links">
          <a href="#">회원가입</a>
          <a href="#">아이디/비밀번호 찾기</a>
        </div>
        <p className="description">
          친구들과 함께하는 소중한 일상, 이곳에서 기록하고 나누세요!
          <br />
          매일매일의 작은 순간들을 모아 함께 웃고, 함께 공유하는 행복한 순간을 만끽하세요!
        </p>
      </div>
      <div className="illustration">
        {/* 이미지나 일러스트를 여기에 넣을 수 있습니다 */}
      </div>
    </div>
  );
}

export default Login;

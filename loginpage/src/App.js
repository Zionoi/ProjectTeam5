import React from 'react';
import './Login.css';
<style>
@import url('https://fonts.googleapis.com/css2?family=Asap:ital,wght@0,100..900;1,100..900&family=Noto+Sans+KR&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
</style>


function Login() {
  return (
    <div>
      <div className="login-form">
        <h2 className="loginAccount">Login Account</h2>
        <table>
          <tr>
              <input type="text" placeholder="ID" className="input-field" />
          <tr>
              <input type="password" placeholder="Password" className="input-field" />
          </tr>
              <td rowSpan="2"><button className="login-button">Login</button></td>
          </tr>
        </table>
        <table className="bu">
          <tr>
            <td><a href="#" className="signUp">회원가입</a></td>
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
    </div>
  );
}

export default Login;

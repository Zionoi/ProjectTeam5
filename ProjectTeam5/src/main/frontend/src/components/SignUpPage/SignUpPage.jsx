// SignUpPage.js
import React, { useState } from 'react';
import './SignUpPage.css'; // SignUpPage 전용 스타일

function SignUpPage() {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    nickname: '',
    name: '',
    birthDate: '',
    address: '',
    gender: '',
    phoneNumber: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('회원가입 데이터:', formData);
    // 회원가입 처리 로직 추가
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <p>필수 입력 항목</p>
        <input
          type="text"
          name="userId"
          placeholder="아이디"
          value={formData.userId}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nickname"
          placeholder="닉네임"
          value={formData.nickname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="birthDate"
          placeholder="생년월일 8자리"
          value={formData.birthDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="주소"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <div className="gender-selection">
          <label>
            성별
            <input
              type="radio"
              name="gender"
              value="남성"
              checked={formData.gender === '남성'}
              onChange={handleChange}
              required
            />
            남성
            <input
              type="radio"
              name="gender"
              value="여성"
              checked={formData.gender === '여성'}
              onChange={handleChange}
            />
            여성
          </label>
        </div>
        <input
          type="text"
          name="phoneNumber"
          placeholder="휴대전화 번호"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <p>*선택 입력 항목</p>
        <input
          type="email"
          name="email"
          placeholder="[선택] 이메일 (비밀번호 찾기 본인 확인용)"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit">완료</button>
      </form>
    </div>
  );
}

export default SignUpPage;

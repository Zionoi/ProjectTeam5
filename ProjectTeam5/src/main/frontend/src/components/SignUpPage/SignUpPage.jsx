import React, { useState } from 'react';
import './SignUpPage.css'; // SignUpPage 전용 스타일
import axios from 'axios';

function SignUpPage() {
  const [formData, setFormData] = useState({
    memId: '',      // 아이디
    pass: '',       // 비밀번호
    nickname: '',   // 닉네임
    phone: '',      // 전화번호
    birthday: '',   // 생년월일
    email: '',      // 이메일
    address: '',    // 주소
    gender: '',     // 성별
  });

  const [image, setImage] = useState(null); // 이미지 파일 상태 추가

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // 파일 선택 시 이미지 파일 상태 업데이트
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    // 회원 정보 JSON 데이터를 Blob으로 추가
    data.append('member', new Blob([JSON.stringify(formData)], { type: 'application/json' }));
    
    // 이미지 파일이 있을 경우 추가
    if (image) {
      data.append('image', image);
    }

    axios.post("/member/signup", data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }}).then((result) => {
      console.log(result.data);
      alert('회원가입이 완료되었습니다.');
    }).catch(() => {
      alert('회원가입이 실패하였습니다.');
    });
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <p>필수 입력 항목</p>
        <input
          type="text"
          name="memId"  // Member 엔티티의 ID 필드와 일치
          placeholder="아이디"
          value={formData.memId}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="pass"  // Member 엔티티의 비밀번호 필드와 일치
          placeholder="비밀번호"
          value={formData.pass}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nickname"  // Member 엔티티의 닉네임 필드와 일치
          placeholder="닉네임"
          value={formData.nickname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"  // Member 엔티티의 전화번호 필드와 일치
          placeholder="전화번호"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="birthday"  // Member 엔티티의 생년월일 필드와 일치
          placeholder="생년월일"
          value={formData.birthday}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"  // Member 엔티티의 주소 필드와 일치
          placeholder="주소"
          value={formData.address}
          onChange={handleChange}
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
          type="email"
          name="email"  // Member 엔티티의 이메일 필드와 일치
          placeholder="[선택] 이메일"
          value={formData.email}
          onChange={handleChange}
        />
        {/* 이미지 업로드 */}
        <input type="file" onChange={handleImageChange} />
        <button type="submit">완료</button>
      </form>
    </div>
  );
}

export default SignUpPage;
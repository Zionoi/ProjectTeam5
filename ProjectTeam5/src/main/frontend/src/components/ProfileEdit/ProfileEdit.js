// ProfileEdit.js
import React, { useState } from 'react';
import './ProfileEdit.css'; // 스타일 파일

function ProfileEdit() {
  const [form, setForm] = useState({
    nickname: '',
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // form 제출 로직 추가
    console.log('Submitted:', form);
  };

  return (
    <div className="profile-edit-container">
      <h2 className="profile-edit-title">나의 정보</h2>
      <form onSubmit={handleSubmit} className="profile-edit-form">
        <div className="profile-image-upload">
          <div className="image-placeholder">
            {/* 이미지 업로드 구현이 필요한 경우 추가 */}
          </div>
          <p className="image-note">* 홈페이지에 들어갈 이미지 파일입니다.</p>
        </div>
        <div className="profile-edit-fields">
          <input
            type="text"
            name="nickname"
            placeholder="변경하실 닉네임을 입력해주세요."
            value={form.nickname}
            onChange={handleChange}
            className="profile-input"
          />
          <input
            type="email"
            name="email"
            placeholder="이메일 주소를 입력해주세요."
            value={form.email}
            onChange={handleChange}
            className="profile-input"
          />
          <input
            type="text"
            name="name"
            placeholder="이름을 입력해주세요."
            value={form.name}
            onChange={handleChange}
            className="profile-input"
          />
          <input
            type="password"
            name="password"
            placeholder="변경하실 비밀번호를 입력해주세요."
            value={form.password}
            onChange={handleChange}
            className="profile-input"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호를 다시 입력해주세요."
            value={form.confirmPassword}
            onChange={handleChange}
            className="profile-input"
          />
          <input
            type="tel"
            name="phone"
            placeholder="변경하실 전화번호를 입력해주세요."
            value={form.phone}
            onChange={handleChange}
            className="profile-input"
          />
          <input
            type="text"
            name="address"
            placeholder="변경하실 주소를 입력해주세요."
            value={form.address}
            onChange={handleChange}
            className="profile-input"
          />
        </div>
        <div className="profile-edit-buttons">
          <button type="button" className="profile-button cancel">취소</button>
          <button type="submit" className="profile-button save">완료</button>
        </div>
      </form>
    </div>
  );
}

export default ProfileEdit;

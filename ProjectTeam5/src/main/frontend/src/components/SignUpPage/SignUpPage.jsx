import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axios 임포트
import './SignUpPage.css'; // SignUpPage 전용 스타일
import { useNavigate } from 'react-router-dom';

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
  const [selectedFile, setSelectedFile] = useState(null); // 파일 선택 상태
  const [isIdAvailable, setIsIdAvailable] = useState(null); // 아이디 중복 여부 상태
  const [isSignUpDisabled, setIsSignUpDisabled] = useState(true); // 회원가입 버튼 비활성화 상태

  const navigate = useNavigate();

  // 아이디 글자가 5자 이상일 때 중복 확인 요청
  useEffect(() => {
    const checkUserId = async () => {
      if (formData.userId.length >= 5) {
        try {
          const response = await axios.get('/member/checkId', {
            params: { userId: formData.userId },
          });
          if (response.data) {
            setIsIdAvailable(false); // 중복된 아이디
            setIsSignUpDisabled(true); // 회원가입 비활성화
          } else {
            setIsIdAvailable(true); // 사용 가능한 아이디
            setIsSignUpDisabled(false); // 회원가입 활성화
          }
        } catch (error) {
          console.error('아이디 확인 중 오류 발생:', error);
        }
      } else {
        setIsIdAvailable(null); // 글자 수가 5자 이하일 때는 상태 초기화
        setIsSignUpDisabled(true); // 회원가입 비활성화
      }
    };

    checkUserId();
  }, [formData.userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // 파일을 선택할 때 상태로 설정
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    // FormData에 회원 정보 추가
    data.append('member', new Blob([JSON.stringify({
      memId: formData.userId,
      pass: formData.password,
      nickname: formData.nickname,
      name: formData.name,
      birthday: formData.birthDate,
      address: formData.address,
      gender: formData.gender,
      phone: formData.phoneNumber,
      email: formData.email,
    })], { type: 'application/json' }));

    // 파일이 있으면 FormData에 추가
    if (selectedFile) {
      data.append('image', selectedFile);
    }

    try {
      await axios.post('/member/signup', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('회원가입이 완료되었습니다.');
      navigate("/");
    } catch (error) {
      alert('회원가입 중 오류가 발생했습니다.');
    }
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
        {isIdAvailable === true && (
          <p style={{ color: 'green' }}>사용할 수 있는 아이디입니다.</p>
        )}
        {isIdAvailable === false && (
          <p style={{ color: 'red' }}>중복된 아이디입니다.</p>
        )}

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
          <label>성별:</label>
          <label className="gender-label">
            <input
              type="radio"
              name="gender"
              value="남성"
              checked={formData.gender === '남성'}
              onChange={handleChange}
              required
            />
            남
          </label>
          <label className="gender-label">
            <input
              type="radio"
              name="gender"
              value="여성"
              checked={formData.gender === '여성'}
              onChange={handleChange}
            />
            여
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

        <button className="signup-submit" type="submit" disabled={isSignUpDisabled}>완료</button>
      </form>

      {/* 홈으로 가기 버튼 추가 */}
      <button className="go-home-button" onClick={() => {navigate('/')}}>
        홈으로 가기
      </button>
    </div>
  );
}

export default SignUpPage;

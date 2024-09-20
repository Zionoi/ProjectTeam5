import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FindIdPassword.css'; // 통합된 스타일 추가

function FindIdPassword() {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    phoneNumber: '',
    userId: '', // 비밀번호 찾기에만 필요
  });
  const [foundId, setFoundId] = useState(''); // 찾은 아이디 상태
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태
  const [mode, setMode] = useState('findId'); // 모드를 'findId' 또는 'findPassword'로 관리
  const navigate = useNavigate();

  // 입력 데이터 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 아이디를 가리는 함수
  const maskId = (id) => {
    if (id.length <= 4) {
      return `${id[0]}***`; // 아이디가 너무 짧을 경우 첫 글자만 표시하고 나머지 숨김
    }
    const visibleStart = id.slice(0, 2); // 앞 2자리
    const visibleEnd = id.slice(-2); // 끝 2자리
    return `${visibleStart}***${visibleEnd}`; // 중간을 ***로 가림
  };

  // 아이디 찾기 요청
  const handleFindId = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('/member/findId', {
        params: {
          name: formData.name,
          birthday: formData.birthDate,
          phone: formData.phoneNumber,
        },
      });
      if (response.data) {
        const maskedId = maskId(response.data.memId); // 아이디를 가림
        setFoundId(`아이디는 ${maskedId}입니다.`);
        setErrorMessage('');
      } else {
        setFoundId('');
        setErrorMessage('해당 정보로 아이디를 찾을 수 없습니다.');
      }
    } catch (error) {
      setErrorMessage('해당 정보로 아이디를 찾을 수 없습니다.');
      setFoundId('');
    }
  };

  // 비밀번호 찾기 요청
  const handleFindPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('/member/findPassword', {
        params: {
          userId: formData.userId,
          name : formData.name,
          birthday: formData.birthDate,
          phone: formData.phoneNumber,
        },
      });
      if (response.data) {
        navigate(`/resetPassword?userId=${formData.userId}`); // 비밀번호 재설정 페이지로 이동
      } else {
        setErrorMessage('해당 정보로 비밀번호를 찾을 수 없습니다.');
      }
    } catch (error) {
      setErrorMessage('비밀번호 찾기 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="find-container">
      <h2>{mode === 'findId' ? '아이디 찾기' : '비밀번호 찾기'}</h2>
      <form onSubmit={mode === 'findId' ? handleFindId : handleFindPassword}>
        {mode === 'findPassword' && (
          <input
            type="text"
            name="userId"
            placeholder="아이디"
            value={formData.userId}
            onChange={handleChange}
            required
          />
        )}
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
          placeholder="생년월일 (YYYYMMDD)"
          value={formData.birthDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="휴대전화 번호"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <button className="find-submit" type="submit">
          {mode === 'findId' ? '아이디 찾기' : '비밀번호 찾기'}
        </button>
      </form>
      {foundId && mode === 'findId' && <p style={{ color: 'green' }}>{foundId}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div className="switch-mode">
        {mode === 'findId' ? (
          <p>
            비밀번호를 찾으시겠습니까?{' '}
            <button onClick={() => setMode('findPassword')} className="switch-button">
              비밀번호 찾기
            </button>
          </p>
        ) : (
          <p>
            아이디를 찾으시겠습니까?{' '}
            <button onClick={() => setMode('findId')} className="switch-button">
              아이디 찾기
            </button>
          </p>
        )}
      </div>

      {/* 홈으로 가기 버튼 추가 */}
      <button className="go-home-button" onClick={() => {navigate('/')}}>
        홈으로 가기
      </button>
    </div>
  );
}

export default FindIdPassword;

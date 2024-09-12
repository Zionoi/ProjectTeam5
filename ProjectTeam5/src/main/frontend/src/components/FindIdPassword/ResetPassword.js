import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css'; // 스타일을 위한 CSS 파일 추가

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId'); // URL에서 userId 가져오기
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    // 비밀번호 확인이 일치하는지 검사
    if (newPassword !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      setSuccessMessage('');
      return;
    }

    try {
      // 서버에 비밀번호 재설정 요청
      const response = await axios.post('/member/resetPassword', null, {
        params: {
            memId: userId, // URL에서 받아온 사용자 ID
            pass: newPassword, // 새 비밀번호
          },
      });

      if (response.data === 'success') {
        setSuccessMessage('비밀번호가 성공적으로 변경되었습니다.');
        setErrorMessage('');
        // 성공적으로 변경 후 로그인 페이지로 이동
        setTimeout(() => {
          navigate('/');
        }, 2000); // 2초 후 로그인 페이지로 이동
      } else {
        setErrorMessage('비밀번호 변경에 실패했습니다.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('비밀번호 변경 중 오류가 발생했습니다.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="reset-container">
      <h2>비밀번호 재설정</h2>
      <form onSubmit={handlePasswordReset}>
        <input
          type="password"
          placeholder="새로운 비밀번호"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="reset-submit">비밀번호 변경</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default ResetPassword;

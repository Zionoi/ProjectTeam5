import React, { useEffect, useState } from 'react';
import axios from 'axios'; // axios 임포트
import './ProfileEdit.css'; // 스타일 파일
import { useNavigate } from 'react-router-dom';

function ProfileEdit() {
  // 밑에 인풋창 기본값에 넣어줄 빈 유즈스테이트 변수
  const [form, setForm] = useState({ 
    nickname: '',
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    birthday: '',
    gender: '',
    imgName: '',
    imgPath: '',
    comments: '',
    greeting: '',
  });
  const [errorMessage, setErrorMessage] = useState(''); // 에러메세지 넣을 깡통
  const [successMessage, setSuccessMessage] = useState(''); // 성공 메세지 넣을 깡통
  const [userId, setUserId] = useState(localStorage.getItem('id'))  // 사용자 정보 담을 유즈스테이트

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/member/get/${userId}`);
        
        // 데이터가 성공적으로 받아졌다면 폼에 초기값을 설정
        const { nickname, email, name, phone, address, birthday, gender, imgName, imgPath, comments, greeting } = response.data;

        setForm({
          nickname: nickname || '',
          email: email || '',
          name: name || '',
          password: '', // 비밀번호는 보안상 표시하지 않음
          confirmPassword: '', // 비밀번호 확인도 비워둠
          phone: phone || '',
          address: address || '',
          birthday: birthday || '',
          gender: gender || '',
          imgName: imgName || '',
          imgPath: imgPath || '',
          comments: comments || '',
          greeting: greeting || '',
        });

      } catch (error) {
        setErrorMessage('사용자 정보를 불러오는 중 오류가 발생했습니다.');
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필수 입력 필드 체크
    if (!form.nickname || !form.name || !form.password) {
      setErrorMessage('닉네임, 이름, 비밀번호는 필수 입력 항목입니다.');
      return;
    }

    // 비밀번호 확인 체크
    if (form.password !== form.confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    axios.post('/member/updateProfile', {
      memId: userId,  // 현재 로그인된 사용자 ID
      nickname: form.nickname,
      email: form.email,
      name: form.name,
      pass: form.password,
      phone: form.phone,
      address: form.address,
      birthday: form.birthday,
      gender: form.gender,
      imgName: form.imgName,
      imgPath: form.imgPath,
      comments: form.comments,
      greeting: form.greeting,
    })
    .then((response) => {
      if (response.data === 'success') {
        setSuccessMessage('정보가 성공적으로 수정되었습니다.');
        setErrorMessage(''); // 성공 시 에러 메시지 초기화
        navigate(`/home/${userId}`)
      } else {
        setErrorMessage('정보 수정 중 문제가 발생했습니다.');
        setSuccessMessage(''); // 실패 시 성공 메시지 초기화
      }
    })
    .catch((error) => {
      setErrorMessage('서버와의 통신 중 오류가 발생했습니다.');
      setSuccessMessage('');
      console.error('Error:', error);
    });
  };

  return (
    <>
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
            required
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
            required
          />
          <input
            type="password"
            name="password"
            placeholder="변경하실 비밀번호를 입력해주세요."
            value={form.password}
            onChange={handleChange}
            className="profile-input"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호를 다시 입력해주세요."
            value={form.confirmPassword}
            onChange={handleChange}
            className="profile-input"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="변경하실 주소를 입력해주세요."
            value={form.address}
            onChange={handleChange}
            className="profile-input"
          />
          <input
            type="text"
            name="birthday"
            placeholder="생일을 입력해주세요."
            value={form.birthday}
            onChange={handleChange}
            className="profile-input"
          />
          <input
            type="text"
            name="gender"
            placeholder="성별을 입력해주세요."
            value={form.gender}
            onChange={handleChange}
            className="profile-input"
          />
        </div>
        <div className="profile-edit-buttons">
          <button type="button" className="profile-button cancel" onClick={() => {
            navigate(-1);
          }}>취소</button>
          <button type="submit" className="profile-button save">완료</button>
        </div>
      </form>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </>
  );
}

export default ProfileEdit;

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // axios import
import './ProfileEdit.css'; // styles import
import { useNavigate } from 'react-router-dom';

function ProfileEdit() {
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
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('id'));
  const [imageFile, setImageFile] = useState(null); // Image file state

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/member/get/${userId}`);
        const { nickname, email, name, phone, address, birthday, gender, imgName, imgPath, comments, greeting } = response.data;

        setForm({
          nickname: nickname || '',
          email: email || '',
          name: name || '',
          password: '',
          confirmPassword: '',
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

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Store the image file in state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nickname || !form.name || !form.password) {
      setErrorMessage('닉네임, 이름, 비밀번호는 필수 입력 항목입니다.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    const formData = new FormData();
    formData.append('memId', userId);
    formData.append('nickname', form.nickname);
    formData.append('email', form.email);
    formData.append('name', form.name);
    formData.append('pass', form.password);
    formData.append('phone', form.phone);
    formData.append('address', form.address);
    formData.append('birthday', form.birthday);
    formData.append('gender', form.gender);
    formData.append('imgName', form.imgName);
    formData.append('imgPath', form.imgPath);
    formData.append('comments', form.comments);
    formData.append('greeting', form.greeting);

    if (imageFile) {
      formData.append('profileImage', imageFile); // Add image file to the form data
    }

    try {
      const response = await axios.post('/member/updateProfile', formData);

      if (response.data === 'success') {
        setSuccessMessage('정보가 성공적으로 수정되었습니다.');
        setErrorMessage('');
        navigate(`/home/${userId}`);
      } else {
        setErrorMessage('정보 수정 중 문제가 발생했습니다.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('서버와의 통신 중 오류가 발생했습니다.');
      setSuccessMessage('');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="profile-edit-container">
        <h2 className="profile-edit-title">나의 정보</h2>
        <form onSubmit={handleSubmit} className="profile-edit-form">
          <div className="profile-image-upload">
            <div className="image-placeholder">
              {imageFile ? (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Uploaded Profile"
                  className="uploaded-image-preview"
                />
              ) : (
                <p>* 이미지 업로드</p>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="profile-input-file"
            />
            <p className="image-note">* 홈페이지에 들어갈 이미지 파일입니다.</p>
          </div>

          <div className="profile-edit-fields">
            {/* Other form inputs */}
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
            <button
              type="button"
              className="profile-button cancel"
              onClick={() => navigate(-1)}
            >
              취소
            </button>
            <button type="submit" className="profile-button save">
              완료
            </button>
          </div>
        </form>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </>
  );
}

export default ProfileEdit;

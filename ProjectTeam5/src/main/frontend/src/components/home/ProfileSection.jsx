import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProfileSection() {
  const [profileImage, setProfileImage] = useState(''); // 프로필 이미지 경로 상태
  const [selectedFile, setSelectedFile] = useState(null); // 파일 상태
  const [comment, setComment] = useState(''); // 코멘트 상태
  const [memId, setMemId] = useState(localStorage.getItem('id')); // 사용자 ID 가져오기
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 사용자 프로필 이미지와 코멘트 가져오기
  useEffect(() => {
    if (!memId) {
      setError('로그인이 필요합니다.');
      setLoading(false);
      return;
    }

    axios.get(`/member/get/${memId}`)
      .then(response => {
        setProfileImage(response.data.imgPath); // 서버에서 받은 이미지 경로 설정
        setComment(response.data.comments || ''); // 서버에서 받은 코멘트 설정
        setLoading(false);
      })
      .catch(() => {
        setError('사용자 정보를 가져오는 중 오류가 발생했습니다.');
        setLoading(false);
      });
  }, [memId]);

  // 파일 선택 시 미리보기 설정
  const handleFileChange = e => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setProfileImage(URL.createObjectURL(file)); // 파일 미리보기
  };

  // 프로필 사진과 코멘트 업로드 처리
  const handleUpload = async () => {
    if (!selectedFile && !comment) {
      alert('이미지나 코멘트를 입력해주세요.');
      return;
    }

    const formData = new FormData();
    if (selectedFile) {
      formData.append('profileImage', selectedFile);
    }
    formData.append('memId', memId);
    formData.append('comment', comment); // 코멘트를 추가

    try {
      await axios.post('/member/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('프로필 사진 및 코멘트가 성공적으로 변경되었습니다.');
    } catch (error) {
      alert('프로필 사진 및 코멘트 업로드 중 오류가 발생했습니다.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-section">
      <h2>프로필</h2>
      <div className="profile-image-container">
        <img 
          src={profileImage} 
          alt="프로필 사진" 
          className="profile-image" 
        />
      </div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="프로필 코멘트를 입력하세요"
        rows="4"
      />
      
      <button onClick={handleUpload}>프로필 수정</button>
    </div>
  );
}

export default ProfileSection;

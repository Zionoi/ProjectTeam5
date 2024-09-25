import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ProfileSection.css";
import defaultProfileImage from '../../img/basicProfile.png'; 
function ProfileSection({ hostId }) {
  const [profileImage, setProfileImage] = useState(''); // 프로필 이미지 경로 상태
  const [selectedFile, setSelectedFile] = useState(null); // 파일 상태
  const [comment, setComment] = useState(''); // 코멘트 상태
  const [memId, setMemId] = useState(hostId); // 사용자 ID 가져오기
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태

  // const defaultProfileImage = '../../img/basicProfile.png'; // 기본 이미지 경로
  const [nick, setNick] = useState(localStorage.getItem('nickName')); // 사용자 닉네임 가져오기

  // 사용자 프로필 이미지와 코멘트 가져오기
  useEffect(() => {
    if (!memId) {
      setError('로그인이 필요합니다.');
      setLoading(false);
      return;
    }

    setMemId(hostId)
    console.log('홈 :',hostId)
    axios.get(`/member/get/${hostId}`)
      .then(response => {
        setProfileImage(response.data.imgPath || defaultProfileImage); // 서버에서 받은 이미지 경로 설정
        setComment(response.data.comments || ''); // 서버에서 받은 코멘트 설정
        setNick(response.data.nickname || '');
        setLoading(false);
      })
      .catch(() => {
        setError('사용자 정보를 가져오는 중 오류가 발생했습니다.');
        setLoading(false);
      });
  }, [hostId]);

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
      setIsEditing(false); // 저장 후 수정 모드 종료
      window.location.reload();
    } catch (error) {
      alert('프로필 사진 및 코멘트 업로드 중 오류가 발생했습니다.');
    }
  };

  // 프로필 이미지 삭제 처리
  const handleDeleteProfileImage = async () => {
    try {
      await axios.delete('/member/deleteImage', { params: { memId: memId } }); // 서버에 이미지 삭제 요청
      setProfileImage(defaultProfileImage); // 기본 이미지로 변경
      setSelectedFile(null); // 선택한 파일 초기화
      alert('프로필 사진이 삭제되었습니다.');
    } catch (error) {
      alert('프로필 사진 삭제 중 오류가 발생했습니다.');
    }
  };

  // 수정 모드 토글 함수
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="profile">Profile</h2>
      <div className="profile-section">
        <div className="profile-image-container">
          <div className="basic-profile">
            <img
              id="basic-profile"
              src={profileImage || defaultProfileImage}
              alt="프로필 사진"
              className={`profile-image ${isEditing ? 'editing' : ''}`} // 수정 모드일 때 불투명도 적용
            />
          </div>
        </div>

        {/* 수정 상태일 때만 파일 업로드 및 코멘트 수정 가능 */}
        {isEditing && (
          <>
            <label className="file-box" htmlFor="input-file">프로필 이미지 넣기</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="input-file"
            />
            <div className="ImgDbutton-container">
              <button onClick={handleDeleteProfileImage} className="profile-delete-btn"></button>
              <div className="ImgDtooltip">이미지 삭제</div>
            </div>
          </>
        )}
        <div className="label-container" cellspacing="0">
          <label className="nickname-label">{nick}</label>
          <label className="memId-label">({memId})</label>
        </div>
        <textarea
          placeholder="코멘트를 입력해주세요."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          disabled={!isEditing}
          className={`textareabox ${isEditing ? 'editing' : ''}`} // 수정 모드일 때만 박스 표시
        />

        {/* 접속 아이디와 hostId가 같을 때만 프로필 수정 버튼 표시 */}
        {localStorage.getItem("id") === hostId && (
          isEditing ? (
            <button onClick={handleUpload} className="profile-save-btn">저장</button>
          ) : (
            <button onClick={toggleEditMode} className="profile-edit-btn">프로필 수정</button>
          )
        )}
      </div>
    </div>
  );
}

export default ProfileSection;

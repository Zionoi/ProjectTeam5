import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TopComments.css';

function TopComments() {
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [greeting, setGreeting] = useState('인삿말 '); // 인삿말 상태
  const [newGreeting, setNewGreeting] = useState(''); // 입력된 새로운 인삿말 상태
  const [selectedFile, setSelectedFile] = useState(null); // 파일 상태 (선택한 이미지 파일)
  const memId = localStorage.getItem('id'); // 사용자 ID 가져오기 (로컬 저장소에서)

  // 서버에서 사용자 인삿말 가져오기
  useEffect(() => {
    if (!memId) {
      return;
    }

    axios.get(`/member/get/${memId}`)
      .then(response => {
        setGreeting(response.data.greeting || ''); // 서버에서 받은 인삿말 설정
        setNewGreeting(response.data.greeting || ''); // 수정 시 사용할 인삿말 설정
      })
      .catch(() => {
        console.error('사용자 정보를 가져오는 중 오류가 발생했습니다.');
      });
  }, [memId]);

  // 수정 모드 토글
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // 인삿말 수정 시 호출되는 함수
  const handleInputChange = (e) => {
    setNewGreeting(e.target.value);
  };

  // 파일 선택 시 호출되는 함수
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // 선택한 파일을 상태로 저장
  };

  // 인삿말과 파일을 저장하는 함수 (서버로 전달)
  const saveGreeting = async () => {
    const formData = new FormData(); // FormData 객체 생성
    formData.append('memId', memId); // 사용자 ID 추가
    formData.append('greeting', newGreeting); // 새 인삿말 추가

    // 파일이 선택된 경우에만 FormData에 파일 추가
    if (selectedFile) {
      formData.append('profileImage', selectedFile);
    }

    try {
      // 서버로 인삿말을 저장하는 요청
      await axios.post('/member/greeting', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // 성공 시 인삿말을 갱신
      setGreeting(newGreeting);
      setIsEditing(false); // 수정 모드 종료
      alert('인삿말이 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('Error saving greeting:', error);
      alert('인삿말 저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      {!isEditing ? (
        <div>
          <a className="homgepage-Co">{greeting || '사용자 홈페이지 인삿말'}</a>
          <button className="homgepage-Co-edit" onClick={toggleEdit}>수정</button>
        </div>
      ) : (
        <div>
          <input 
            type="text" 
            value={newGreeting} 
            onChange={handleInputChange} 
            className="homgepage-Co-input"
          />
          <button className="homgepage-Co-edit" onClick={saveGreeting}>저장</button>
        </div>
      )}
    </div>
  );
}

export default TopComments;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FriendsList.css'; // 스타일 파일 추가

function FriendsList() {
  const [friends, setFriends] = useState([]);  // 친구 목록 상태
  const [isOpen, setIsOpen] = useState(false); // 목록이 열렸는지 상태

  useEffect(() => {
    // 친구 목록 데이터를 가져오는 함수
    const fetchFriends = async () => {
      const userId = localStorage.getItem('id');
      try {
        // 수정된 경로 및 쿼리 파라미터
        const response = await axios.get(`/friends/total`, { params: { userId } });
        setFriends(response.data); // 응답 데이터를 상태로 설정
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, []);

  const toggleList = () => {
    setIsOpen(!isOpen); // 목록 열기/닫기 토글
  };

  return (
    <div>
      <button onClick={toggleList}>친구 목록</button>
      <div className={`friends-list ${isOpen ? 'open' : ''}`}>
        {friends.length > 0 ? (
          <ul>
            {friends.map((friend) => (
              <li key={friend.fNum}>{friend.friendId}</li>
            ))}
          </ul>
        ) : (
          <p>친구가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default FriendsList;

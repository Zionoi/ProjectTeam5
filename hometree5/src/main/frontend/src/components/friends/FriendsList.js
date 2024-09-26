// src/components/FriendsList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FriendsList.css';

function FriendsList({ hostId, setHostId }) {
  const [friends, setFriends] = useState([]); // 친구 목록을 저장하는 상태
  const navigate = useNavigate();

  // 친구 목록을 가져오는 함수
  const fetchFriends = () => {
    axios.get('/friends/total', {
      params: { memId: localStorage.getItem('id') }, // 실제 로그인된 사용자 ID
    })
      .then(response => {
        console.log('친구 목록을 받았습니다:', response.data); // 서버에서 받은 데이터 확인
        setFriends(response.data); // 친구 목록 설정
      })
      .catch(error => console.error('친구 목록을 불러오는 중 오류가 발생했습니다', error)); // 에러 처리
  };

  useEffect(() => {
    fetchFriends(); // 컴포넌트가 마운트될 때 친구 목록을 가져옴
  }, []);

  // 친구 삭제
  const deleteFriend = (fNum) => {
    if (window.confirm('정말로 친구를 삭제하시겠습니까?')) {  // 확인창을 띄움
      console.log(`친구 삭제 시도 fNum: ${fNum}`);

      axios.post(`/friends/delete`, null, {
        params: { fNum: fNum },
      })
        .then(() => {
          console.log(`친구를 삭제했습니다: ${fNum}`);
          fetchFriends(); // 친구를 삭제한 후 친구 목록을 다시 가져옴
        })
        .catch(error => {
          console.error('친구 삭제 중 오류가 발생했습니다', error);
        });
    }
  };

  // 친구 홈페이지로 이동
  const goFriendHome = (friendId) => {
    setHostId(friendId);
    console.log('친구홈페이지 : ', friendId);
    navigate(`/home/${friendId}`); // 친구의 홈으로 이동
  };

  return (
    <div className="friends-section-list">
      <h3 className="list-friends">친구 목록</h3>
      {friends.length === 0 ? ( // 친구 목록이 없을 때 메시지 표시
        <p>친구 목록이 없습니다.<br/> 새로운 친구를 추가해주세요!</p>
      ) : (
        <ul>
          {friends.map(friend => (
            <li key={friend.fNum}>
              <span className="f-list" onClick={() => goFriendHome(friend.friendId)}>{friend.friendId}</span>
              <button onClick={() => deleteFriend(friend.fNum)}>삭제</button> 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FriendsList;

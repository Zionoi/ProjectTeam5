// src/components/FriendsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FriendsList() {
  const [friends, setFriends] = useState([]); // 친구 목록을 저장하는 상태

  useEffect(() => {
    // 서버에서 친구 목록 가져오기
    axios.get('/friends/total', {
      params: { memId: 'user02' }, // 실제 로그인된 사용자 ID  // 하드 코딩
    })
    .then(response => {
      console.log('친구 목록을 받았습니다:', response.data); // 서버에서 받은 데이터 확인
      setFriends(response.data); // 친구 목록 설정
    })
    .catch(error => console.error('친구 목록을 불러오는 중 오류가 발생했습니다', error)); // 에러 처리
  }, []);

  // 친구 삭제
  const deleteFriend = (fNum) => {
    console.log(`친구 삭제 시도 fNum: ${fNum}`);

    axios.post(`/friends/delete`, null, {
      params: { fNum: fNum },
    })
    .then(() => {
      console.log(`친구를 삭제했습니다: ${fNum}`);
      setFriends(friends.filter(friend => friend.fNum !== fNum)); // 친구 목록에서 제거
    })
    .catch(error => {
      console.error('친구 삭제 중 오류가 발생했습니다', error);
    });
  };

  return (
    <div>
      <h3>친구 목록</h3>
      <ul>
        {friends.map(friend => (
          <li key={friend.fNum}>
            {friend.friendId} <button onClick={() => deleteFriend(friend.fnum)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FriendsList;

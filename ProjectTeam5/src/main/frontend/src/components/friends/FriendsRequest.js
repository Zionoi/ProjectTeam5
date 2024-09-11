import React, { useState } from 'react';
import axios from 'axios';

function FriendsRequest() {
  const [friendId, setFriendId] = useState(''); // 친구 ID를 입력받기 위한 상태
  const [message, setMessage] = useState(''); // 요청 결과 메시지를 저장하기 위한 상태

  const sendFriendRequest = () => {
    // 데이터가 잘 넘어가는지 로그로 확인
    console.log("친구 요청 전송: memId = 'user01', friendId = " + friendId); 

    axios.post('/friends/sendRequest', null, {
      params: {
        memId: 'user01', // 실제 로그인된 사용자 ID   // 하드 코딩
        friendId: friendId, // 입력한 친구의 ID
      },
    })
    .then(response => {
      console.log("친구 요청 성공: ", response.data); // 성공 시 데이터 확인
      setMessage(response.data); 
    })
    .catch(error => {
      console.error("친구 요청 실패: ", error); // 에러 로그
      setMessage('Error sending request'); 
    });
  };

  return (
    <div className="friends-section">
      <h3>친구 추가</h3>
      <input
        type="text"
        placeholder="친구ID를 입력해주세요"
        value={friendId} // 입력 필드와 상태 연결
        onChange={e => setFriendId(e.target.value)} // 입력값을 상태로 저장
      />
      <button onClick={sendFriendRequest}>친구 요청</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default FriendsRequest;

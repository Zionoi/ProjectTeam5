// src/components/FriendsSection.js
// import React from 'react';
// import './FriendsSection.css'; // 스타일 파일을 추가합니다.

// function FriendsSection() {
//   return (
//     <div className="friends-section">
//       <h3>친구추가</h3>
//       <ul>
//         <li>USER01(25**)</li>
//         <li>OBJEC(B06**)</li>
//         <li>JAV(JAV1**)</li>
//       </ul>
//       <button className="request-button">리퀘스트</button>
//     </div>
//   );
// }

// export default FriendsSection;

import React, { useState } from 'react';
import axios from 'axios';

function FriendsSection() {
  const [friendId, setFriendId] = useState(''); // 친구 ID를 입력받기 위한 상태
  const [message, setMessage] = useState(''); // 요청 결과 메시지를 저장하기 위한 상태

  const sendFriendRequest = () => {
    axios.post('/friends/sendRequest', null, {
      params: {
        memId: 'yourMemId', // 실제 로그인된 사용자 ID
        friendId: friendId, // 검색한 친구의 ID
      },
    })
    .then(response => setMessage(response.data)) // 성공 메시지 설정
    .catch(error => setMessage('Error sending request')); // 실패 메시지 설정
  };

  return (
    <div className="friends-section">
      <h3>친구추가</h3>
      <input
        type="text"
        placeholder="Search by Friend ID" // 친구 ID 입력 필드
        value={friendId} // 입력값을 상태로 연결
        onChange={e => setFriendId(e.target.value)} // 입력값이 변경되면 상태 업데이트
      />
      <button onClick={sendFriendRequest}>친구 요청</button> {/* 버튼 클릭 시 요청 전송 */}
      {message && <p>{message}</p>} {/* 결과 메시지 출력 */}
    </div>
  );
}

export default FriendsSection;


import React, { useState } from 'react';
import axios from 'axios';

function FriendsRequest({ memId = localStorage.getItem('id') }) { // loggedInUser로 로그인한 사용자 정보를 전달받음
  const [friendId, setFriendId] = useState(''); // 친구 ID를 입력받기 위한 상태
  const [message, setMessage] = useState(''); // 요청 결과 메시지를 저장하기 위한 상태

  const sendFriendRequest = () => {
    // 본인에게 친구 요청을 보낼 수 없도록 처리
    if (friendId === memId) {
      setMessage('자신에게 친구 요청을 보낼 수 없습니다.');
      return;
    }

    // 친구 ID 존재 여부 확인
    axios.get('/member/exists', { params: { memId: friendId } })
      .then(response => {
        if (!response.data) {
          setMessage('존재하지 않는 친구 ID입니다.');
          return;
        }

        // 친구 요청 보내기
        console.log("친구 요청 전송: memId = ", memId, ", friendId = ", friendId);

        axios.post('/friends/sendRequest', null, {
          params: {
            memId: memId, // 실제 로그인된 사용자 ID
            friendId: friendId, // 입력한 친구의 ID
          },
        })
        .then(response => {
          setMessage(response.data);
        })
        .catch(error => {
          console.error("친구 요청 실패: ", error);
          setMessage('친구 요청에 실패했습니다.');
        });
      })
      .catch(error => {
        console.error("아이디 확인 중 오류 발생:", error);
        setMessage('아이디 확인 중 오류가 발생했습니다.');
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

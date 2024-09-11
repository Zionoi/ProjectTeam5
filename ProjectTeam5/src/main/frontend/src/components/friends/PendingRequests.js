import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PendingRequests() {
  const [requests, setRequests] = useState([]); // 대기 중인 요청 목록을 저장하는 상태

  useEffect(() => {
    // 서버에서 대기 중인 친구 요청 목록 가져오기
    axios.get('/friends/pendingReceivedRequests', {
      params: { friendId: 'user04' }, // 실제 로그인된 사용자 ID
    })
    .then(response => {
      console.log("Received pending requests:", response.data); // 받은 데이터 확인
      setRequests(response.data); // 대기 중인 요청 목록 설정
    })
    .catch(error => {
      console.error('Error fetching requests', error); // 에러 처리
    });
  }, []);

  // 친구 요청 수락
  const acceptRequest = (fNum) => {
    console.log(`Accepting friend request with fNum: ${fNum}`);

    axios.post(`/friends/accept`, null, {
      params: { fNum: fNum },
    })
    .then(() => {
      console.log(`Friend request accepted with fNum: ${fNum}`);
      setRequests(requests.filter(req => req.fNum !== fNum)); // 요청 목록에서 제거
    })
    .catch(error => {
      console.error('Error accepting friend request', error);
    });
  };

  // 친구 요청 거절
  const rejectRequest = (fNum) => {
    console.log(`Rejecting friend request with fNum: ${fNum}`);

    axios.post(`/friends/reject`, null, {
      params: { fNum: fNum },
    })
    .then(() => {
      console.log(`Friend request rejected with fNum: ${fNum}`);
      setRequests(requests.filter(req => req.fnum !== fNum)); // 요청 목록에서 제거
    })
    .catch(error => {
      console.error('Error rejecting friend request', error);
    });
  };

  return (
    <div>
      <h3>대기 중인 요청</h3>
      {requests.map(req => (
        <div key={req.fnum}>
          <span>{req.member.memId} 님이 친구 요청했습니다!</span>
          <button onClick={() => acceptRequest(req.fnum)}>수락</button>
          <button onClick={() => rejectRequest(req.fnum)}>거절</button>
        </div>
      ))}
    </div>
  );
}

export default PendingRequests;

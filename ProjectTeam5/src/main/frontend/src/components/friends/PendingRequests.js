import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PendingRequests() {
  const [requests, setRequests] = useState([]); // 대기 중인 요청 목록을 저장하는 상태

  useEffect(() => {
    // 서버에서 대기 중인 친구 요청 목록 가져오기
    axios.get('/friends/pendingReceivedRequests', {
      params: { friendId: 'yourMemId' }, // 실제 로그인된 사용자 ID
    })
    .then(response => setRequests(response.data)) // 대기 중인 요청 목록 설정
    .catch(error => console.error('Error fetching requests', error)); // 에러 처리
  }, []);

  // 친구 요청 수락
  const acceptRequest = (fNum) => {
    axios.post(`/friends/accept`, null, {
      params: { fNum: fNum },
    }).then(() => setRequests(requests.filter(req => req.fNum !== fNum))); // 요청 목록에서 제거
  };

  // 친구 요청 거절
  const rejectRequest = (fNum) => {
    axios.post(`/friends/reject`, null, {
      params: { fNum: fNum },
    }).then(() => setRequests(requests.filter(req => req.fNum !== fNum))); // 요청 목록에서 제거
  };

  return (
    <div>
      <h3>Pending Friend Requests</h3>
      {requests.map(req => (
        <div key={req.fNum}>
          <span>{req.member.memId} sent you a friend request</span>
          <button onClick={() => acceptRequest(req.fNum)}>Accept</button>
          <button onClick={() => rejectRequest(req.fNum)}>Reject</button>
        </div>
      ))}
    </div>
  );
}

export default PendingRequests;

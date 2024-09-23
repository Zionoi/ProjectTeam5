import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PendingRequests.css';

function PendingRequests({ memId }) { 
  const [requests, setRequests] = useState([]); 

  useEffect(() => {
    axios.get('/friends/pendingReceivedRequests', {
      params: { friendId: localStorage.getItem('id') }, 
    })
    .then(response => {
      console.log("Received pending requests:", response.data);
      setRequests(response.data); 
    })
    .catch(error => {
      console.error('Error fetching requests', error);
    });
  }, [memId]);

  const acceptRequest = (fNum) => {
    console.log(`Accepting friend request with fNum: ${fNum}`);
    axios.post(`/friends/accept`, null, { params: { fNum } })
      .then(() => {
        console.log(`Friend request accepted with fNum: ${fNum}`);
        setRequests(requests.filter(req => req.fNum !== fNum)); 
        window.location.reload();
      })
      .catch(error => {
        console.error('Error accepting friend request', error);
      });
  };

  const rejectRequest = (fNum) => {
    console.log(`Rejecting friend request with fNum: ${fNum}`);
    axios.post(`/friends/reject`, null, { params: { fNum } })
      .then(() => {
        console.log(`Friend request rejected with fNum: ${fNum}`);
        setRequests(requests.filter(req => req.fNum !== fNum)); 
        window.location.reload();
      })
      .catch(error => {
        console.error('Error rejecting friend request', error);
      });
  };

  return (
    <div className='friends-section-pending'>
      <h3>대기 중인 요청</h3>
      {requests.length > 0 ? (
        requests.map(req => (
          <div className='request-message' key={req.fnum}>
            <span><strong>{req.member.memId}</strong> 님이 친구 요청했습니다!</span>
            <br/>
            <div>
              <button onClick={() => rejectRequest(req.fnum)}>거절</button>
              <button onClick={() => acceptRequest(req.fnum)}>수락</button>
            </div>
          </div>
        ))
      ) : (
        <p>요청 목록이 없습니다</p>
      )}
    </div>
  );
}

export default PendingRequests;

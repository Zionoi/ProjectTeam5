// // src/components/FriendsSection.js
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

// src/components/FriendsSection.js
import React, { useState } from 'react';
import FriendsRequest from '../friends/FriendsRequest'; // 친구 요청 컴포넌트
import PendingRequests from '../friends/PendingRequests'; // 대기중인 요청 컴포넌트
import FriendsList from '../friends/FriendsList'; // 친구 목록 컴포넌트
import './FriendsSection.css'; // 스타일 파일

function FriendsSection({hostId, setHostId}) {
  const [view, setView] = useState(''); // 현재 보여줄 컴포넌트를 관리하는 상태

  return (
    <div className="friends-section">
      <h3>친구 관리</h3>
      
      {/* 버튼들 */}
      <div className="button-container">
        <button className="request-button" onClick={() => setView('friendsList')}>
          친구 목록
        </button>
        <button className="request-button" onClick={() => setView('friendsRequest')}>
          친구 추가
        </button>
        <button className="request-button" onClick={() => setView('pendingRequests')}>
          친구 요청
        </button>
      </div>
      
      {/* 조건에 따라 컴포넌트 표시 */}
      <div>
        {view === 'friendsList' &&  <FriendsList hostId={hostId} setHostId={setHostId}/>}
        {view === 'friendsRequest' && <FriendsRequest />}
        {view === 'pendingRequests' && <PendingRequests />}
      </div>
    </div>
  );
}

export default FriendsSection;

// FriendsSection.jsx
import React, { useState } from 'react';
import FriendsRequest from '../friends/FriendsRequest'; // 친구 요청 컴포넌트
import PendingRequests from '../friends/PendingRequests'; // 대기중인 요청 컴포넌트
import FriendsList from '../friends/FriendsList'; // 친구 목록 컴포넌트
import './FriendsSection.css'; // 스타일 파일

function FriendsSection({ hostId, setHostId }) {
  const [view, setView] = useState(''); // 현재 보여줄 컴포넌트를 관리하는 상태

  // 버튼 클릭 시 view 상태를 설정하는 함수
  const toggleView = (selectedView) => {
    // 현재 클릭된 버튼이 다시 클릭되면 슬라이드 닫기
    if (view === selectedView) {
      setView(''); // 동일한 버튼을 다시 클릭하면 view 상태를 빈 값으로 설정하여 슬라이드 닫기
    } else {
      setView(selectedView); // 클릭된 버튼의 view 값으로 변경
    }
  };

  return (
    <div className="friends-section">
      <h3>친구 관리</h3>

      {/* 버튼들 */}
      <div className="button-container">
        <button className={`request-button ${view === 'friendsList' ? 'active' : ''}`} 
                onClick={() => toggleView('friendsList')}>
          친구 목록
        </button>
        <button className={`request-button ${view === 'friendsRequest' ? 'active' : ''}`} 
                onClick={() => toggleView('friendsRequest')}>
          친구 추가
        </button>
        <button className={`request-button ${view === 'pendingRequests' ? 'active' : ''}`} 
                onClick={() => toggleView('pendingRequests')}>
          친구 요청
        </button>
      </div>
      
      {/* 슬라이드로 폼 보여주기 */}
      <div className={`form-container ${view ? 'open' : ''}`}>
        {view === 'friendsList' && <FriendsList hostId={hostId} setHostId={setHostId} />}
        {view === 'friendsRequest' && <FriendsRequest />}
        {view === 'pendingRequests' && <PendingRequests />}
      </div>
    </div>
  );
}

export default FriendsSection;

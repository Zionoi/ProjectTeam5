import React, { useState } from 'react';
import FriendsRequest from '../friends/FriendsRequest';
import PendingRequests from '../friends/PendingRequests';
import FriendsList from '../friends/FriendsList';
import FriendsBlock from '../friends/FriendsBlock'; // 새로운 차단 컴포넌트
import './FriendsSection.css';

function FriendsSection({ hostId, setHostId }) {
  const [view, setView] = useState('');

  const toggleView = (selectedView) => {
    if (view === selectedView) {
      setView('');
    } else {
      setView(selectedView);
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
        <button className={`request-button ${view === 'friendsBlock' ? 'active' : ''}`} 
                onClick={() => toggleView('friendsBlock')}>
          사용자 차단
        </button>
      </div>

      {/* 슬라이드로 폼 보여주기 */}
      <div className={`form-container ${view ? 'open' : ''}`}>
        {view === 'friendsList' && <FriendsList hostId={hostId} setHostId={setHostId} />}
        {view === 'friendsRequest' && <FriendsRequest />}
        {view === 'pendingRequests' && <PendingRequests />}
        {view === 'friendsBlock' && <FriendsBlock />} {/* 차단 컴포넌트 추가 */}
      </div>
    </div>
  );
}

export default FriendsSection;

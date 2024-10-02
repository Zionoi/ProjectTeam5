import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FriendsList.css';

function FriendsList({ hostId, setHostId }) {
  const [friends, setFriends] = useState([]); // 친구 목록을 저장하는 상태
  const [isFriendListOpen, setIsFriendListOpen] = useState(false); // 친구 목록 공개 여부
  const [isOwner, setIsOwner] = useState(false); // 현재 페이지의 소유자인지 여부
  const navigate = useNavigate();

  // 로컬 스토리지에서 사용자 ID를 가져옴
  const localUserId = localStorage.getItem('id');

  
  // 친구 목록을 가져오는 함수
  const fetchFriends = () => {
    console.log('친구목록 hostId :', hostId);
    axios.get('/friends/total', {
      params: { memId: hostId }, // 현재 홈페이지 주인의 ID로 요청
    })
      .then(response => {
        console.log('친구 목록을 받았습니다:', response.data); // 서버에서 받은 데이터 확인
        if (response.data === '비공개') {
          setFriends('비공개'); // 비공개 처리
        } else {
          setFriends(response.data); // 친구 목록 설정
        }
      })
      .catch(error => console.error('친구 목록을 불러오는 중 오류가 발생했습니다', error)); // 에러 처리
  };

// 친구 목록 공개 여부 상태를 가져오는 함수
const fetchFriendListOpenStatus = () => {
  axios.get('/member/friendListOpen/status', { params: { memId: hostId } }) // GET 요청은 params로 보냄
    .then(response => {
      console.log('친구 목록 공개 여부:', response.data);
      setIsFriendListOpen(response.data); // response.data는 boolean 값이므로 그대로 사용
    })
    .catch(error => console.error('친구 목록 공개 여부를 불러오는 중 오류가 발생했습니다', error));
};

// 친구 목록 공개 여부를 변경하는 함수 (소유자만 변경 가능)
const toggleFriendListOpen = () => {
  axios.post('/member/friendListOpen', null, { // POST 요청, 추가 파라미터 필요 없음
    params: { memId: hostId } // memId만 전송
  })
    .then(() => {
      fetchFriendListOpenStatus(); // 변경 후 상태 다시 가져옴
      console.log('친구 목록 공개 여부를 변경했습니다');
    })
    .catch(error => console.error('친구 목록 공개 여부를 변경하는 중 오류가 발생했습니다', error));
};

  useEffect(() => {
    if (hostId) {
      setIsOwner(hostId === localUserId); // 현재 페이지의 소유자 여부 판단
      fetchFriends(); // 친구 목록 가져오기
      fetchFriendListOpenStatus(); // 친구 목록 공개 여부 가져오기
    }
  }, [hostId, localUserId]);

  // 친구 삭제
  const deleteFriend = (fNum) => {
    if (window.confirm('정말로 친구를 삭제하시겠습니까?')) {  // 확인창을 띄움
      console.log(`친구 삭제 시도 fNum: ${fNum}`);

      axios.post(`/friends/delete`, null, {
        params: { fNum: fNum },
      })
        .then(() => {
          console.log(`친구를 삭제했습니다: ${fNum}`);
          fetchFriends(); // 친구를 삭제한 후 친구 목록을 다시 가져옴
        })
        .catch(error => {
          console.error('친구 삭제 중 오류가 발생했습니다', error);
        });
    }
  };

  // 친구 홈페이지로 이동
  const goFriendHome = (friendId) => {
    setHostId(friendId);
    navigate(`/home/${friendId}`); // 친구의 홈으로 이동
  };

  return (
    <div className="friends-section-list">
      <h3 className="list-friends">{hostId}님의 친구 목록</h3>

      {/* 친구 목록 공개 여부 토글 버튼 (소유자일 때만 표시) */}
      {isOwner && (
      <div>
        <label style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
          친구 목록 {isFriendListOpen ? " 공개" : " 비공개"}
          <input
            type="checkbox"
            checked={isFriendListOpen}
            onChange={toggleFriendListOpen} // 토글 버튼 클릭 시 상태 변경
            style={{ marginLeft: '8px' }} // 체크박스와 텍스트 사이 간격 조정
          />
        </label>
      </div>
    )}
     {/* 홈페이지 주인일때와 방문자일때를 나눠서 출력 및 친구 목록이 비공개이거나 친구가 없을 때 처리 */}
      {hostId !== localUserId ? (
        // 방문자일 때
        !isFriendListOpen ? (
          <p>친구 목록이 비공개입니다.</p>
        ) : friends.length === 0 ? (
          <p>친구 목록이 없습니다.<br /> 당신이 첫 친구가 되어주세요!</p>
        ) : (
          <ul>
            {friends.map(friend => (
              <li key={friend.fnum}>
                <span className="f-list" onClick={() => goFriendHome(friend.friendId)}>{friend.friendId}</span>
              </li>
            ))}
          </ul>
        )
      ) : (
        // 홈페이지 주인일 때
        friends.length === 0 ? (
          <p>친구 목록이 없습니다.<br /> 친구를 추가해주세요!</p>
        ) : (
          <ul>
            {friends.map(friend => (
              <li key={friend.fnum}>
                <span className="f-list" onClick={() => goFriendHome(friend.friendId)}>{friend.friendId}</span>
                <button onClick={() => deleteFriend(friend.fnum)}>삭제</button>
              </li>
            ))}
          </ul>
        )
      )}

    </div>
  );
}

export default FriendsList;

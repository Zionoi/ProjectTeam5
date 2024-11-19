import React, { useState } from 'react';
import axios from 'axios';
import './FriendsBlock.css';

function FriendsBlock({ memId = localStorage.getItem('id') }) {
  const [blockId, setBlockId] = useState(''); // 차단할 사용자 ID
  const [message, setMessage] = useState(''); // 결과 메시지

  const sendBlockRequest = () => {
    // 본인을 차단할 수 없도록 처리
    if (blockId === memId) {
      setMessage('자신을 차단할 수 없습니다.');
      return;
    }

    // 사용자 존재 여부 확인
    axios.get('/member/exists', { params: { memId: blockId } })
      .then(response => {
        if (!response.data) {
          setMessage('존재하지 않는 사용자 ID입니다.');
          return;
        }

        // "정말로 차단하시겠습니까?" 확인 메시지
        const confirmBlock = window.confirm("정말로 차단하시겠습니까?");
        if (!confirmBlock) {
          setMessage('차단이 취소되었습니다.');
          return; // 사용자가 취소를 누르면 차단을 진행하지 않음
        }

        // 차단 요청 보내기 (확인된 후 실행)
        console.log("차단 요청 전송: memId = ", memId, ", blockId = ", blockId);

        axios.post('/friends/blockUser', null, {
          params: {
            memId: memId, // 실제 로그인된 사용자 ID
            blockId: blockId, // 입력한 차단할 ID
          },
        })
        .then(response => {
          setMessage(response.data); // 차단 성공 메시지
        })
        .catch(error => {
          console.error("차단 요청 실패: ", error);
          setMessage('사용자 차단에 실패했습니다.');
        });
      })
      .catch(error => {
        console.error("아이디 확인 중 오류 발생:", error);
        setMessage('아이디 확인 중 오류가 발생했습니다.');
      });
  };

  return (
    <div className="friends-section-block">
      <h3>사용자 차단</h3>
      <input
        type="text"
        placeholder="차단할 사용자 ID를 입력해주세요"
        value={blockId} // 입력 필드와 상태 연결
        onChange={e => setBlockId(e.target.value)} // 입력값을 상태로 저장
      />
      <div className="button-con">
        <button onClick={sendBlockRequest}>사용자 차단</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default FriendsBlock;

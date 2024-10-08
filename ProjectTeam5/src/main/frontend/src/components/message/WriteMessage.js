import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WriteMessage.css';

const WriteMessage = ({ recipient }) => {
  const [receiver, setReceiver] = useState(recipient || '');  // 수신자 상태 초기화
  const [mContent, setmContent] = useState('');  // 메시지 내용 상태
  const senderId = localStorage.getItem("id");  // 발신자 ID

  // 수신자 초기값 설정 (답장 시에만 사용)
  useEffect(() => {
    if (recipient) {
      setReceiver(recipient);  // 답장을 할 때는 발신자를 수신자로 자동 설정
    }
  }, [recipient]);

  const sendMessage = () => {
    // 자기 자신에게 메시지를 보내는지 확인
    if (receiver === senderId) {
      alert("자기 자신에게는 메시지를 보낼 수 없습니다.");
      return;
    }

    // 메시지 전송 요청을 백엔드에 보냄
    axios.post('/api/messages/send', {
      memId: senderId,  // 발신자 ID
      friendId: receiver,  // 수신자 ID
      mcontent: mContent   // 메시지 내용
    })
    .then((response) => {
      if (response.data) {
        // 친구라면 메시지 전송 성공
        alert(`${receiver} 님에게 메세지를 발송했습니다.`);
        setmContent('');  // 입력 필드 초기화
        setReceiver('');  // 수신자 필드 초기화
      } else {
        // 친구가 아니라면 메시지 전송 불가
        alert("친구가 아닌 사람에게는 메시지를 보낼 수 없습니다.");
      }
    })
    .catch(error => console.error("Error sending message:", error));
  };

  return (
    <div className='writeMessageContainer'>
      <h5 className="WM-btn">쪽지 보내기</h5>
      <input
        className="WriteMessage"
        type="text"
        placeholder="받는 사람"
        value={receiver}
        onChange={e => setReceiver(e.target.value)}  // 수신자 입력 필드
      /><br/>
      <textarea
        type="text"
        placeholder="쪽지를 작성해주세요"
        value={mContent}
        onChange={e => setmContent(e.target.value)}  // 메시지 내용 입력 필드
      /><br/><br/>
      <button className="WM-Sbtn" onClick={sendMessage}>전송</button>  {/* 메시지 전송 버튼 */}
    </div>
  );
}

export default WriteMessage;

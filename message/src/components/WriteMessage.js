import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const WriteMessage = () => {
  // URL 쿼리 파라미터에서 수신자 ID 받아오기
  const [searchParams] = useSearchParams();
  const recipient = searchParams.get('to') || ''; // URL 쿼리 파라미터에서 'to' 값 가져오기

  const [receiver, setReceiver] = useState(recipient);  // 수신자 상태 초기화
  const [mContent, setmContent] = useState('');    // 메시지 내용 상태

  // 수신자가 있을 경우 자동으로 설정하고 없으면 사용자가 입력할 수 있게 처리
  useEffect(() => {
    if (recipient) {
      setReceiver(recipient); // URL 쿼리 파라미터로 받은 수신자를 자동으로 설정
    }
  }, [recipient]);

  console.log('통신전 receiver----', receiver);
  console.log('통신전 mContent----', mContent);

  // 메시지 전송 함수
  const sendMessage = () => {
    axios.post('/api/messages/send', {
      memId: 'user02',  // 발신자 ID (예시)
      friendId: receiver,  // 수신자 ID
      mcontent: mContent   // 메시지 내용
    })
      .then(() => {
        console.log('receiver----', receiver);
        console.log('mContent----', mContent);
        alert('Message sent');
        setmContent('');  // 입력 필드 초기화
        if (!recipient) {
          setReceiver(''); // 수신자 입력 필드 초기화 (수신자가 자동으로 설정된 경우에는 초기화하지 않음)
        }
      })
      .catch(error => console.error("Error sending message:", error));
  };

  return (
    <div>
      <h2>쪽지 보내기</h2>
      <input
        type="text"
        placeholder="받는 사람"
        value={receiver}
        onChange={e => setReceiver(e.target.value)}  // 수신자 입력 필드 (자동 설정된 경우 읽기 전용으로 설정하지 않음)
        // readOnly={!!recipient}  // 수신자가 이미 설정된 경우 읽기 전용
      /><br/>
      <input
        type="text"
        placeholder="쪽지를 작성해주세요"
        value={mContent}
        onChange={e => setmContent(e.target.value)}  // 메시지 내용 입력 필드
      /><br/><br/>
      <button onClick={sendMessage}>전송</button>  {/* 메시지 전송 버튼 */}
    </div>
  );
}

export default WriteMessage;

// src/components/WriteMessage.js

import React, { useState } from 'react';
import axios from 'axios';

const WriteMessage = () => {
  const [receiver, setReceiver] = useState('');  // 수신자 상태
  const [mContent, setmContent] = useState('');    // 메시지 내용 상태
  console.log('통신전 receiver----',receiver)
  console.log('통신전 mContent----',mContent)
  // 메시지 전송 함수
  const sendMessage = () => {
    axios.post('/api/messages/send', {
      memId: localStorage.getItem('id'),  // 발신자 ID
      friendId: receiver,          // 수신자 ID
      mcontent: mContent            // 메시지 내용
    })
    .then(() => {
      console.log('receiver----', receiver);
      console.log('mContent----', mContent);
      alert('Message sent');
      setmContent('');  // 입력 필드 초기화
      setReceiver(''); // 수신자 입력 필드 초기화
    })
    .catch(error => console.error("Error sending message:", error));
  };

  return (
    <div>
      <h2>Write a Message</h2>
      <input
        type="text"
        placeholder="Receiver"
        value={receiver}
        onChange={e => setReceiver(e.target.value)}  // 수신자 입력 필드
      />
      <input
        type="text"
        placeholder="Message"
        value={mContent}
        onChange={e => setmContent(e.target.value)}  // 메시지 내용 입력 필드
      />
      <button onClick={sendMessage}>Send</button>  {/* 메시지 전송 버튼 */}
    </div>
  );
}

export default WriteMessage;

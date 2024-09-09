import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// npm i axios
// npm i react-router-dom

const MessageDetail = () => {
  const { mNum } = useParams(); // URL에서 mNum을 가져옵니다.
  const [message, setMessage] = useState(null); // 메시지 상태

  const navigate = useNavigate();

  // 메시지 가져오기
  useEffect(() => {
    axios.get(`/api/messages/detail/${mNum}`)
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => console.error("Error fetching message:", error));
  }, [mNum]);

  if (!message) {
    return <div>Loading...</div>; // 메시지를 불러오는 동안 로딩 표시
  }

  // 답장 시 memId를 포함한 경로로 이동
  const handleReply = (message) => {
    navigate(`/write?to=${message.memId}`);
  };
  
  // 메시지 삭제 함수
  const deleteMessage = (mNum) => {
    axios.delete(`/api/messages/delete/${mNum}`)
      .then(() => {
        console.log(`Message deleted`);
        navigate('/inbox'); // 삭제 후 쪽지 목록으로 이동
      })
      .catch(error => console.error("Error deleting message:", error));
  };

  return (
    <div>
      <div>
        <h2>쪽지 세부 사항</h2>
        <p><strong>발신자:</strong> {message.memId}</p>
        <p><strong>내용:</strong> {message.mcontent}</p>
        <p><strong>수신자:</strong> {message.friendId}</p>
        <p><strong>보낸 시간:</strong> {new Date(message.createSysdate).toLocaleString()}</p>
      </div>
      
      <div>
        <button onClick={() => navigate('/inbox')}>쪽지목록</button>  {/* navigate('/inbox')를 사용하여 /inbox 경로로 이동하는 버튼 */} 
        <button onClick={() => handleReply(message)}>답장</button> {/* 답장 버튼 */}
        <button onClick={() => {deleteMessage(message.mnum)} }>삭제</button> {/* 삭제 버튼 */}
      </div>
    </div>
    
  );
};

export default MessageDetail;

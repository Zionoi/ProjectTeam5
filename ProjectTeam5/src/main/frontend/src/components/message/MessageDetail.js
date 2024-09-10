import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessageDetail = ({ message, setContent, fetchMessages }) => {
  const [messageDetail, setMessageDetail] = useState(null); // 메시지 상세 상태

  // 메시지 가져오기
  useEffect(() => {
    if (message) {
      axios.get(`/api/messages/detail/${message}`) // message는 mNum임
        .then(response => {
          setMessageDetail(response.data); // 메시지 상세 데이터를 설정
        })
        .catch(error => console.error("Error fetching message:", error));
    }
  }, [message]);

  if (!message) {
    return <div>Error: 메시지가 없습니다.</div>; // message가 없을 때 처리
  }

  if (!messageDetail) {
    return <div>Loading...</div>; // 로딩 중 표시
  }

  // 답장 기능: 답장하기 버튼을 클릭하면 WriteMessage로 이동하고, 수신자를 자동 설정
  const handleReply = () => {
    setContent('writeMessage', messageDetail.memId);  // 쪽지보내기 화면으로 전환하고, 수신자 ID를 넘겨줌
  };

  // 삭제 기능: 쪽지를 삭제하고 쪽지 목록으로 이동
  const handleDelete = () => {
    axios.delete(`/api/messages/delete/${message}`)
      .then(() => {
        alert('쪽지가 삭제되었습니다.');
        fetchMessages();  // 쪽지 목록 새로고침
        setContent('inbox');  // 쪽지 목록으로 돌아가기
      })
      .catch(error => console.error("Error deleting message:", error));
  };

  return (
    <div>
      <div>
        <h2>쪽지 세부 사항</h2>
        <p><strong>발신자:</strong> {messageDetail.memId}</p>
        <p><strong>내용:</strong> {messageDetail.mcontent}</p>
        <p><strong>수신자:</strong> {messageDetail.friendId}</p>
        <p><strong>보낸 시간:</strong> {new Date(messageDetail.createSysdate).toLocaleString()}</p>
      </div>

      <div>
        <button onClick={() => setContent('inbox')}>쪽지목록</button>  {/* 쪽지 목록으로 돌아가기 */}
        <button onClick={handleReply}>답장</button>  {/* 답장 버튼 */}
        <button onClick={handleDelete}>삭제</button>  {/* 삭제 버튼 */}
      </div>
    </div>
  );
};

export default MessageDetail;

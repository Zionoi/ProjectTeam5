import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessageDetail = ({ message, onClose, fetchMessages, setContent }) => {
  const [messageDetail, setMessageDetail] = useState(null); // 메시지 상세 상태
  const [replyMode, setReplyMode] = useState(false); // 답장 모드 상태
  const [replyContent, setReplyContent] = useState(''); // 답장 내용 상태

  // 메시지 가져오기
  useEffect(() => {
    if (message && message.mnum) {
      axios.get(`/api/messages/detail/${message.mnum}`) // mnum을 기반으로 메시지 정보 가져오기
        .then(response => setMessageDetail(response.data))
        .catch(error => console.error("Error fetching message:", error));
    }
  }, [message]);

  if (!messageDetail) {
    return <div>Loading...</div>; // 로딩 중 표시
  }

  const handleReplyMode = () => {
    setReplyMode(true); // 답장 모드 활성화
  };

  const handleReply = () => {
    // 답장 전송 로직
    axios.post('/api/messages/send', {
      memId: messageDetail.friendId, // 답장할 사람의 ID
      friendId: messageDetail.memId, // 발신자의 ID
      mcontent: replyContent,
    })
    .then(() => {
      alert('답장이 전송되었습니다.');
      setReplyContent(''); // 답장 내용 초기화
      setReplyMode(false); // 답장 모드 비활성화
      onClose(); // 모달 닫기
      if (fetchMessages) fetchMessages(); // 메시지 목록 갱신
    })
    .catch(error => console.error('Error sending reply:', error));
  };

  const handleDelete = () => {
    axios.delete(`/api/messages/delete/${message.mnum}`)
      .then(() => {
        alert('쪽지가 삭제되었습니다.');
        if (fetchMessages) fetchMessages(); // 쪽지 목록 새로고침
        setContent('inbox');  // 삭제 후 쪽지함으로 돌아가기
      })
      .catch(error => console.error("Error deleting message:", error));
  };

  return (
    <div>
      <h2>{messageDetail.memId}님에게 온 쪽지!</h2>
      <p>{messageDetail.mcontent}</p>
      <p style={{ textAlign: 'right' }}>{new Date(messageDetail.createSysdate).toLocaleString()}</p>

      <div>
        {!replyMode ? (
          <button onClick={handleReplyMode}>답장하기</button>  
        ) : (
          <div>
            <textarea
              placeholder="답장 내용을 입력하세요..."
              value={replyContent}
              onChange={e => setReplyContent(e.target.value)}
              rows="4"
              style={{ width: '100%' }}
            ></textarea>
            <button onClick={handleReply}>답장 전송</button>  {/* 답장 전송 버튼 */}
          </div>
        )}
        <button onClick={handleDelete}>삭제</button>  {/* 삭제 버튼 */}
        <button onClick={() => setContent('inbox')}>뒤로가기</button>  {/* 쪽지함으로 돌아가는 버튼 */}
      </div>
    </div>
  );
};

export default MessageDetail;

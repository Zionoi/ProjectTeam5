import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Inbox = () => {
  const [messages, setMessages] = useState([]);  // 받은 메시지 상태
  const [newMessages, setNewMessages] = useState(false);  // 새로운 메시지 확인 상태

  const navigate = useNavigate();

  // 메시지 조회 함수
  const fetchMessages = () => {
    axios.get(`/api/messages/received/user01`)
      .then(response => {
        console.log("Received messages:", response.data);  // 응답 데이터 콘솔 출력
        setMessages(response.data);
        if (response.data.length > 0) {
          setNewMessages(true);  // 새 메시지 알림 설정
        }
      })
      .catch(error => console.error("Error fetching messages:", error));
  };

  // 메시지 읽음 처리 함수
  const markAsRead = (mNum) => {
    axios.post(`/api/messages/read/${mNum}`)
      .then(() => {
        console.log(`Message ${mNum} marked as read`);
        fetchMessages();  // 읽음 처리 후 목록 새로고침
      })
      .catch(error => console.error("Error marking message as read:", error));
  };

  // 페이지 로드 시 받은 메시지 불러오기
  useEffect(() => {
    fetchMessages();
  }, []);

  // 쪽지 클릭 시 상세 페이지로 이동
  const viewMessageDetail = (mNum) => {
    navigate(`/message/${mNum}`);
  };

  // 메시지 삭제 함수
  const deleteMessage = (mNum) => {
    axios.delete(`/api/messages/delete/${mNum}`)
      .then(() => {
        console.log(`Message deleted`);
      })
      .catch(error => console.error("Error deleting message:", error));
  };

  // 페이지 맨위로 이동
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 페이지 맨아래로 이동
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };
 
  return (
    <div>
      <h2>쪽지함</h2>

      <div className="btns">
        <button className="moveBottomBtn" onClick={scrollToBottom}>🔽</button>
      </div>

      <div>
        {messages.length === 0 ? (
          <div>쪽지가 없습니다.~(&gt;_&lt;。)＼</div>  // 이미지 넣어주기
        ) : (
          messages.map((message, index) => (
            
            <div key={index}>
              <br /><br /><br />  
              <div key={index} onClick={() => {viewMessageDetail(message.mnum); markAsRead(message.mnum)}} 
                                          style={{ cursor: 'pointer', padding: '10px', border: '1px solid black', marginBottom: '5px' }}>
                {message.memId}님께 온 쪽지가 도착했습니다!&emsp;
                <p><strong>읽음 여부:</strong> {message.isReading === 1 ? "읽지 않음" : "읽음"}</p>
              </div>
              {/* <button onClick={() => handleReply(message)}>답장</button> 답장 버튼 */}
              <button onClick={() => deleteMessage(message.mnum)}>삭제</button> {/* 삭제 버튼 */}
              <br /><br /><br />
            </div>
          ))
        )}
      </div>

      {/* 새로운 메시지 알림 */}
      {newMessages && (
        <div style={{ color: 'red' }}>
          <p>You have new messages!</p>
        </div>
      )}

      <div className="btns">
        <button className="moveTopBtn" onClick={scrollToTop}>🔼</button>
      </div>

    </div>
  );
}

export default Inbox;

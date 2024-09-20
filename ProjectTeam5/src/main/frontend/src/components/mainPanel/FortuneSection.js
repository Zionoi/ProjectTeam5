import React, { useState } from 'react';
import axios from 'axios';
import './FortuneSection.css'; // 스타일 파일을 추가합니다.

function FortuneSection() {
  const [fortune, setFortune] = useState(''); // 운세 상태

  // 운세를 가져오는 함수
  const fetchFortune = () => {
    axios.get('/fortune/today')
      .then(response => {
        setFortune(response.data.fortuneText); // 서버에서 받은 운세 텍스트 설정
      })
      .catch(error => {
        console.error("Error fetching fortune:", error);
        alert("운세를 가져오는 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="fortune-section">
      <h3>오늘의 운세</h3>
      <button className="fortune-btn" onClick={fetchFortune}>운세 확인!</button>
      {fortune && <p className="fortune-result">{fortune}</p>} {/* 운세 출력 */}
    </div>
  );
}

export default FortuneSection;

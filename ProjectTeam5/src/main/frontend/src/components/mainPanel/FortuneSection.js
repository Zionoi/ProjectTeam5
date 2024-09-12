import React from 'react';
import './FortuneSection.css'; // 스타일 파일을 추가합니다.
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');
</style>

function FortuneSection() {
  return (
    <div className="fortune-section">
      <h3>오늘의 운세</h3>
      <ul>
      <button className="view-more">운세 확인!</button>
      </ul>
    </div>
  );
}

export default FortuneSection;

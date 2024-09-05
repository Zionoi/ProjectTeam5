// src/components/VisitSection.js
import React from 'react';
import './VisitSection.css'; // 스타일 파일을 추가합니다.
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');
</style>

function VisitSection() {
  return (
    <div className="visit-section">
      <h3>방명록</h3>
      <ul>
        <li>안녕하세요 잘 부탁드립니다!!!</li>
        <li>쪽지 주셔서 놀러왔어요~</li>
        <li>방가방가</li>
      </ul>
      <button className="view-more">더보기</button>
    </div>
  );
}

export default VisitSection;

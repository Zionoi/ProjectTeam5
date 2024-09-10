// src/components/VisitSection.js
import React from 'react';
import './VisitSection.css'; // 스타일 파일을 추가합니다.

function VisitSection() {
  return (
    <div className="visit-section">
      <h3 className="visit-title">방명록</h3>
      <ul className="visit-box">
        <li>안녕하세요 잘 부탁드립니다!!!</li>
        <li>쪽지 주셔서 놀러왔어요~</li>
        <li>방가방가</li>
      </ul>
      <div className="viewmore-box">
        <button className="view-more">더보기</button>
      </div>
    </div>
  );
}

export default VisitSection;

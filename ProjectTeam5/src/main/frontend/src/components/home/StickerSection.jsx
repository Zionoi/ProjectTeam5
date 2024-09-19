import React, { useState } from 'react';
import './StickerSection.css'; // 스타일 파일을 추가합니다.

function StickerSection() {
  const [clickArr, setClickArr] = useState([]);

  const RecordClick = (e) => {
    const sidePosition = {
      X: Math.floor(e.target.getBoundingClientRect().left + window.pageXOffset),
      Y: Math.floor(e.target.getBoundingClientRect().top + window.pageYOffset),
    };

    const clickPosition = {
      X: Math.floor(e.clientX) + window.pageXOffset,
      Y: Math.floor(e.clientY) + window.pageYOffset,
    };

    const ratio = {
      X: clickPosition.X - sidePosition.X,
      Y: clickPosition.Y - sidePosition.Y,
    };

    const XPer = (ratio.X / 500) * 100; // 그림의 전체 너비 (500px로 고정)
    const YPer = (ratio.Y / 500) * 100; // 그림의 전체 높이 (500px로 고정)

    const xyPer = { XPer: XPer.toFixed(2), YPer: YPer.toFixed(2) };
    setClickArr([...clickArr, xyPer]);
  };

  // RecordClick 함수는 이미지에만 적용되도록 onClick에 직접 연결
  return (
    <div>
      <div className="sticker-section" style={{ position: 'relative' }}>
        {/* 나무 사진 */}
        <img
          src="/tree.webp"
          alt="나무사진"
          width="500px"
          height="500px"
          style={{
            width: '500px',
            height: '500px',
            borderRadius: '16px',
            position: 'relative', // 나무 이미지의 위치를 상대적으로 설정 
            zIndex: 1, // 나무 이미지의 z-index 값을 설정 
          }}
          onClick={RecordClick} // 클릭 이벤트를 이미지에 직접 연결하여 다른 요소와 분리
        />

        {/* 클릭한 위치에 나비 스티커 표시 */}
        {clickArr.map((item, index) => (
          <img
            src="/butterfly1.png"
            key={index}
            style={{
              position: 'absolute', // 스티커는 나무 이미지를 기준으로 절대 위치
              top: `${(item.YPer * 500) / 100 - 15}px`, // top 위치는 클릭 좌표에 따라 동적으로 계산 
              left: `${(item.XPer * 500) / 100 - 15}px`, // left 위치는 클릭 좌표에 따라 동적으로 계산 
              width: '20px', // 나비 스티커의 크기 
              height: '20px', // 나비 스티커의 크기 
              zIndex: 2, // 나비 스티커는 항상 나무 이미지 위에 표시되도록 z-index를 설정 
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default StickerSection;

import React, { useState } from 'react';
import './StickerSection.css';

function StickerSection() {
  // 클릭 위치와 이미지를 저장하는 상태 변수 초기화, 세션 스토리지에 저장된 값 불러옴
  const [clickArr, setClickArr] = useState(() => {
    const savedStickers = sessionStorage.getItem('stickers');
    return savedStickers ? JSON.parse(savedStickers) : [];
  });

  // 현재 선택된 나비 이미지 인덱스 상태 변수
  const [clickIndex, setClickIndex] = useState(0);

  // 나비 이미지 배열
  const butterflyImages = [
    "/butterfly1.gif",
    "/butterfly2.gif",
    "/butterfly3.gif",
    "/butterfly4.gif"
  ];

  // 클릭 시 나비 스티커 위치 계산하고 추가
  const RecordClick = (e) => {
    // 이미지의 왼쪽 상단 좌표 계산 (이미지 기준)
    const sidePosition = {
      X: Math.floor(e.target.getBoundingClientRect().left + window.pageXOffset),
      Y: Math.floor(e.target.getBoundingClientRect().top + window.pageYOffset),
    };

    // 클릭한 지점의 좌표 계산 (브라우저 전체 기준)
    const clickPosition = {
      X: Math.floor(e.clientX) + window.pageXOffset,
      Y: Math.floor(e.clientY) + window.pageYOffset,
    };

    // 클릭 좌표에서 이미지의 좌표를 뺀 상대적 좌표 계산
    const ratio = {
      X: clickPosition.X - sidePosition.X,
      Y: clickPosition.Y - sidePosition.Y,
    };

    // 상대 좌표를 퍼센트로 변환
    const XPer = (ratio.X / 500) * 100;
    const YPer = (ratio.Y / 500) * 100;

    // 나비 이미지와 퍼센트 좌표 객체 생성
    const xyPer = { 
      XPer: XPer.toFixed(2), 
      YPer: YPer.toFixed(2), 
      img: butterflyImages[clickIndex]
    };

    // 클릭된 위치와 이미지를 새로운 배열로 업데이트하고 세션 스토리지에 저장
    const newClickArr = [...clickArr, xyPer];
    setClickArr(newClickArr);
    sessionStorage.setItem('stickers', JSON.stringify(newClickArr));

    // 다음 클릭을 위해 나비 이미지 인덱스 순환
    setClickIndex((clickIndex + 1) % butterflyImages.length);
  };

  // 스티커 초기화 함수, 세션 스토리지와 상태 변수 모두 초기화
  const clearStickers = () => {
    sessionStorage.removeItem('stickers');
    setClickArr([]);
  };

  return (
    <div style={{ position: 'relative', width: '500px', height: '500px' }}>
      <div 
        className="sticker-section" 
        style={{ 
          position: 'relative', 
          width: '500px', 
          height: '500px', 
          overflow: 'hidden',  // 나비가 나무 사진 밖으로 넘어가지 않게 숨김 처리
          borderRadius: '16px'
        }}
      >
        {/* 나무 이미지, 클릭 시 RecordClick 함수 실행 */}
        <img
          src="/tree.webp"
          alt="나무사진"
          width="500px"
          height="500px"
          style={{
            width: '500px',
            height: '500px',
            borderRadius: '16px',
            position: 'relative',
            zIndex: 1,
          }}
          onClick={RecordClick}
        />

        {/* 클릭한 위치에 스티커 이미지 표시 */}
        {clickArr.map((item, index) => (
          <img
            className='sticker'
            src={item.img}
            key={index}
            style={{
              position: 'absolute',
              top: `${(item.YPer * 500) / 100 - 15}px`, // Y 좌표 설정
              left: `${(item.XPer * 500) / 100 - 15}px`, // X 좌표 설정
              width: '20px',
              height: '20px',
              zIndex: 2,
            }}
          />
        ))}
      </div>

      {/* 스티커 삭제 버튼을 나무사진 바깥쪽 오른쪽 아래에 위치 */}
      <button className="stickerDelete"
        onClick={clearStickers} 

      >
        스티커 삭제
      </button>
    </div>
  );
}

export default StickerSection;

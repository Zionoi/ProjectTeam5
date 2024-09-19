import React, { useState } from 'react';
import './StickerSection.css';

function StickerSection() {
  const [clickArr, setClickArr] = useState(() => {
    const savedStickers = sessionStorage.getItem('stickers');
    return savedStickers ? JSON.parse(savedStickers) : [];
  });

  const [clickIndex, setClickIndex] = useState(0); 

  const butterflyImages = [
    "/butterfly1.gif",
    "/butterfly2.gif",
    "/butterfly3.gif",
    "/butterfly4.gif"
  ];

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

    const XPer = (ratio.X / 500) * 100;
    const YPer = (ratio.Y / 500) * 100;

    const xyPer = { 
      XPer: XPer.toFixed(2), 
      YPer: YPer.toFixed(2), 
      img: butterflyImages[clickIndex]
    };

    const newClickArr = [...clickArr, xyPer];
    setClickArr(newClickArr);
    sessionStorage.setItem('stickers', JSON.stringify(newClickArr));

    setClickIndex((clickIndex + 1) % butterflyImages.length);
  };

  const clearStickers = () => {
    sessionStorage.removeItem('stickers');
    setClickArr([]);
  };

  return (
    <div style={{ position: 'relative', width: '500px', height: '500px' }}>
      <div className="sticker-section" style={{ position: 'relative' }}>
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

        {clickArr.map((item, index) => (
          <img
            className='sticker'
            src={item.img}
            key={index}
            style={{
              position: 'absolute',
              top: `${(item.YPer * 500) / 100 - 15}px`,
              left: `${(item.XPer * 500) / 100 - 15}px`,
              width: '20px',
              height: '20px',
              zIndex: 2,
            }}
          />
        ))}

      </div>

      {/* 스티커 삭제 버튼을 나무사진 바깥쪽 오른쪽 아래에 위치 */}
      <button 
        onClick={clearStickers} 
        style={{
          position: 'absolute',
          bottom: '-30px',  // 나무사진 아래쪽으로 위치 조정
          right: '-421px',     // 나무사진 오른쪽에 맞게 위치 조정
          padding: '3px 3px',
          fontSize: '9px',
          borderRadius: '5px',
          backgroundColor: 'skyblue',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          zIndex: 3,

        }}
      >
        스티커 삭제
      </button>
    </div>
  );
}

export default StickerSection;

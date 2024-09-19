// src/components/StickerSection.js
import React, { useState } from 'react';
import './StickerSection.css'; // 스타일 파일을 추가합니다.

function StickerSection() {

  
  const [clickArr, setClickArr] = useState([]);
  const RecordClick = e => {
    // 여기서의 이벤트는 클릭 이벤트 객체 
    // (이벤트 리스너의 콜백함수로 들어갈 함수)
        
      const sidePosition = {
        X: Math.floor(e.target.getBoundingClientRect().left + window.pageXOffset),
        Y: Math.floor(e.target.getBoundingClientRect().top + window.pageYOffset),
      };
      // console.log('x : ', Math.floor(e.target.getBoundingClientRect().left + window.pageXOffset));
      // console.log('y : ', y);
      // 클릭한 엘리먼트의 절대좌표
      // .getBoundingClientRect().left 뷰포트 기준 X값 top은 Y 값 
      // pageOffset은 오프셋으로부터 계산한 스크롤 가로길이
      
          const clickPosition = {
        X: Math.floor(e.clientX) + window.pageXOffset,
        Y: Math.floor(e.clientY) + window.pageYOffset,
      };

      const ratio = {
        X: clickPosition.X - sidePosition.X,
        Y: clickPosition.Y - sidePosition.Y,
      };
      console.log('sidePosition : ', sidePosition);
      console.log('clickPosition : ', clickPosition);
      console.log('ratio : ', ratio);

      const XPer = (ratio.X / Number(500)) * 100; // 그림의 전체 높이
    const YPer = (ratio.Y / Number(500)) * 100;  // 그림의 전체 너비
    const xyPer = { XPer: XPer.toFixed(2), YPer: YPer.toFixed(2) };
    setClickArr([...clickArr, xyPer]);
    console.log('xyPer : ', xyPer);
    console.log('clickArr : ', clickArr);
    
      // 클릭 이벤트의 좌표 어차피 서로 뺄거라 기준만 맞추면 됨
      }

  //스티커
  const RecordRatio = ()=>{
    window.addEventListener("click", e => RecordClick(e), { once: true });
  };
      

  return (
    <div>
          <div className="sticker-section" position={"relative"}>
            <div className="sticker-content"  position={"absolute"} z-index={0}>
              <img src="/tree.webp" alt="나무사진" 
              position={"absolute"}
              z-index={1}
              width={"500" + "px"}
              height={"500" + "px"}
              style={{ width: '500px', height: '500px', borderRadius: '16px'}} 
              onClick={RecordRatio }/>
              {clickArr.map((item, index)=>(
            <img src="/butterfly1.png"
              key={index}
              z-index={index+2}
              position={"absolute"}
              top={String((item.YPer * 500) / 100 - 15) + "px"}
              left={String((item.XPer * 500) / 100 - 15) + "px"}z
              width={"20px"}
              height={"20px"}

              />
          ))}

               {/* 스티커 부착 div 콘텐츠 삽입 */}

            </div>
          </div>
    </div>
  );
}

export default StickerSection;

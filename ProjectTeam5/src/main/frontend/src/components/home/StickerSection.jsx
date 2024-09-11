// src/components/StickerSection.js
import React from 'react';
import './StickerSection.css'; // 스타일 파일을 추가합니다.

function StickerSection() {
  return (
    <div>
          <div className="sticker-section">
            <div className="sticker-content">
              <img src="/tree.webp" alt="나무사진" style={{ width: '500px', height: '500px', borderRadius: '30px'}}/>

               {/* 스티커 부착 div 콘텐츠 삽입 */}

            </div>
          </div>
    </div>
  );
}

export default StickerSection;

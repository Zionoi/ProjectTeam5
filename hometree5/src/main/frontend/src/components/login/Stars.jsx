import React from 'react';
import './Stars.css'; // 별 효과 CSS 파일

// 별을 동적으로 생성하는 함수
const generateStars = (count) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const starStyle = {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 2 + 1.5}s`, // 1.5초에서 3.5초 사이 애니메이션
    };
    stars.push(<div className="star" key={i} style={starStyle}></div>);
  }
  return stars;
};

// 별들을 렌더링하는 컴포넌트
const Stars = () => {
  return <div className="stars-container">{generateStars(100)}</div>; // 별 100개 생성
};

export default Stars;

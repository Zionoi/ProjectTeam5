import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FortuneSection.css'; // 스타일 파일을 추가합니다.
import ForImg from '../../img/fortune.png';
import ForImgA from '../../img/fortuneafter.png';

function FortuneSection() {
  const [fortune, setFortune] = useState(''); // 운세 상태
  const [isClicked, setIsClicked] = useState(false); // 이미지 전환 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태

  const memId = localStorage.getItem('id'); // 사용자 ID를 로컬 스토리지에서 가져옴

  // 페이지가 로드될 때 localStorage에서 이미지 상태와 저장된 시간을 확인
  useEffect(() => {
    const savedState = localStorage.getItem('fortuneImageState');
    const savedTime = localStorage.getItem('fortuneTime');

    if (savedState === 'clicked' && savedTime) {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - parseInt(savedTime);

      // 6시간이 지나지 않았으면 상태 유지, 지났으면 초기화
      // if (timeDifference < sixHours) {
      //   setIsClicked(true);
      // } else {
      //   localStorage.removeItem('fortuneImageState');
      //   localStorage.removeItem('fortuneTime');
      // }
    }
  }, []);

  // 운세 뽑기 요청 함수
  const fetchFortune = () => {
    axios.get(`/fortune/today?memId=${memId}`)
      .then(response => {
        const data = response.data;
        if (data === "오늘은 이미 운세를 뽑았습니다.") {
          alert(data); // 이미 뽑았으면 알림
        } else {
          setFortune(data); // 운세 결과 설정
          setIsClicked(true); // 이미지 전환
          setIsModalOpen(true); // 모달 열기
        }
      })
      .catch(error => {
        console.error("운세를 불러오는 중 오류 발생:", error);
        alert("운세를 가져오는 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="fortune-section">
      <div className='iconFor'>
        {/* 버튼 클릭에 따라 이미지 변경 */}
        <button className="fortune-btn" onClick={fetchFortune}>
          <img src={isClicked ? ForImgA : ForImg} style={{ width: "100px" }} />
        </button>
      </div>

      {/* 모달 부분 */}
      {isModalOpen && (
        <div className="Fmodal-background">
          <div className="Fmodal-content">
            <h4>오늘의 운세</h4>
            <p>{fortune}</p>
            <button className="Fmodal-close" onClick={() => setIsModalOpen(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FortuneSection;

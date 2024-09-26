// src/components/HeaderSection.js
import React, { useState, useEffect } from 'react';
import './HeaderSection.css';
import axios from 'axios';

function HeaderSection({hostId}) {
 // 방문자 수 상태 정의
 const [todayVisit, setTodayVisit] = useState(0);
 const [totalVisit, setTotalVisit] = useState(0);

//  // 날짜 확인 함수
//  const getToday = () => {
//    const today = new Date();
//    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
//  };
 

//  // 방문자 수 증가 함수
//  const incrementtodayVisit = () => {
//    const today = getToday();
//    const storedDate = localStorage.getItem('visitDate');
   
//    // 방문 날짜가 오늘이 아니면 초기화
//    if (storedDate !== today) {
//      localStorage.setItem('visitDate', today);
//      localStorage.setItem('todayVisit', 1);
//      setTodayVisit(1);

//      // totalVisit을 localStorage에서 가져와서 상태 업데이트
//      const tCount = parseInt(localStorage.getItem('totalVisit') || 0, 10) + 1;
//      localStorage.setItem('totalVisit', tCount);
//      setTotalVisit(tCount);

//    } else {
//      // 방문 날짜가 오늘이면 증가
//      const count = parseInt(localStorage.getItem('todayVisit') || 0, 10) + 1;
//      const tCount = parseInt(localStorage.getItem('totalVisit') || 0, 10) + 1;
//      localStorage.setItem('todayVisit', count);
//      localStorage.setItem('totalVisit', tCount);
//      setTodayVisit(count);
//      setTotalVisit(tCount);
//    }
//  };

//  // 페이지가 로드될 때 실행
//  useEffect(() => {
//    const tCount = parseInt(localStorage.getItem('totalVisit') || 0, 10);
//    setTotalVisit(tCount); // totalVisit을 localStorage에서 초기화
//    incrementtodayVisit();
//  }, []);
useEffect(() => {
  axios.get(`/member/get/${hostId}`) // 
      .then(response => {
        setTodayVisit(response.data.todayVisit); // 오류 발생 시 null로 설정
        setTotalVisit(response.data.totalVisit); // 오류 발생 시 null로 설정
      })
      .catch(error => {
          console.error('방문자수를 호출하는데 문제가 발생했습니다', error);
          setTodayVisit(0); // 오류 발생 시 null로 설정
          setTotalVisit(0); // 오류 발생 시 null로 설정
      }); 
}, [hostId, todayVisit]);

 return (
   <div className="header-section">
     <p className="header-visit">TODAY : {todayVisit}</p>
     <h2 className="header-total">TOTAL : {totalVisit}</h2>

    </div>
  );
}

export default HeaderSection;

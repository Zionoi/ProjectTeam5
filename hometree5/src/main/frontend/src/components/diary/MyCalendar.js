import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // 날짜와 이벤트 클릭을 처리하기 위해 필요한 플러그인
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import koLocale from '@fullcalendar/core/locales/ko'; // 한국어 로케일 임포트
import './MyCalendar.css'; // CSS 파일을 임포트합니다.

// 인스톨하기
//npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/interaction


function MyCalendar({hostId}) {
    const [events, setEvents] = useState([]); // 이벤트 데이터를 저장할 상태 변수
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수
    useEffect(() => {
        fetchEvents(); // 컴포넌트가 처음 렌더링될 때 이벤트 데이터를 가져옴
    }, [hostId]);

    // 서버에서 이벤트 데이터를 가져오는 함수
    const fetchEvents = () => {
        axios.get(`/api/events/all/${hostId}`) // 이벤트 API 호출
            .then(response => setEvents(response.data)) // 성공적으로 데이터를 받으면 상태를 업데이트
            .catch(error => console.error('Error fetching events:', error)); // 오류가 발생하면 콘솔에 에러 메시지 출력
    };

    // 날짜를 클릭했을 때 호출되는 핸들러
    const handleDateClick = (arg) => {
        if(hostId === localStorage.getItem('id'))
        navigate(`/inputDiary/${arg.dateStr}/${hostId}`); // 클릭한 날짜를 URL 파라미터로 전달하여 페이지 이동
    };

    // 이벤트를 클릭했을 때 호출되는 핸들러
    const handleEventClick = (arg) => {
        console.log('Clicked event:', arg); // 클릭된 이벤트의 정보를 로그로 출력합니다.
        console.log('Clicked event arg.event.id:', arg.event.id);
        navigate(`/getDiary/${arg.event.id}/${hostId}`); // 클릭된 이벤트의 ID를 URL 파라미터로 전달하여 페이지 이동
    };

    // 이벤트 내용 렌더링
    const eventContent = (eventInfo) => {
        return (
            <div className="event-content">
                <strong  style={{ cursor: 'pointer' }}>{eventInfo.event.title}</strong>
            </div>
        );
    };

    return (
        <div className="calendar-box">
            <div className="calendar-back"> 
                <div className="calendar-container">
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]} // 달력에 필요한 플러그인 설정
                        initialView="dayGridMonth" // 초기에는 월별 뷰로 표시
                        events={events.map(event => ({
                            title: event.dTitle, // 이벤트 제목
                            id: event.dnum, // 이벤트 ID
                            start: event.start, // 이벤트 시작 시간
                            end: event.end // 이벤트 종료 시간
                        }))}
                        dateClick={handleDateClick} // 날짜 클릭 시 핸들러
                        eventClick={handleEventClick} // 이벤트 클릭 시 핸들러
                        eventContent={eventContent} // 이벤트 내용 커스터마이즈
                        locale={koLocale} // 한국어 로케일을 설정
                    />
                </div>

            </div>
        </div>
    );
}

export default MyCalendar;

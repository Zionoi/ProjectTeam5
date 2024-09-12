import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './InputDiary.css';

function InputDiary() {
    const { date } = useParams(); // URL에서 날짜를 가져옴
    const navigate = useNavigate();
    const [dTitle, setDTitle] = useState('');
    const [dContent, setDContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const userId = localStorage.getItem('id');
        const startDate = new Date(date).toISOString(); // 날짜를 ISO 문자열로 변환
        console.log('통신전 dTitle : ', dTitle);
        console.log('통신전 dContent : ', dContent);
        const diaryEntry = {
            dTitle : dTitle,
            dContent : dContent,
            memId : userId, // 로컬 스토리지에서 가져온 사용자 ID
            start : startDate,
            end: startDate // 종료일은 시작일과 동일하게 설정
        };
        console.log('통신전 diaryEntry : ', diaryEntry)
        axios.post('/api/events/add', diaryEntry, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            alert('일기가 등록되었습니다.');
            navigate(`/diary/${localStorage.getItem('id')}`); // 등록 후 다이어리로 리다이렉트
        })
        .catch(error => {
            console.error('Error adding diary entry:', error);
            console.log('통신후 diaryEntry : ', diaryEntry)
            alert('일기 등록에 실패했습니다.');
        });
    };

    return (
        <div className="note">
            <h2 className="inputdiary-title">일기 작성</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    {/* <label htmlFor="title">제목</label> */}
                    <input className="input-title"
                        placeholder="제목을 입력하세요."
                        // type="text"
                        id="title"
                        value={dTitle}
                        onChange={(e) => setDTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-content">
                    {/* <label htmlFor="content">내용</label> */}
                    <textarea className="input-content"
                        placeholder="일기장 내용을 입력하세요."
                        id="content"
                        value={dContent}
                        onChange={(e) => setDContent(e.target.value)}
                        required
                    />
                </div>
                <button>전체공개</button>
                <button type="submit" className="diarysubmit">등록</button>
            </form>
        </div>
    );
}

export default InputDiary;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './GetDiary.css';

function GetDiary() {
    const { dnum, hostId } = useParams(); // URL에서 dNum을 추출
    const navigate = useNavigate();
    const [diary, setDiary] = useState({});
    console.log('dnum 겟다이어리:', dnum);
    
    useEffect(() => {
        if (dnum && hostId) {
            axios.get(`/api/events/getDiary/${dnum}/${hostId}`) // dNum을 URL 파라미터로 사용하여 데이터 요청
                .then(response => {
                    console.log('겟다이어리', diary);
                    console.log('리스폰스다이어리', response);
                    if (response.data) {
                        console.log('response:', response);
                        setDiary(response.data);
                    } else {
                        setDiary(null);
                    }
                })
                .catch(error => {
                    console.error('Error fetching diary:', error);
                    setDiary(null); // 오류 발생 시 null로 설정
                });
        }
    }, [dnum]);

    const handleDelete = () => {
        if (window.confirm('해당 일기를 삭제하시겠습니까?')) {
            axios.delete(`/api/events/delete/${dnum}/${hostId}`)
                .then(() => {
                    alert('일기가 삭제되었습니다.');
                    navigate(`/diary/${hostId}`); // 삭제 후 홈으로 리다이렉트
                })
                .catch(error => {
                    console.error('Error deleting diary:', error);
                });
        }
    };

    if (diary === null) {
        return <div>해당 일기를 찾을 수 없습니다.</div>;
    }

    // `diary.start`가 정의되어 있을 때만 substring을 호출
    const formattedDate = diary.start ? diary.start.substring(0, 10) : '날짜 없음';

    return (
        <div className="diary-box">
            <h2 className='title'>{diary.dTitle}</h2>
            <p className='content'>{diary.dContent}</p>
            <p className='setDay'>{`작성일: ${formattedDate}`}</p>
            {/* <p>{`종료일: ${diary.end}`}</p> */}
            <button onClick={handleDelete} className='deleteButton'>삭제</button>
        </div>
    );
}

export default GetDiary;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function GetDiary() {
    const { dNum } = useParams(); // URL에서 dNum을 추출
    const navigate = useNavigate();
    const [diary, setDiary] = useState(null);
    console.log('dNum 겟다이어리:', dNum);
    
    useEffect(() => {
        if (dNum) {
            axios.get(`/api/events/getDiary/${dNum}`) // dNum을 URL 파라미터로 사용하여 데이터 요청
                .then(response => {
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
    }, [dNum]);

    const handleDelete = () => {
        if (window.confirm('해당 일기를 삭제하시겠습니까?')) {
            axios.delete(`/api/delete/${dNum}`)
                .then(() => {
                    alert('일기가 삭제되었습니다.');
                    navigate('/'); // 삭제 후 홈으로 리다이렉트
                })
                .catch(error => {
                    console.error('Error deleting diary:', error);
                });
        }
    };

    if (diary === null) {
        return <div>해당 일기를 찾을 수 없습니다.</div>;
    }

    return (
        <div>
            <h2>{diary.dTitle}</h2>
            <p>{diary.dContent}</p>
            <p>{`시작일: ${diary.start}`}</p>
            {/* <p>{`종료일: ${diary.end}`}</p> */}
            <button onClick={handleDelete}>삭제</button>
        </div>
    );
}

export default GetDiary;

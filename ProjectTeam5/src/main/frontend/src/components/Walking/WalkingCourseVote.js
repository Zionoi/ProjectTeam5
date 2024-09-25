import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WalkingCourseVote.css';
import { Bar } from 'react-chartjs-2';
// npm install react-chartjs-2 chart.js
// 인스톨 해야함


const WalkingCourseVote = ({ userId, voteId }) => {
    const [walkingCourses, setWalkingCourses] = useState([{name:'산책로1', esntlId:1},{name:'산책로2', esntlId:2},{name:'산책로3', esntlId:3}]);  // 산책로 목록
    const [selectedCourse, setSelectedCourse] = useState(null);  // 선택된 산책로
    const [voteCount, setVoteCount] = useState({});  // 산책로별 투표 수
    const [isVoteEnded, setIsVoteEnded] = useState(false);  // 투표 종료 여부
    const [endTime, setEndTime] = useState(null);  // 투표 종료 시점
    const [hasVoted, setHasVoted] = useState(false);  // 유저가 투표했는지 여부
    const [isCreator, setIsCreator] = useState(false);  // 투표 생성자인지 여부

    // 컴포넌트 마운트 시 또는 voteId, userId 변경 시 투표 정보 및 산책로 목록 가져오기
    useEffect(() => {
        axios.get(`/votes/${voteId}`)
            .then(response => {
                setWalkingCourses(response.data.walkingCourses);  // 산책로 목록 설정
                setEndTime(response.data.endTime);  // 투표 종료 시점 설정
                setIsVoteEnded(response.data.isEnded);  // 투표 종료 여부 설정
                setIsCreator(response.data.creatorId === userId);  // 현재 사용자가 투표 생성자인지 여부 설정
                setVoteCount(response.data.voteCount);  // 각 산책로의 투표 수 설정
                setHasVoted(response.data.votedUsers.includes(userId));  // 사용자가 이미 투표했는지 확인
            })
            .catch(error => console.error(error));
    }, [voteId, userId]);

    // 투표하기 버튼 클릭 시 투표 처리
    const handleVote = (courseId) => {
        if (!hasVoted) {
            axios.post(`/votes/${voteId}/vote`, { courseId, userId })
                .then(response => {
                    setVoteCount(response.data.voteCount);  // 업데이트된 투표 수 설정
                    setHasVoted(true);  // 사용자가 투표했음을 설정
                })
                .catch(error => console.error(error));
        }
    };

    // 투표 종료 버튼 클릭 시 투표 종료 처리
    const handleEndVote = () => {
        axios.post(`/api/vote/${voteId}/end`)
            .then(response => {
                setIsVoteEnded(true);  // 투표 종료 상태로 변경
            })
            .catch(error => console.error(error));
    };

    // 산책로 상세정보 보기
    const handleShowDetails = (course) => {
        setSelectedCourse(course);  // 선택된 산책로 설정
    };

    // 투표 결과 그래프 데이터 생성
    const chartData = {
        labels: walkingCourses.map(course => course.name),  // 산책로 이름을 레이블로 사용
        datasets: [
            {
                label: '투표수',  // 데이터셋 라벨
                data: walkingCourses.map(course => voteCount[course.esntlId] || 0),  // 각 산책로의 투표 수
                backgroundColor: 'rgba(75, 192, 192, 0.6)',  // 그래프 색상
            },
        ],
    };

    return (
        <div className='WalkingCourseVoteBox'>
            <h2>산책로 투표</h2>

            {/* 투표 종료 여부 확인 */}
            {isVoteEnded ? (
                <div>
                    <p>투표가 종료되었습니다.</p>
                    <Bar data={chartData} />  {/* 투표 결과를 막대 그래프로 표시 */}
                </div>
            ) : (
                <div>
                    {/* 산책로 목록과 상세정보 표시 */}
                    <ul>
                        {walkingCourses.map(course => (
                            <li key={course.esntlId} onClick={() => handleShowDetails(course)}>
                                {course.name}
                            </li>
                        ))}
                    </ul>

                    {selectedCourse && (
                        <div>
                            <h3>{selectedCourse.name}</h3>
                            <p>{selectedCourse.description}</p>
                            <button onClick={() => handleVote(selectedCourse.esntlId)}>
                                투표하기
                            </button>
                        </div>
                    )}

                    {/* 투표 종료 버튼 (생성자만 보임) */}
                    {isCreator && (
                        <button onClick={handleEndVote}>
                            투표 종료
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default WalkingCourseVote;

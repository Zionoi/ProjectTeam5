import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WalkingCourseVote.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WalkingCourseVote = () => {
    const { voteId } = useParams();
    const [walkingCourses, setWalkingCourses] = useState([]); 
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [voteCount, setVoteCount] = useState({});
    const [isVoteEnded, setIsVoteEnded] = useState(false); 
    const [endTime, setEndTime] = useState(null); 
    const [participantIds, setParticipantIds] = useState([]);
    const [votedUsers, setVotedUsers] = useState([]); 
    const [isCreator, setIsCreator] = useState(false); 
    const [userId, setUserId] = useState(localStorage.getItem('id'));
    const [selectedCourseId, setSelectedCourseId] = useState(null); // 내가 투표한 산책로 ID
    const [voteTitle, setVoteTitle] = useState(''); // 투표 제목 상태 추가
    useEffect(() => {
        axios.get(`/votes/${voteId}`)
            .then(response => {
                const data = response.data;
                const courseIds = data.voteEsntlId || [];
                setWalkingCourses(courseIds.map(id => ({ esntlId: id }))); 
    
                setEndTime(data.endTime);
                setIsVoteEnded(data.ended);
                setIsCreator(data.memId === userId); 
                setVoteCount(data.walkingCourseVoteCounts || {}); 
                setVotedUsers(data.votedUserIds || []);
    
                const uniqueParticipantIds = [...new Set(data.participantIds || [])]; 
                setParticipantIds(uniqueParticipantIds); 
    
                fetchWalkingCourseDetails(courseIds);

                // 유저가 이미 투표한 산책로 ID를 확인
                const userVoteCourseId = data.userSelectedCourseIds[userId];
                if (userVoteCourseId) {
                    setSelectedCourseId(userVoteCourseId);
                }
            })
            .catch(error => console.error(error));
    }, [voteId, userId]);

    const fetchWalkingCourseDetails = (courseIds) => {
        const fetchPromises = courseIds.map(id => 
            axios.get(`/api/walking/courses/${id}`)
                .then(response => response.data)
                .catch(error => {
                    console.error(`Error fetching course details for ${id}: `, error);
                    return null;
                })
        );

        Promise.all(fetchPromises)
            .then(results => {
                const validCourses = results.filter(course => course !== null);
                setWalkingCourses(validCourses);
            })
            .catch(error => console.error('Error fetching all course details: ', error));
    };

    const handleVote = (courseId) => {
        if (votedUsers.includes(userId)) { 
            alert('이미 투표하셨습니다.');
            return;
        }
    
        axios.post(`/votes/${voteId}/vote`, { voteId, userId, courseId })
            .then(response => {
                const updatedVoteCount = response.data;
                if (updatedVoteCount) {
                    setVoteCount(prevVoteCount => ({ ...prevVoteCount, ...updatedVoteCount }));
                    setVotedUsers(prevVotedUsers => [...prevVotedUsers, userId]);
                    setSelectedCourseId(courseId); // 내가 투표한 산책로 ID 업데이트
                }
            })
            .catch(error => {
                console.error('투표 처리 중 오류 발생:', error);
                alert('투표 처리 중 오류가 발생했습니다.');
            });
    };

    const handleEndVote = () => {
        axios.post(`/votes/${voteId}/end`)
            .then(() => {
                setIsVoteEnded(true);  // 투표 종료 상태로 변경
                alert('투표가 종료되었습니다.');
            })
            .catch(error => {
                console.error('투표 종료 처리 중 오류 발생:', error);
                alert('투표 종료 처리 중 오류가 발생했습니다.');
            });
    };

    const handleShowDetails = (course) => {
        setSelectedCourse(course);
    };

    const chartData = {
        labels: walkingCourses.map(course => course.walkCourseName),
        datasets: [
            {
                label: '투표수',
                data: walkingCourses.map(course => voteCount[course.esntlId] || 0),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <div className='WalkingCourseVoteBox'>
            <h2>{voteId} 투표</h2>
            <div className="selected-course-id">
            </div>
            {isVoteEnded ? (
                <div>
                    <p className="vote-ended-message">투표가 종료되었습니다.</p>
                    {chartData.labels.length > 0 ? (
                        <div className="bar-chart-container">
                            <Bar data={chartData} />  
                        </div>
                    ) : (
                        <p className="vote-ended-message">투표 데이터가 없습니다.</p>
                    )}
                </div>
            ) : (
                <div>
                    {isCreator && (
                        <button
                            className="vote-button"
                            onClick={handleEndVote} 
                            disabled={isVoteEnded}
                        >
                            투표 종료
                        </button>
                    )}
                    {`투표 진행 현황 ${votedUsers.length}/${participantIds.length + 1}`}
                    <div className="course-list">
                        {walkingCourses.map(course => (
                            <div 
                                key={course.esntlId} 
                                className={`course-item ${course.esntlId === selectedCourseId ? 'voted-course' : ''}`} 
                                onClick={() => handleShowDetails(course)}
                            >
                                <span className="course-name">{course.walkCourseName}</span>
                            </div>
                        ))}
                    </div>

                    {selectedCourse && (
                        <div className="selected-course">
                            <h3>{selectedCourse.walkCourseName}</h3>
                            <p>경로 설명: {selectedCourse.courseDescription}</p>
                            <p>위치 : {selectedCourse.signguName} / 소요시간 : {selectedCourse.courseTimeContent}</p>
                            <button
                                className={votedUsers.includes(userId) ? "vote-fbutton" :"vote-button"}
                                onClick={() => handleVote(selectedCourse.esntlId)}
                                disabled={votedUsers.includes(userId)}
                            >
                                {votedUsers.includes(userId) ? '' : '투표하기'}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default WalkingCourseVote;

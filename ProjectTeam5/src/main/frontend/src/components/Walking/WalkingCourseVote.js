import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WalkingCourseVote.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import ChartDataLabels from 'chartjs-plugin-datalabels';  // 플러그인 임포트
//npm install chartjs-plugin-datalabels --save 설치

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,ChartDataLabels);

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
    
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
    const [modalTitle, setModalTitle] = useState(''); // 모달 제목 상태
    const [modalUsers, setModalUsers] = useState([]); // 모달에 표시할 유저 목록 상태
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
                setVoteTitle(data.voteTitle);  
    
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

    const handleBarClick = (event) => {
        const chart = event.chart; 
        const activePoints = chart.getElementsAtEventForMode(event.native, 'nearest', { intersect: true }, false);

        if (activePoints.length > 0) {
            const { index } = activePoints[0]; // 클릭된 막대의 인덱스
            const course = walkingCourses[index]; // 클릭된 막대에 해당하는 코스
            
            // 해당 코스에 투표한 유저 목록을 설정
            const usersWhoVoted = votedUsers.filter(user => user === course.esntlId); // userId와 courseId를 비교
            
            setModalTitle(`${course.walkCourseName}에 투표한 유저들`);
            setModalUsers(usersWhoVoted);
            setIsModalOpen(true); // 모달 열기
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };

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
                fill: false, // line 형태일 때, 선 안쪽을 채우는지 여부
                backgroundColor: '#c5c9ff', // dataset 배경색
                borderColor: 'white', // dataset 테두리 색상
                borderWidth: 2, // dataset 테두리 두께
                maxBarThickness: 30, // 최대 bar의 두께 설정
                borderRadius: 16, // 모서리를 둥글게 설정 (0~50 픽셀)
            },
        ],
    };

    return (
        <div className='WalkingCourseVoteBox'>
            <h2>{voteTitle} 투표</h2>
            <div className="selected-course-id">
            </div>
            {isVoteEnded ? (
                <div>
                    <p className="vote-ended-message">투표가 종료되었습니다.</p>
                    {chartData.labels.length > 0 ? (
                        <div className="bar-chart-container">
                <Bar
                    data={chartData}
                    options={{
                        indexAxis: 'y', // 수평 막대 그래프 설정
                        onClick: handleBarClick, // 클릭 이벤트 핸들러 추가
                        scales: {
                            x: {
                                grid: {
                                    display: false,
                                },
                                title: {
                                    display: true,
                                },
                                min: 0,
                                ticks: {
                                    stepSize: 1,
                                    display: false,
                                },
                            },
                            y: {
                                grid: {
                                    display: false,
                                },
                                title: {
                                    display: true,
                                },
                            },
                        },
                        plugins: {
                            datalabels: {
                                align: 'end', // 레이블이 막대 옆에 위치
                                anchor: 'end', // 막대 끝에 맞춤
                                color:  (context) => {
                                    const value = context.dataset.data[context.dataIndex];
                                    return value === 0 ? '#7a63ff' : 'white'; 
                                },
                                
                                formatter: (value) => `${value}표`,
                                offset: (context) => {
                                    const value = context.dataset.data[context.dataIndex];
                                    return value === 0 ? 10 : -40; // 0표인 경우 offset을 양수(10)로 설정, 그 외는 음수(-40)
                                },
                        
                                clip: false, // 레이블이 잘리지 않도록 설정
                            },
                        },
                        datasets: {
                                    label: 'Dataset', // 축의 제목
                        },
                    }}
                />
                                {/* 모달 UI 추가 */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={handleCloseModal}>X</button>
                        <h2>{modalTitle}</h2>
                        <ul>
                            {modalUsers.map(user => (
                                <li key={user}>{user}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
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

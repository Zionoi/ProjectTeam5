import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VoteCreate.css';

function VoteCreate() {
    const [isOpenToAllFriends, setIsOpenToAllFriends] = useState(true);  // 전체 친구 참여 여부
    const [isAnonymous, setIsAnonymous] = useState(false);  // 익명 투표 여부
    const [endTime, setEndTime] = useState('');
    const [creatorId, setCreatorId] = useState('');  // 서버에서 가져오는 동적 값
    const [voteTitle, setVoteTitle] = useState(''); // 투표 제목 상태 추가
    const [selectedWalkingCourses, setSelectedWalkingCourses] = useState([]); // 선택된 산책로 목록
    const [selectedRegion, setSelectedRegion] = useState(''); // 선택된 지역
    const [subRegions, setSubRegions] = useState([]); // 소속 지역 목록
    const [filteredSubRegions, setFilteredSubRegions] = useState([]); // 필터링된 소속 지역 목록
    const [walkingCourses, setWalkingCourses] = useState([]); // 산책로 후보 목록
    const [regions] = useState([ // 지역 목록
        '강원', '경기', '경남', '경북', '광주', '대구', '대전', '부산', '서울', '세종',
        '울산', '인천', '전남', '전북', '제주', '충남', '충북'
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false); // 산책로 모달 창 상태

    const [isFriendModalOpen, setIsFriendModalOpen] = useState(false); // 친구 선택 모달 창 상태
    const [friends, setFriends] = useState([]); // 친구 목록
    const [selectedFriends, setSelectedFriends] = useState([]); // 선택된 친구 목록
    const [friendSearchResults, setFriendSearchResults] = useState([]); // 친구 검색 목록
    const [participantIds, setParticipantIds] = useState([]);  // 선택된 친구들의 ID 목록
    const [message, setMessage] = useState('');

    const navigate = useNavigate(); 

    // 소속 지역 변경 처리 함수
    const handleRegionChange = (e) => {
        const region = e.target.value;
        setSelectedRegion(region);

        if (region) {
            axios.get(`/api/walking/subregions/${region}`)
                .then(response => {
                    setSubRegions(response.data);
                    setFilteredSubRegions(response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            setSubRegions([]);
            setFilteredSubRegions([]);
        }
    };

    // 소속 지역 변경 시 산책로 목록 가져오기
    const handleSubRegionChange = (e) => {
        const subRegion = e.target.value;
        fetchWalkingCourse(subRegion);
    };

    const fetchWalkingCourse = (subRegion) => {
        axios.get('/api/walking/courses', {
            params: { subRegion: subRegion }
        })
            .then(response => {
                setWalkingCourses(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    // 산책로 후보 추가
    const handleAddCourse = (course) => {
        if (!selectedWalkingCourses.some(c => c.esntlId === course.esntlId)) {
            setSelectedWalkingCourses([...selectedWalkingCourses, course]);
        }
    };

    // 산책로 후보 삭제
    const handleRemoveCourse = (courseId) => {
        setSelectedWalkingCourses(prevCourses => prevCourses.filter(c => c.esntlId !== courseId));
    };

    // 친구 목록 불러오기
    useEffect(() => {
        axios.get('/friends/total', {
            params: { memId: localStorage.getItem('id') }, // 실제 로그인된 사용자 ID
        })
        .then(response => {
            setFriends(response.data); // 친구 목록 설정
            setFriendSearchResults(response.data); // 기본적으로 친구 목록 전체를 검색 결과로 표시
        })
        .catch(error => {
            console.error('친구 목록 불러오기 오류:', error);
        });
    }, []);

    // 전체 친구 참여 여부 변경 시 처리
    useEffect(() => {
        if (isOpenToAllFriends && friends.length > 0) {
            // 전체 친구 참여를 선택한 경우, 모든 친구의 ID를 추가
            const allFriendIds = friends.map(friend => friend.friendId);
            setParticipantIds(allFriendIds);
        } else if (!isOpenToAllFriends) {
            // 선택된 친구 참여로 변경할 경우, 선택된 친구 목록을 유지
            setParticipantIds(selectedFriends.map(friend => friend.friendId));
        }
    }, [isOpenToAllFriends, friends, selectedFriends]);

    // 친구 선택 시 선택된 친구 목록에 추가하는 함수
    const handleAddFriend = (friend) => {
        setSelectedFriends((prevSelectedFriends) => {
            // 친구가 이미 목록에 있는지 확인
            const alreadyAdded = prevSelectedFriends.some((f) => f.friendId === friend.friendId);
            
            if (!alreadyAdded) {
                // 친구가 목록에 없으면 추가
                const updatedFriends = [...prevSelectedFriends, friend];
                
                // participantIds도 함께 업데이트
                setParticipantIds((prevParticipantIds) => {
                    const updatedParticipantIds = [...new Set([...prevParticipantIds, friend.friendId])];
                    return updatedParticipantIds;
                });
                
                return updatedFriends;
            }
    
            return prevSelectedFriends; // 이미 추가된 친구면 상태 유지
        });
    };
    
    
    // 친구 삭제
    const handleRemoveFriend = (friendId) => {
        setSelectedFriends(prevFriends => prevFriends.filter(f => f.friendId !== friendId));
        setParticipantIds(prevIds => prevIds.filter(friendId => friendId !== friendId));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // 새로운 투표 객체 생성
        console.log(localStorage.getItem('id'))
        const newVote = {
            memId: localStorage.getItem('id'), // 투표 생성자 아이디
            voteTitle: voteTitle,  // 투표 제목
            isOpenToAllFriends: isOpenToAllFriends,  // 전체 친구 참여 여부
            isAnonymous: isAnonymous,  // 익명 투표 여부
            endTime: endTime ? endTime : `${endTime}` ,  // 종료 시간을 LocalDateTime 형식으로 변환
            creatorId: creatorId,  // 생성자 ID
            voteEsntlId: selectedWalkingCourses.map(course => course.esntlId),  // 산책로 ID 리스트
            participantIds: isOpenToAllFriends ? friends.map(friend => friend.friendId) : participantIds,  // 선택된 친구들의 ID. 전체 친구일 경우 모든 친구의 ID 추가  
            isEnded: false
        };
    
        // 요청 데이터 콘솔에 출력 (로그를 확인해 서버와 데이터 구조를 비교)
        console.log("투표 데이터 전송 중:", JSON.stringify(newVote));
    
        // 서버로 POST 요청
        axios.post('/votes/create', newVote, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            alert('투표가 성공적으로 생성되었습니다.');
            navigate(`/VoteList/${localStorage.getItem('id')}`);
        })
        .catch(error => {
            console.error('투표 생성 중 오류 발생:', error.response.data);  // 오류 응답 데이터를 확인
        });
    };
   
    return (
        <div className='voteBox'>
            <form onSubmit={handleSubmit}>
                <h2>투표 생성</h2>

                {/* 투표 제목 입력 */}
                <div className='voteBox-div'>
                    <label>투표 제목:</label>
                    <input
                        type="text"
                        value={voteTitle}
                        onChange={(e) => setVoteTitle(e.target.value)}
                        placeholder="투표 제목을 입력하세요"
                    />
                </div>

                {/* 산책로 선택 */}
                <div className='voteBox-div'>
                    <label>산책로 후보 </label>
                    {/* 선택된 산책로 목록 */}
                    {/* 산책로 후보 추가 버튼 */}
                    <button className="walkLbtn" type="button" onClick={() => setIsModalOpen(true)}>
                        추가
                    </button>
                    <ul>
                        {selectedWalkingCourses.map(course => (
                            <li key={course.esntlId} className="list-item">
                                <span>{course.walkCourseName}</span>
                                <button onClick={() => handleRemoveCourse(course.esntlId)} className="remove-btn"></button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 투표 종료 시간 */}
                <div className='voteBox-div'>
                    <label>투표 종료 시간 (선택):</label>
                    <input
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                </div>

                {/* 전체 친구 참여 여부 */}
                <div className="voteBox-div voteBox-friend-selection">
                    <table>
                        <tr>
                            <td>전체 친구 참여
                                <input
                                type="radio"
                                checked={isOpenToAllFriends}
                                onChange={() => setIsOpenToAllFriends(true)}
                                />
                            </td>
                            <td> 선택 친구 참여
                            
                                <input
                                type="radio"
                                checked={!isOpenToAllFriends}
                                onChange={() => setIsOpenToAllFriends(false)}
                                />
                            </td>
                        </tr>
                    </table>
                </div>

                <div className='voteBox-div'>
                    {/* 친구 선택하기 버튼 */}
                    {!isOpenToAllFriends && (
                        <div>
                            <label>선택된 친구 목록</label>
                            <button type="button" className="walkLbtn" onClick={() => setIsFriendModalOpen(true)}>
                               친구추가
                            </button>
                            <ul>
                                {selectedFriends.map(friend => (
                                    <li key={friend.id} className="list-item">
                                        <span>{friend.friendId}</span>
                                        <button onClick={() => handleRemoveFriend(friend.friendId)} className="remove-btn"></button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* 익명 투표 여부 */}
                <div className="voteBox-div voteBox-anonymous">
                    <label>익명 투표 여부:</label>
                    <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                    />
                </div>

                {/* 투표 생성 버튼 */}
                <button type="submit">투표 생성하기</button>
            </form>

            {/* 산책로 후보 추가 모달 */}
            {isModalOpen && (
                <div className="vote-modal">
                    <div className="vote-modal-content">
                        <h3>산책로 검색</h3>
                        <div>
                            <label htmlFor="region-select">지역 선택:</label>
                            <select
                                id="region-select"
                                value={selectedRegion}
                                onChange={handleRegionChange}
                            >
                                <option value="">-- 지역 선택 --</option>
                                {regions.map(region => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                        </div>
                        {selectedRegion && (
                            <div>
                                <label htmlFor="subregion-select">소속 지역 선택:</label>
                                <select
                                    id="subregion-select"
                                    onChange={handleSubRegionChange}
                                >
                                    <option value="">-- 소속 지역 선택 --</option>
                                    {filteredSubRegions.map(subRegion => (
                                        <option key={subRegion} value={subRegion}>{subRegion.slice(3)}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div>
                            <h2>산책로 목록</h2>
                            <ul>
                                {walkingCourses.length > 0 ? (
                                    walkingCourses.map((course, index) => (
                                        <li key={index}>
                                            {course.walkCourseName}
                                            <button onClick={() => handleAddCourse(course)}>추가</button>
                                        </li>
                                    ))
                                ) : (
                                    <li>검색된 산책로가 없습니다.</li>
                                )}
                            </ul>
                        </div>
                        <button onClick={() => setIsModalOpen(false)}>닫기</button>
                    </div>
                </div>
            )}

            {/* 친구 선택 모달 */}
            {isFriendModalOpen && (
                <div className="vote-modal">
                    <div className="vote-modal-content">
                        <h3>친구 검색 및 선택</h3>
                        
                        <div className="friend-list">
                            <h4>친구 목록</h4>
                            <ul>
                                {friendSearchResults.map(friend => (
                                    <li key={friend.friendId}>
                                        {friend.friendId}
                                        <button onClick={() => handleAddFriend(friend)}>추가</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button onClick={() => setIsFriendModalOpen(false)}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VoteCreate;

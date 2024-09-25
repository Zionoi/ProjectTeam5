import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VoteCreate.css';

function VoteCreate() {
    const [isOpenToAllFriends, setIsOpenToAllFriends] = useState(true);  // 전체 친구 참여 여부 (초기값을 전체 참여로 설정)
    const [isAnonymous, setIsAnonymous] = useState(false);  // 익명 투표 여부
    const [endTime, setEndTime] = useState('2024-09-25');
    const [creatorId, setCreatorId] = useState('user01');
    const [voteTitle, setVoteTitle] = useState('투표 제목'); // 투표 제목 상태 추가
    const [selectedWalkingCourses, setSelectedWalkingCourses] = useState(['산책로']); // 선택된 산책로 목록
    const [walkingCourses, setWalkingCourses] = useState([]); // 산책로 후보 목록
    const [isModalOpen, setIsModalOpen] = useState(false); // 산책로 모달 창 상태
    const [searchKeyword, setSearchKeyword] = useState(''); // 검색 키워드
    const [searchResults, setSearchResults] = useState([]); // 산책로 검색 결과 목록

    const [isFriendModalOpen, setIsFriendModalOpen] = useState(false); // 친구 선택 모달 창 상태
    const [friends, setFriends] = useState([]); // 친구 목록
    const [selectedFriends, setSelectedFriends] = useState([]); // 선택된 친구 목록
    const [friendSearchKeyword, setFriendSearchKeyword] = useState(''); // 친구 검색 키워드
    const [friendSearchResults, setFriendSearchResults] = useState([]); // 친구 검색 결과 목록

    // 산책로 목록 불러오기
    useEffect(() => {
        axios.get('/api/walking/courses') // API 엔드포인트에 맞게 수정
            .then(response => {
                setWalkingCourses(response.data);
            })
            .catch(error => {
                console.error('산책로 목록 불러오기 오류:', error);
            });
    }, []);

    // 친구 목록 불러오기
    useEffect(() => {
        axios.get('/api/friends') // API 엔드포인트에 맞게 수정
            .then(response => {
                setFriends(response.data);
            })
            .catch(error => {
                console.error('친구 목록 불러오기 오류:', error);
            });
    }, []);

    // 산책로 검색 기능
    const handleSearch = () => {
        axios.get(`/api/walking/search?keyword=${searchKeyword}`)
            .then(response => {
                setSearchResults(response.data); // 검색 결과 설정
            })
            .catch(error => {
                console.error('산책로 검색 오류:', error);
            });
    };

    // 친구 검색 기능
    const handleFriendSearch = () => {
        const filteredFriends = friends.filter(friend =>
            friend.name.toLowerCase().includes(friendSearchKeyword.toLowerCase())
        );
        setFriendSearchResults(filteredFriends); // 검색 결과 설정
    };

    // 산책로 후보 추가
    const handleAddCourse = (course) => {
        if (!selectedWalkingCourses.includes(course.esntlId)) {
            setSelectedWalkingCourses([...selectedWalkingCourses, course.esntlId]);
        }
        setIsModalOpen(false); // 모달 닫기
    };

    // 친구 추가
    const handleAddFriend = (friend) => {
        if (!selectedFriends.includes(friend.id)) {
            setSelectedFriends([...selectedFriends, friend.id]);
        }
        setIsFriendModalOpen(false); // 친구 모달 닫기
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // 참여자와 산책로 ID를 숫자로 변환
        const participantIds = isOpenToAllFriends ? [] : selectedFriends.map(friend => parseInt(friend, 10));
        const walkingCourseIds = selectedWalkingCourses.map(course => parseInt(course, 10));
    
        // 새로운 투표 객체 생성
        const newVote = {
            voteTitle: voteTitle || "제목",  // 투표 제목
            isOpenToAllFriends: isOpenToAllFriends,  // 전체 친구 참여 여부
            isAnonymous: isAnonymous,  // 익명 투표 여부
            endTime: endTime || "2024-09-25",  // 종료 시간 (ISO 형식)
            creatorId: creatorId || "user01",  // 생성자 ID
            participantIds: participantIds.length ? participantIds : [1],  // 빈 배열 대신 기본값 1로 설정
            walkingCourseIds: walkingCourseIds.length ? walkingCourseIds : [1],  // 빈 배열 대신 기본값 1로 설정
            isEnded: false
        };

        // 요청 데이터 콘솔에 출력 (로그를 확인해 서버와 데이터 구조를 비교)
        console.log("Sending vote data:", JSON.stringify(newVote));
    
        // 서버로 POST 요청
        axios.post('/votes/create', newVote, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            alert('투표가 성공적으로 생성되었습니다.');
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

                <div>
                    <label>투표 제목:</label>
                    <input
                        type="text"
                        value={voteTitle}
                        onChange={(e) => setVoteTitle(e.target.value)}
                        placeholder="투표 제목을 입력하세요"
                    />
                </div>

                {/* 산책로 선택 */}
                <div>
                    <h3>산책로 후보 선택</h3>
                    {/* 산책로 후보 추가 버튼 */}
                    <button type="button" onClick={() => setIsModalOpen(true)}>
                        산책로 후보 추가
                    </button>
                </div>

                {/* 투표 종료 시간 */}
                <div>
                    <label>투표 종료 시간 (선택):</label>
                    <input
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                </div>

                <div className='checklist'>
                    {/* 전체 친구 참여 여부 */}
                    <div>
                        <label>
                            <input
                                type="radio"
                                checked={isOpenToAllFriends}
                                onChange={() => setIsOpenToAllFriends(true)}
                            />
                            전체 친구 참여
                        </label>
                        <label>
                            <input
                                type="radio"
                                checked={!isOpenToAllFriends}
                                onChange={() => setIsOpenToAllFriends(false)}
                            />
                            선택 친구 참여
                        </label>
                        {/* 친구 선택하기 버튼 */}
                        {!isOpenToAllFriends && (
                            <div>
                                <button type="button" onClick={() => setIsFriendModalOpen(true)}>
                                    참여할 친구 선택하기
                                </button>
                            </div>
                        )}
                    </div>

                    {/* 익명 투표 여부 */}
                    <div>
                        <label>익명 투표 여부:</label>
                        <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                        />
                    </div>
                </div>

                {/* 투표 생성 버튼 */}
                <button type="submit">투표 생성하기</button>
            </form>

            {/* 산책로 후보 추가 모달 */}
            {isModalOpen && (
                <div className="vote-modal">
                    <div className="vote-modal-content">
                        <h3>산책로 검색</h3>
                        <input
                            type="text"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            placeholder="산책로 이름 검색"
                        />
                        <button onClick={handleSearch}>검색</button>
                        <ul>
                            {searchResults.length > 0 ? (
                                searchResults.map(course => (
                                    <li key={course.esntlId}>
                                        {course.walkCourseName}
                                        <button onClick={() => handleAddCourse(course)}>추가</button>
                                    </li>
                                ))
                            ) : (
                                <li>검색 결과가 없습니다.</li>
                            )}
                        </ul>
                        <button onClick={() => setIsModalOpen(false)}>닫기</button>
                    </div>
                </div>
            )}

            {/* 친구 선택 모달 */}
            {isFriendModalOpen && (
                <div className="vote-modal">
                    <div className="vote-modal-content">
                        <h3>친구 검색</h3>
                        <input
                            type="text"
                            value={friendSearchKeyword}
                            onChange={(e) => setFriendSearchKeyword(e.target.value)}
                            placeholder="친구 이름 검색"
                        />
                        <button onClick={handleFriendSearch}>검색</button>
                        <ul>
                            {friendSearchResults.length > 0 ? (
                                friendSearchResults.map(friend => (
                                    <li key={friend.id}>
                                        {friend.name}
                                        <button onClick={() => handleAddFriend(friend)}>추가</button>
                                    </li>
                                ))
                            ) : (
                                <li>검색 결과가 없습니다.</li>
                            )}
                        </ul>
                        <button onClick={() => setIsFriendModalOpen(false)}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VoteCreate;

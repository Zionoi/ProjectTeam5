import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VoteList.css'; // 기존 스타일을 재사용
import { useNavigate } from 'react-router-dom';

function ClosedVotes({ hostId, setHostId }) {
    const [votes, setVotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('myVotes'); // 'myVotes' or 'invitedVotes'
    const [userId, setUserId] = useState(localStorage.getItem('id'));
    const navigate = useNavigate();

    useEffect(() => {
        fetchClosedVotes(); // 필터 타입이 바뀔 때마다 투표 목록을 새로 가져옴
    }, [filterType]);

    // 종료된 투표 목록을 가져오는 함수
    const fetchClosedVotes = () => {
        let apiEndpoint = '';

        if (filterType === 'myVotes') {
            apiEndpoint = `/votes/closedList/myVotes/${userId}`;  // 종료된 나의 투표 목록 API
        } else if (filterType === 'invitedVotes') {
            apiEndpoint = `/votes/closedList/invitedVotes/${userId}`;  // 종료된 초대받은 투표 목록 API
        }

        setLoading(true);
        axios.get(apiEndpoint)
            .then(response => {
                setVotes(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('종료된 투표 목록을 불러오는 중 오류 발생:', error);
                setLoading(false);
            });
    };

    // 투표 클릭 핸들러 (투표 상세 페이지 이동)
    const handleVoteClick = (voteId) => {
        navigate(`/vote/${voteId}`);
    };

    // 투표 리스트로 돌아가는 버튼 핸들러
    const handleBackToVoteList = () => {
        navigate(`/VoteList/${userId}`);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="vote-list-container">
            {/* 투표 목록 제목 및 필터링 라디오 버튼 */}
            <div className="vote-title-box">
                <h2 className="vote-title">종료된 투표 목록</h2>
                <div className="filter-radio-buttons">
                    <label>
                        <input
                            type="radio"
                            value="myVotes"
                            checked={filterType === 'myVotes'}
                            onChange={() => setFilterType('myVotes')}
                        />
                        나의 투표
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="invitedVotes"
                            checked={filterType === 'invitedVotes'}
                            onChange={() => setFilterType('invitedVotes')}
                        />
                        초대받은 투표
                    </label>
                </div>
            </div>
            {/* 투표 항목 리스트 */}
            {votes.length > 0 ? (
                <ul className="vote-list">
                    {votes.map((vote) => (
                        <li key={vote.id} className="vote-item">
                            <span className="vote-title-item">{vote.voteTitle}</span>
                            <button className="vote-button" onClick={() => handleVoteClick(vote.id)}>결과 보기</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-vote-message">종료된 투표가 없습니다.</p>
            )}
            {/* 투표 리스트로 돌아가는 버튼 */}
            <button className="back-to-vote-list-button" onClick={handleBackToVoteList}>
                투표 리스트로 돌아가기
            </button>
        </div>
    );
}

export default ClosedVotes;

import React, { useEffect, useState } from 'react';
import './GuestbookPage.css';
import axios from 'axios';

function GuestbookPage({hostId, setHostId}) {
  // 방명록 데이터 상태 관리
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const [page, setPage] = useState(0);  // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(0);  // 총 페이지 수
  const memId = localStorage.getItem('id'); // 로그인된 유저의 ID 가져오기

  // 방명록 리스트 불러오기
  useEffect(() => {
    axios
      .get('/guestbook/total', { params: { page, size: 5, memId : hostId } })  // page와 size 파라미터 추가
      .then((response) => {
        console.log("Fetched guestbook entries:", response.data);
        setGuestbookEntries(response.data.content);  // Page 객체의 content 부분에 실제 데이터가 있음
        setTotalPages(response.data.totalPages);  // 총 페이지 수 설정
      })
      .catch((error) => {
        console.error("Error fetching guestbook entries:", error);
        setErrorMessage('방명록을 불러오는 중 오류가 발생했습니다.');
      });
  }, [page]);  // 페이지 번호 변경 시마다 데이터 새로 로드

  // 사용자 닉네임 가져오기
  useEffect(() => {
    if (!memId) return;

    axios.get(`/member/get/${memId}`)
      .then((response) => {
        setNickname(response.data.nickname); // 유저의 닉네임을 가져와 상태로 설정
      })
      .catch((error) => {
        console.error('닉네임을 가져오는 중 오류 발생:', error);
        setErrorMessage('닉네임을 가져오는 중 오류가 발생했습니다.');
      });
  }, [memId]);

  // 방명록 추가 기능
  const handleAddEntry = () => {
    if (!newEntry.trim()) {
      setErrorMessage('내용을 입력해주세요.');
      return; // 공백 방지
    }
    const newEntryObject = {
      memId: hostId,
      nickname: nickname,
      gbContent: newEntry,
    };

    axios.post('/guestbook/add', newEntryObject)
      .then((response) => {
        if (response.data === 'success') {
          setGuestbookEntries([...guestbookEntries,newEntryObject]);
          setNewEntry('');
          setErrorMessage('');
          window.location.reload();
        } else {
          setErrorMessage('방명록 저장 중 문제가 발생했습니다.');
        }
      })
      .catch((error) => {
        console.error("Error saving guestbook entry:", error);
        setErrorMessage('방명록 저장 중 오류가 발생했습니다.');
      });
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="guestbook-container">
      <h2>사용자 홈페이지 인삿말</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="guestbook-list">
        {guestbookEntries.map((entry) => (
          <div key={entry.id} className="guestbook-entry">
            <div className="entry-header">
              <span className="username">{entry.nickname}</span>
              <span className="date">{formatDate(entry.createDate)}</span> {/* 작성 날짜 표시 */}
            </div>
            <p className="message">{entry.gbContent}</p>
          </div>
        ))}
      </div>
      <div className="guestbook-input">
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="내용을 입력해 주세요."
        ></textarea>
        <button className="guestsubmit" onClick={handleAddEntry}>완료</button>
      </div>
      {/* 페이지 네이션 버튼 */}
      <div className="pagination">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
          이전
        </button>
        <span>{page + 1} / {totalPages}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page + 1 === totalPages}>
          다음
        </button>
      </div>
    </div>
  );
}

export default GuestbookPage;

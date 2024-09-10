// GuestbookPage.js
import React, { useEffect, useState } from 'react';
import './GuestbookPage.css';
import axios from 'axios';

function GuestbookPage() {
  // 방명록 데이터 상태 관리
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');

  // [
  //   { id: 1, username: 'USER01', date: '2024-09-01', message: '안녕하세요 잘 부탁드립니다!!' },
  //   { id: 2, username: 'USER02', date: '2024-09-05', message: '쪽지 주셔서 놀랐어요. 항상 감사합니다.' },
  //   { id: 3, username: 'USER03', date: '2024-08-25', message: '방가방가' },
  // ]
  //방명록 리스트 불러오기
  useEffect(() => {
    axios
      .get('/guestbook/total')
      .then((response) => {
        console.log("Fetched images:", response.data);
        setGuestbookEntries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        alert("이미지 목록을 가져오는 중 오류가 발생했습니다.");
      });
  }, []);

  // 방명록 추가 기능
  const handleAddEntry = () => {
    if (!newEntry.trim()) return; // 공백 방지
    const newEntryObject = {
      memId: localStorage.getItem('hostUserId'), // 방명록이 달리는 페이지의 주인 아이디
      nickname: 'NEWUSER', // 방명록을 다는 유저
      message: newEntry,
    };
    setGuestbookEntries([newEntryObject, ...guestbookEntries]);
    setNewEntry('');
  };

  // 입력 핸들러
  const handleChange = (e) => {
    setNewEntry(e.target.value);
  };

  // 방명록 정렬 (최신순/오래된순)
  const handleSort = (order) => {
    const sortedEntries = [...guestbookEntries].sort((a, b) => {
      if (order === 'newest') return new Date(b.date) - new Date(a.date);
      else return new Date(a.date) - new Date(b.date);
    });
    setGuestbookEntries(sortedEntries);
  };

  return (
    <div className="guestbook-container">
      <h2>사용자 홈페이지 인삿말</h2>
      <div className="guestbook-list">
        <div className="sort-options">
          <span onClick={() => handleSort('newest')}>최신순</span> |{' '}
          <span onClick={() => handleSort('oldest')}>오래된순</span>
        </div>
        {guestbookEntries.map((entry) => (
          <div key={entry.id} className="guestbook-entry">
            <div className="entry-header">
              <span className="username">{entry.username}</span>
              <span className="date">{entry.date}</span>
            </div>
            <p className="message">{entry.message}</p>
          </div>
        ))}
      </div>
      <div className="guestbook-input">
        <textarea
          value={newEntry}
          onChange={handleChange}
          placeholder="내용을 입력해 주세요."
        ></textarea>
        <button className="guestsubmit" onClick={handleAddEntry}>완료</button>
      </div>
    </div>
  );
}

export default GuestbookPage;

// GuestbookPage.js
import React, { useState } from 'react';
import './GuestbookPage.css';

function GuestbookPage() {
  // 방명록 데이터 상태 관리
  const [guestbookEntries, setGuestbookEntries] = useState([
    { id: 1, username: 'USER01', date: '2024-09-01', message: '안녕하세요 잘 부탁드립니다!!' },
    { id: 2, username: 'USER02', date: '2024-09-05', message: '쪽지 주셔서 놀랐어요. 항상 감사합니다.' },
    { id: 3, username: 'USER03', date: '2024-08-25', message: '방가방가' },
  ]);
  const [newEntry, setNewEntry] = useState('');

  // 방명록 추가 기능
  const handleAddEntry = () => {
    if (!newEntry.trim()) return; // 공백 방지
    const newEntryObject = {
      id: guestbookEntries.length + 1,
      username: 'NEWUSER', // 로그인 기능이 없다면 고정된 값 사용
      date: new Date().toISOString().split('T')[0],
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
        <button onClick={handleAddEntry}>완료</button>
      </div>
    </div>
  );
}

export default GuestbookPage;

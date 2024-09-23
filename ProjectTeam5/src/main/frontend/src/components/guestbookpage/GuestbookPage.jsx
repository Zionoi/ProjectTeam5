import React, { useEffect, useState } from 'react';
import './GuestbookPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GuestbookPage({ hostId, setHostId }) {
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const [page, setPage] = useState(0); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const memId = localStorage.getItem('id'); // 로그인된 유저의 ID 가져오기
  const [editMode, setEditMode] = useState(null); // 수정 모드 상태
  const [editContent, setEditContent] = useState(''); // 수정 중인 내용
  const [menuOpen, setMenuOpen] = useState(false); // 메뉴창 구분을 위한 상태

  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate hook

   // 방명록 목록 불러오기 함수
   const fetchGuestbookEntries = () => {
    axios
      .get('/guestbook/total', { params: { page, size: 5, memId: hostId } })
      .then((response) => {
        setGuestbookEntries(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        setErrorMessage('');
      });

  };

  useEffect(() => {
    fetchGuestbookEntries(); // 컴포넌트가 처음 렌더링될 때 방명록 목록 불러오기
  }, [page, hostId]);

  // 사용자 닉네임 가져오기
  useEffect(() => {
    if (!memId) return;

    axios.get(`/member/get/${memId}`)
      .then((response) => {
        setNickname(response.data.nickname);
      })
      .catch(() => {
        setErrorMessage('닉네임을 가져오는 중 오류가 발생했습니다.');
      });
  }, [memId]);

  // 방명록 추가 기능
  const handleAddEntry = () => {
    if (!newEntry.trim()) {
      setErrorMessage('내용을 입력해주세요.');
      return;
    }
    const newEntryObject = {
      memId: hostId, // 방명록이 달리는 페이지 주인
      nickname: nickname, // 방명록 쓴 사람 닉네임
      commenter: memId, // 방명록을 쓴 사람
      gbContent: newEntry,//방명록 내용
    };

    axios.post('/guestbook/add', newEntryObject)
      .then((response) => {
        if (response.data === 'success') {
          setGuestbookEntries([...guestbookEntries, newEntryObject]);
          setNewEntry('');
          setErrorMessage('');
          fetchGuestbookEntries();
          console.log('response.data', response.data);
        } else {
          setErrorMessage('방명록 저장 중 문제가 발생했습니다.');
        }
      })
      .catch(() => {
        setErrorMessage('방명록 저장 중 오류가 발생했습니다.');
      });
  };

  // 방명록 수정 기능
  const handleEditMode = (gbNum, content) => {
    setEditMode(gbNum);
    setEditContent(content);
  };

  const handleSaveEdit = (gbNum) => {
    axios.put(`/guestbook/update/${gbNum}`, { gbContent: editContent })
      .then(() => {
        setGuestbookEntries(
          guestbookEntries.map((entry) => entry.gbNum === gbNum ? { ...entry, gbContent: editContent } : entry)
        );
        setEditMode(null);
        setEditContent('');
      })
      .catch(() => {
        setErrorMessage('방명록 수정 중 오류가 발생했습니다.');
      });
  };

  // 방명록 삭제 기능
  const handleDeleteEntry = (gbNum) => {
    if (window.confirm('이 방명록을 삭제하시겠습니까?')) {
      axios.delete(`/guestbook/delete/${gbNum}`)
        .then(() => {
          setGuestbookEntries(guestbookEntries.filter(entry => entry.gbNum !== gbNum));
        })
        .catch(() => {
          setErrorMessage('방명록 삭제 중 오류가 발생했습니다.');
        });
    }
  };

  // "놀러가기" 기능: 해당 사용자의 페이지로 이동
  const visitFriendPage = (friendId) => {
    setHostId(friendId);
    navigate(`/home/${friendId}`); // 해당 사용자의 홈페이지로 이동
  };

  // "쪽지 보내기" 기능: 해당 사용자에게 쪽지 작성 화면으로 이동
  const sendMessage = (friendId) => {
    navigate(`/write/${friendId}`); // 쪽지 작성 화면으로 이동
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  // 모달 토글 함수
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div>
    <div className="guestbook-title-box">
          <h2 className="guestbook-title">방명록</h2>
    </div>
      
    <div className="guestbook-container">
      {/* 글 작성은 memId와 hostId가 다를 때만 가능 */}
      {memId !== hostId && (
        <div className="guestbook-input">
          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="내용을 입력해 주세요."
          ></textarea>
          <button className="guestsubmit" onClick={handleAddEntry}>완료</button>
        </div>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="guestbook-list">
        {guestbookEntries.map((entry) => (
          <div key={entry.gbNum} className="guestbook-entry">
            <div className="entry-header">
              {/* 닉네임을 클릭하면 모달 창 생성 */}
              <span className="username" onClick={() => toggleMenu(entry.gbNum)} style={{ cursor: 'pointer' }}>
                {entry.nickname}
              </span>
              {menuOpen && (
                <div className="menu-buttons">
                  <button onClick={() => visitFriendPage(entry.commenter)}>홈피 가기</button>
                  <button onClick={() => sendMessage(entry.commenter)}>쪽지 보내기</button>
                </div>
              )}
              <span className="date">{new Date(entry.createDate).toLocaleString()}</span>
            </div>

            {/* 글 내용을 표시 */}
            {editMode === entry.gbNum ? (
              <div>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(entry.gbNum)}>저장</button>
              </div>
            ) : (
              <p className="message">
                {entry.gbContent}
              </p>
            )}

            {/* 수정 버튼은 본인이 작성한 글만 보임 */}
            {entry.commenter === memId && (
              <button onClick={() => handleEditMode(entry.gbNum, entry.gbContent)}>수정</button>
            )}

            {/* 삭제 버튼은 본인이 작성한 글이거나 hostId와 memId가 같을 때 보임 */}
            {(entry.commenter === memId || hostId === memId) && (
              <button onClick={() => handleDeleteEntry(entry.gbNum)} className="delete-button">삭제</button>
            )}
          </div>
        ))}
      </div>
        
      {/* 페이지 네이션 버튼 */}
      <div className="pagination">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>이전</button>
        <span>{page + 1} / {totalPages}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page + 1 === totalPages}>다음</button>
      </div>
    </div>
    </div>
  );
}

export default GuestbookPage;

import React, { useEffect, useState } from 'react';
import './GuestbookPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import defaultProfileImage from '../../img/basicProfile.png';
import emptyImage from '../../img/characterImg/guestbookImg.png'; // 방명록이 비어 있을 때 표시할 이미지

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
  const [menuOpen, setMenuOpen] = useState({}); // 항목별 메뉴창 구분을 위한 상태

  const [loading, setLoading] = useState(true);
  const [profileImages, setProfileImages] = useState({}); // 작성자 프로필 이미지 상태

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

  // 각 작성자의 프로필 이미지를 가져오는 함수
  const fetchProfileImage = (commenterId) => {
    return axios.get(`/member/get/${commenterId}`)
      .then((response) => {
        return response.data.imgPath || defaultProfileImage; // 기본 이미지 처리
      })
      .catch(() => {
        return defaultProfileImage; // 오류 시 기본 이미지 반환
      });
  };

  // 모든 작성자의 프로필 이미지를 가져오는 함수
  const fetchAllProfileImages = async () => {
    const updatedProfileImages = {};
    const requests = guestbookEntries.map(async (entry) => {
      const image = await fetchProfileImage(entry.commenter);
      updatedProfileImages[entry.commenter] = image;
    });
    await Promise.all(requests);
    setProfileImages(updatedProfileImages); // 모든 프로필 이미지를 상태에 저장
  };

  useEffect(() => {
    fetchGuestbookEntries(); // 방명록 목록 불러오기
  }, [page, hostId]);

  useEffect(() => {
    if (guestbookEntries.length > 0) {
      fetchAllProfileImages(); // 방명록 작성자들의 프로필 이미지 불러오기
    }
  }, [guestbookEntries]);

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
      createDate: new Date(), // 방명록 작성 시간
    };

    axios.post('/guestbook/add', newEntryObject)
      .then((response) => {
        if (response.data === 'success') {
          setGuestbookEntries(prevEntries => [newEntryObject, ...prevEntries]); // 새 항목을 맨 위에 추가
          setNewEntry(''); // 입력 필드 초기화
          setErrorMessage(''); // 오류 메시지 초기화
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
    axios
    .get('/friends/isBlocked', {
      params: {
        memId: memId,       // 로그인한 사용자 ID
        targetId: friendId  // 이동하려는 사용자 ID
      }
    })
    .then((response) => {
      // 차단된 경우
      if (response.data === true) {
        alert('차단되었거나 차단한 홈피는 들어갈 수 없습니다.');
      } else {
        // 차단되지 않은 경우 홈피로 이동
        setHostId(friendId);
        navigate(`/home/${friendId}`);
      }
    })
    .catch((error) => {
      console.error('차단 여부 확인 중 오류가 발생했습니다:', error);
      alert('차단 여부를 확인할 수 없습니다.');
    });
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
  const toggleMenu = (gbNum) => {
    setMenuOpen((prev) => ({
      ...prev,
      [gbNum]: !prev[gbNum],
    }));
  };

  return (
    <div>
      <div className="guestbook-container">
        <h2 className="guestbook-title">방명록</h2>

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

        <div className={guestbookEntries.length === 0 ? "guestbook-nolist" : "guestbook-list"}>
          {guestbookEntries.length === 0 ? (
            <div className="empty-guestbook">
              <img src={emptyImage} alt="방명록이 없습니다." style={{ width: '500px', margin: '0 auto', display: 'block' }} />
              <p style={{ textAlign: 'center', color: '#888', fontSize:"11pt", fontWeight:"500"}}>방명록을 남겨주세요!</p>
            </div>
          ) : (
            guestbookEntries.map((entry) => (
              <div key={entry.gbNum} className="guestbook-entry">
                <div className="entry-header">

                      <span onClick={() => toggleMenu(entry.gbNum)} style={{ cursor: 'pointer' }}>
                        <img
                          className="guestbook-img"
                          src={profileImages[entry.commenter] || defaultProfileImage}
                          alt="프로필 사진"
                          style={{ width: "50px", height: "50px", borderRadius: "50px" }}
                        />
                      </span>
                      <span className="username" onClick={() => toggleMenu(entry.gbNum)} style={{ cursor: 'pointer' }}>
                        {entry.nickname}
                      </span>
                      {menuOpen[entry.gbNum] && (
                        <div className="GMB-box">
                          <button className="guestmenu-buttons" onClick={() => visitFriendPage(entry.commenter)}>홈피 가기</button>
                          <button className="guestmenu-buttons" onClick={() => sendMessage(entry.commenter)}>쪽지 보내기</button>
                        </div>
                      )}

                  <span className="date">{new Date(entry.createDate).toLocaleString()}</span>
                </div>

                {editMode === entry.gbNum ? (
                  <div className="guestbookEdit-box">
                    <textarea
                      placeholder="내용을 입력해 주세요."
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                    <button className="guestbookEdit-saveBtn" onClick={() => handleSaveEdit(entry.gbNum)}>저장</button>
                  </div>
                ) : (
                  <p className="message">{entry.gbContent}</p>
                )}

                <div className="guest-DE-box">
                  {entry.commenter === memId && (
                    <button onClick={() => handleEditMode(entry.gbNum, entry.gbContent)}
                    className="guestbookEdit-button">수정</button>
                  )}

                  {(entry.commenter === memId || hostId === memId) && (
                    <button onClick={() => handleDeleteEntry(entry.gbNum)} className="guestbookDelete-button">삭제</button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* 페이지 네이션 버튼 */}
        {totalPages > 1 && (
          <div className="pagination">
            <button className="pagination-btn" onClick={() => handlePageChange(page - 1)} disabled={page === 0}>&lt;&nbsp;</button>
            <span>{page + 1} / {totalPages}</span>
            <button className="pagination-btn" onClick={() => handlePageChange(page + 1)} disabled={page + 1 === totalPages}>&nbsp;&gt;</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GuestbookPage;


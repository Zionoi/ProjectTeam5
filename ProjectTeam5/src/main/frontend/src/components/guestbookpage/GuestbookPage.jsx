// GuestbookPage.js
import React, { useState } from 'react';
import './GuestbookPage.css'; // GuestbookPage 전용 스타일

function GuestbookPage() {
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    visibility: '전체공개',
    files: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleFileChange = (e) => {
    setPostData({ ...postData, files: Array.from(e.target.files) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('게시글 데이터:', postData);
    // 게시글 등록 로직 추가
  };

  return (
    <div className="guestbook-container">
      <h1>사용자 홈페이지 인삿말</h1>
      <form onSubmit={handleSubmit}>
        <div className="file-upload-section">
          <label>이미지, 동영상 업로드</label>
          <input
            type="file"
            name="files"
            onChange={handleFileChange}
            multiple
            accept="image/*,video/*"
          />
        </div>
        <input
          type="text"
          name="title"
          placeholder="제목을 입력하세요."
          value={postData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="내용을 입력하세요."
          value={postData.content}
          onChange={handleChange}
          required
        />
        <div className="visibility-selection">
          <label>공개범위</label>
          <select
            name="visibility"
            value={postData.visibility}
            onChange={handleChange}
          >
            <option value="전체공개">전체공개</option>
            <option value="친구공개">친구공개</option>
            <option value="비공개">비공개</option>
          </select>
        </div>
        <button type="submit">게시글 등록</button>
      </form>
    </div>
  );
}

export default GuestbookPage;

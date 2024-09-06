// StickerPost.js
import React from 'react';
import './StickerPost.css'; // StickerSection.css 파일을 함께 사용합니다.

const StickerPost = () => {
  const [privacy, setPrivacy] = useState('public');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePrivacyChange = (e) => {
    setPrivacy(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    // 여기에 게시글 등록 로직을 추가하세요.
    console.log('Privacy:', privacy);
    console.log('Title:', title);
    console.log('Content:', content);
    alert('게시글이 등록되었습니다.');
  };

  return (
    <div className="sticker-post-section">
      <h2>게시글 등록</h2>

      {/* 공개 범위 설정 */}
      <div className="privacy-setting">
        <label htmlFor="privacy-select">공개 범위:</label>
        <select id="privacy-select" value={privacy} onChange={handlePrivacyChange}>
          <option value="public">전체공개</option>
          <option value="friends">친구공개</option>
          <option value="private">비공개</option>
        </select>
      </div>

      {/* 제목 입력 */}
      <div className="post-title">
        <label htmlFor="post-title-input">제목:</label>
        <input
          type="text"
          id="post-title-input"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={handleTitleChange}
        />
      </div>

      {/* 내용 입력 */}
      <div className="post-content">
        <label htmlFor="post-content-textarea">내용:</label>
        <textarea
          id="post-content-textarea"
          rows="5"
          placeholder="내용을 입력하세요"
          value={content}
          onChange={handleContentChange}
        ></textarea>
      </div>

      {/* 등록 버튼 */}
      <button className="submit-button" onClick={handleSubmit}>
        등록
      </button>
    </div>
  );
};

export default StickerPost;

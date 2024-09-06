// PostDetail.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PostDetail.css';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 예시 게시글 데이터 (실제로는 서버에서 가져오는 로직 필요)
  const post = {
    id: id,
    title: '게시글 제목',
    content: '게시글 내용입니다.',
    images: ['/path/to/image1.jpg', '/path/to/image2.jpg'],
  };

  const handleDelete = () => {
    // 삭제 로직 구현
    alert('게시글이 삭제되었습니다.');
    navigate('/');
  };

  const handleEdit = () => {
    // 수정 로직 구현
    alert('게시글 수정 페이지로 이동합니다.');
  };

  return (
    <div className="post-detail">
      <h1>{post.title}</h1>
      <div className="slider-container">
        {post.images.map((image, index) => (
          <img key={index} src={image} alt={`슬라이드 ${index + 1}`} className="slider-image" />
        ))}
      </div>
      <p>{post.content}</p>
      <div className="button-group">
        <button onClick={() => navigate('/')}>목록으로 돌아가기</button>
        <button onClick={handleEdit}>수정</button>
        <button onClick={handleDelete}>삭제</button>
      </div>
    </div>
  );
}

export default PostDetail;

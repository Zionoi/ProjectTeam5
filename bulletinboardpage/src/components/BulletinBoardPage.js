// BulletinBoardPage.js
import React, { useState } from 'react';
import './BulletinBoardPage.css';

function BulletinBoardPage() {
  // 게시글 데이터 상태 관리
  const [posts, setPosts] = useState([
    { id: 1, title: '첫 번째 게시글', description: '설명입니다.', image: 'https://via.placeholder.com/150' },
    { id: 2, title: '두 번째 게시글', description: '설명입니다.', image: 'https://via.placeholder.com/150' },
    { id: 3, title: '세 번째 게시글', description: '설명입니다.', image: 'https://via.placeholder.com/150' },
  ]);

  // 게시글 추가 핸들러 (간단한 형태로 추가 구현 가능)
  const handleAddPost = () => {
    const newPost = {
      id: posts.length + 1,
      title: '새 게시글',
      description: '새로운 설명입니다.',
      image: 'https://via.placeholder.com/150',
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="bulletin-board-container">
      <h2>게시판</h2>
      <button className="add-post-button" onClick={handleAddPost}>
        게시글 등록
      </button>
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <img src={post.image} alt={post.title} className="post-image" />
            <div className="post-content">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-description">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BulletinBoardPage;

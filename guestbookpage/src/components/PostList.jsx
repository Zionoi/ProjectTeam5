// PostList.js
import React from 'react';
import { Link } from 'react-router-dom';
import './PostList.css';

function PostList() {
  // 예시 데이터
  const posts = [
    { id: 1, title: '첫 번째 게시글', date: '2024-09-06', comment: '첫 번째 게시글 내용입니다.' },
    { id: 2, title: '두 번째 게시글', date: '2024-09-07', comment: '두 번째 게시글 내용입니다.' },
  ];

  return (
    <div className="post-list">
      <h1>게시글 목록</h1>
      {posts.map((post) => (
        <div key={post.id} className="post-item">
          <Link to={`/post/${post.id}`}>
            <h2>{post.title}</h2>
            <p>{post.date}</p>
            <p>{post.comment}</p>
          </Link>
        </div>
      ))}
      <Link to="/guestbook">
        <button className="add-post-btn">게시글 등록</button>
      </Link>
    </div>
  );
}

export default PostList;

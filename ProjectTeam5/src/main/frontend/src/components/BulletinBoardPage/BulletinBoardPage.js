// BulletinBoardPage.js
import React, { useEffect, useState } from 'react';
import './BulletinBoardPage.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function BulletinBoardPage({hostId}) {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  // 게시글 데이터 상태 관리
  const [posts, setPosts] = useState([
    { id: 1, title: '첫 번째 게시글', description: '설명입니다.', image: 'https://via.placeholder.com/150' },
    { id: 2, title: '두 번째 게시글', description: '설명입니다.', image: 'https://via.placeholder.com/150' },
    { id: 3, title: '세 번째 게시글', description: '설명입니다.', image: 'https://via.placeholder.com/150' },
  ]);
  useEffect(() => {
    if (hostId) {
      axios
        .get('/board/total', { params: { memId: hostId } })
        .then((response) => {
          console.log("Fetched images:", response.data);
          setImages(response.data);
        })
        .catch((error) => {
          console.error("Error fetching images:", error);
          alert("이미지 목록을 가져오는 중 오류가 발생했습니다.");
        });
    }
  }, [hostId]);

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

  const handleImageClick = (bnum) => {
    console.log("Fetched images bnum:", bnum);
    navigate(`/boardDetail/${bnum}/${hostId}`);
  };


  return (
    <div>
      <div className="board-title-box">
          <h2 className="board-title">스토리</h2>
          {hostId === localStorage.getItem('id') && (
            <Link to={`/boardUpload/${hostId}`}>
              <button className="post-button">
                게시글 등록
              </button>
            </Link>
          )}
      </div>
      <div className="bulletin-board-container">
      <div className="posts-grid">
        {images.map((post) => (
          <div key={post.bNum} className="post-card" onClick={() => handleImageClick(post.bnum)}>
            <img src={post.imgPath[0]} alt={post.btitle} className="post-image" />
            <div className="post-content">
              <h3 className="post-title">{post.btitle}</h3>
              {/* <p className="post-description">{post.bTitle}</p> */}
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default BulletinBoardPage;

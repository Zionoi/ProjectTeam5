import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import './BoardDetailCss.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function BoardDetail() {
  const { bNum } = useParams();  // URL 파라미터에서 bNum을 가져옵니다.
  const [detail, setDetail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/board/detail', { params: { bNum } })  // bNum을 올바르게 전달
      .then((response) => {
        console.log("Fetched detail:", response.data);
        setDetail(response.data);
      })
      .catch((error) => {
        console.error("Error fetching detail:", error);
        alert("상세 정보를 가져오는 중 오류가 발생했습니다.");
      });
  }, [bNum]);  // bNum이 변경될 때마다 useEffect 재실행

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios.delete(`/board/delete/${bNum}`)
        .then(() => {
          alert("게시물이 삭제되었습니다.");
          navigate(`/home`);  // 삭제 후 메인 페이지로 이동
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
          alert("게시물 삭제 중 오류가 발생했습니다.");
        });
    }
  };

  const handleEdit = () => {
    navigate(`/boardEdit/${bNum}`);  // 수정 페이지로 이동
  };

  if (!detail) {
    return <div>Loading...</div>;  // 데이터를 가져오는 중일 때 로딩 메시지
  }

  // 슬라이더 설정 (이미지가 하나일 때 infinite 옵션 끄기)
  const sliderSettings = {
    dots: true,
    infinite: detail.imgPath.length > 1,  // 이미지가 1개일 경우 infinite 설정을 끔
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  return (
    <div className="board-in">
      <div className="board-in-box">
        <h1 className="board-count">{bNum}</h1>
        <h2 className="board-title-in">{detail.btitle}</h2>
        {/* 수정 및 삭제 버튼 추가 */}
        <div className="board-edit-button">
          <button onClick={handleEdit}>수정하기</button>
          <button onClick={handleDelete}>삭제하기</button>
        </div>
      </div>

      {/* 이미지 슬라이더 */}
      <Slider {...sliderSettings}>
        {detail.imgPath.map((img, index) => (
          <div key={index}>
            <img
              className="board-img-in"
              src={img }
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </Slider>

      <p className="board-content-in">{detail.bcontent}</p>
      <p>{detail.bNum}</p>

    </div>
  );
}

export default BoardDetail;

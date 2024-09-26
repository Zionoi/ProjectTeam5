import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function Board({hostId, setHostId}) {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

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

  const handleImageClick = (bnum) => {
    console.log("Fetched images bnum:", bnum);
    navigate(`/boardDetail/${bnum}`);
  };

  return (
    <div>
      <h2>게시판</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images.map((image, index) => (
          <div
            key={index}
            style={{ margin: "10px", cursor: "pointer" }}
            onClick={() => handleImageClick(image.bnum)}
          >
            <img
              src={image.imgPath}
              alt={image.bTitle}
              style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "cover" }}
            />
            <p>{image.btitle}</p>
            <p>{image.bcontent}</p>
          </div>
        ))}
      </div>
      <Link to="/boardUpload"><button className="btn btn-outline-danger">글작성</button></Link>
    </div>
  );
}

export default Board;
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ImageList() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/board/total')
      .then((response) => {
        console.log("Fetched images:", response.data);
        setImages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        alert("이미지 목록을 가져오는 중 오류가 발생했습니다.");
      });
  }, []);

  const handleImageClick = (bnum) => {
    navigate(`/detail/${bnum}`);
  };

  return (
    <div>
      <h2>Uploaded Images</h2>
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
    </div>
  );
}

export default ImageList;